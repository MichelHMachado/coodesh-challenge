import IconButton from "./IconButton";
import { CheckIcon } from "../assets/icons";
import {
  checkIfFavorite,
  addRadioToFavorite,
  getFavoriteStations,
} from "../database/radioStationService";
import useAudioPlayer from "../hooks/useAudioPlayer";
import AudioControls from "./AudioControls";
import { RadioStation } from "@/database/models/radioStation";
import { useEffect, useState } from "react";

interface SidebarRadioCardProps {
  station: RadioStation;
  isSelected: boolean;
  setSelectedStation: (station: RadioStation) => void;
  setFavoriteRadios: (stations: RadioStation[]) => void;
}

const SidebarRadioCard = ({
  station,
  isSelected,
  setSelectedStation,
  setFavoriteRadios,
}: SidebarRadioCardProps) => {
  const { stationuuid, name, url } = station;

  const [isFavorite, setIsFavorite] = useState(false);
  const { isPlaying, togglePlay, isLoading, audioRef } = useAudioPlayer(
    url,
    isSelected
  );

  const handlePlayStopClick = () => {
    togglePlay();
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const favorite = await checkIfFavorite(stationuuid);
      setIsFavorite(favorite);
    };
    checkFavoriteStatus();
  }, [stationuuid]);

  const addRadioToFavoriteList = async () => {
    const existingStation = await checkIfFavorite(stationuuid);

    if (existingStation) {
      alert("Station is already in the favorites list.");
      return;
    }

    await addRadioToFavorite(stationuuid, station);
    setIsFavorite(true);

    const updatedFavorites = await getFavoriteStations();
    setFavoriteRadios(updatedFavorites);
  };

  return (
    <div
      className={`p-3 rounded-[10px] border border-black cursor-pointer transition-all duration-300 ${
        isSelected
          ? "bg-gray-400 text-black"
          : "bg-light-gray hover:opacity-80 transition 300"
      }`}
      onClick={() => {
        setSelectedStation(station);
      }}
    >
      <div className="flex justify-between">
        <span>{name}</span>
        {isFavorite && (
          <IconButton fill="blue" Icon={CheckIcon} onClick={() => {}} />
        )}
      </div>
      {isSelected && !isFavorite && (
        <button
          className="bg-blue-500 px-2 py-1 rounded-md mt-3 hover:bg-blue-700 transition-all 300"
          onClick={addRadioToFavoriteList}
          disabled={isFavorite}
        >
          Add to your list
        </button>
      )}
      {isSelected && (
        <div className="mt-2">
          <AudioControls
            isPlaying={isPlaying}
            isLoading={isLoading}
            onClick={handlePlayStopClick}
          />
          {url && <audio ref={audioRef} />}
        </div>
      )}
    </div>
  );
};

export default SidebarRadioCard;
