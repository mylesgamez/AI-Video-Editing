import { useState, FC } from 'react';

interface VideoEditorProps {
  onEdit: (prompt: string) => void;
}

const VideoEditor: FC<VideoEditorProps> = ({ onEdit }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    onEdit(prompt);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <textarea
        className="border rounded p-3 w-full mb-4 focus:border-blue-500 focus:outline-none"
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe how the video should be edited..."
      ></textarea>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        onClick={handleSubmit}
      >
        Edit
      </button>
    </div>
  );

};

export default VideoEditor;
