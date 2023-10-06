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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <VideoUploader onVideoUpload={handleVideoUpload} />
      {videoFile && <VideoEditor onEdit={handleEdit} />}
      {editedVideoSrc && <VideoPlayer src={editedVideoSrc} />}
    </div>
  );
}
