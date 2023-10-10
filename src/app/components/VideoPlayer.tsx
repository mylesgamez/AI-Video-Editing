import { FC } from 'react';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ src }) => {
  return (
    <div>
      <video controls src={src} width="100%">
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
