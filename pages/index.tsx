import { useState } from 'react';
import VideoUploader from '../src/app/components/VideoUploader';
import VideoEditor from '../src/app/components/VideoEditor';
import VideoPlayer from '../src/app/components/VideoPlayer';

export default function Home() {
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [editedVideoSrc, setEditedVideoSrc] = useState<string>('');

  const handleVideoUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('video', file);

    const response = await fetch('/api/uploadVideo', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setVideoFile(data.path);
  };

  const handleEdit = async (prompt: string) => {
    const response = await fetch('/api/editVideo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        originalVideoUrl: videoFile,
        prompt: prompt,
      }),
    });
    const data = await response.json();
    setEditedVideoSrc(data.editedVideoUrl);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-gray-100 to-gray-200">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white p-6 rounded-xl shadow-xl space-y-8">
        <h1 className="text-4xl font-semibold text-blue-700 text-center">AI Video Editor</h1>
        <VideoUploader onVideoUpload={handleVideoUpload} />
        {videoFile && <VideoEditor onEdit={handleEdit} />}
        {editedVideoSrc && <VideoPlayer src={editedVideoSrc} />}
      </div>
    </div>
  );


}
