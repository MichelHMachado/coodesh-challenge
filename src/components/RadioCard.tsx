import { EditIcon, RemoveIcon } from "../assets/icons";
import { RadioStation } from "../types/radioStation";
import IconButton from "./IconButton";
import useAudioPlayer from "../hooks/useAudioPlayer";
import AudioControls from "./AudioControls";
import { deleteData, openDatabase, getAllData } from "../utils/indexedDB"; // Ensure to import getAllData
import { useRadio } from "../hooks/useRadio";

interface Props {
  station: RadioStation;
}

const RadioCard = ({ station }: Props) => {
  const { selectedStation, setSelectedStation, setFavoriteRadios } = useRadio();
  const { name, country, countrycode, url } = station;
  const isActiveRadio = selectedStation.name === name;

  const { isPlaying, togglePlay, isLoading, audioRef } = useAudioPlayer(
    url,
    isActiveRadio
  );

  const handlePlayStopClick = () => {
    console.log("Url: ", url);
    setSelectedStation(station);
    togglePlay();
  };

  const deleteRadioFromFavoriteList = async () => {
    const db = await openDatabase("RadioDB", 4, ["favorite_stations"]);

    await deleteData(db, "favorite_stations", name);

    const updatedFavorites = await getAllData(db, "favorite_stations");
    setFavoriteRadios(updatedFavorites);
  };

  return (
    <div
      className={`${
        !isActiveRadio ? "bg-light-gray" : "bg-gray-500"
      } rounded-sm py-2 pl-8 pr-4 flex gap-4 justify-between items-center transition-all duration-300`}
    >
      <div className="w-12 h-12 rounded-full bg-primary-gray flex justify-center items-center shrink-0">
        <AudioControls
          onClick={handlePlayStopClick}
          isLoading={isLoading}
          isPlaying={isPlaying}
        />
      </div>
      <div className="grow">
        <p className="text-3xl">{name}</p>
        {country && countrycode ? (
          <p className="text-sm">
            {country}, {countrycode}
          </p>
        ) : (
          <p>Location not provided</p>
        )}
      </div>
      <div className="flex gap-4">
        <IconButton onClick={() => {}} Icon={EditIcon} />
        <IconButton onClick={deleteRadioFromFavoriteList} Icon={RemoveIcon} />
      </div>
      {url && <audio ref={audioRef} />}
    </div>
  );
};

export default RadioCard;
