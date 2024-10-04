import { EditIcon, PlayIcon, RemoveIcon, StopIcon } from "../assets/icons";
import IconButton from "./IconButton";

const RadioCard = () => {
  const isPlaying = false;
  return (
    <div className="bg-light-gray rounded-sm py-2 pl-8 pr-4 flex gap-4 justify-between items-center">
      <div className="w-12 h-12 rounded-full bg-primary-gray flex justify-center items-center">
        <IconButton containerSize="7" Icon={isPlaying ? PlayIcon : StopIcon} />
      </div>
      <div className="grow">
        <p className="text-3xl">Radio Name</p>
        <p className="text-sm">Country, Country Code</p>
      </div>
      <div className="flex gap-4">
        <IconButton Icon={EditIcon} />
        <IconButton Icon={RemoveIcon} />
      </div>
    </div>
  );
};

export default RadioCard;
