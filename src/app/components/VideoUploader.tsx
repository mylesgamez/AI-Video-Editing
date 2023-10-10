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
    <div className="flex flex-col items-center w-full">
      <input
        className="hidden"
        type="file"
        id="video-upload"
        onChange={handleUpload}
      />
      <div className="flex items-center space-x-2">
        <span className="text-gray-600">{file ? file.name : "Upload a video"}</span>
        <label
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded cursor-pointer"
          htmlFor="video-upload"
        >
          Browse
        </label>
      </div>
    </div>
  );

};

export default VideoUploader;
