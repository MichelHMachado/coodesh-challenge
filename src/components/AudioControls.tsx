import { PlayIcon, StopIcon } from "../assets/icons";
import IconButton from "./IconButton";

interface Props {
  isLoading: boolean;
  onClick: () => void;

  isPlaying: boolean;
}
const AudioControls = ({ isLoading, onClick, isPlaying }: Props) => {
  return (
    <>
      {isLoading ? (
        <div className="loader" />
      ) : (
        <IconButton
          dataTestid="play-stop-button"
          onClick={onClick}
          Icon={isPlaying ? StopIcon : PlayIcon}
        />
      )}
    </>
  );
};

export default AudioControls;
