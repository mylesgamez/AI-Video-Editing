import multer from 'multer';

// Define video MIME types
const videoMimeTypes = [
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'video/webm',
  'video/ogg',
];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (videoMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File format not supported. Only video files are allowed.'));
    }
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const uploader = upload.single('video');

  uploader(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer error when uploading.
      return res.status(500).json({ error: err.message });
    } else if (err) {
      // Any other errors
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a video file.' });
    }

    // Return the uploaded video's filename (saved path) to the client
    return res.status(200).json({ path: `/uploads/${req.file.filename}` });
  });
};
