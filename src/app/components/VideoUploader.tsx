import { useState, FC, ChangeEvent } from 'react';

interface VideoUploaderProps {
  onVideoUpload: (file: File) => void;
}

const VideoUploader: FC<VideoUploaderProps> = ({ onVideoUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
      onVideoUpload(uploadedFile);
    }
  };

  return (
    <div>
      <label htmlFor="video-upload">Upload Video:</label>
      <input type="file" id="video-upload" onChange={handleUpload} />
    </div>
  );
};

export default VideoUploader;
