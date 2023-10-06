import { FC } from 'react';

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ src }) => {
  return (
    <video controls src={src} width="500">
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
