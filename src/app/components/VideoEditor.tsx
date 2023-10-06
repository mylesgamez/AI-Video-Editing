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
    <div>
      <textarea onChange={(e) => setPrompt(e.target.value)} placeholder="Describe how the video should be edited..."></textarea>
      <button onClick={handleSubmit}>Start Editing</button>
    </div>
  );
};

export default VideoEditor;
