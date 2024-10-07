import { EditIcon, RemoveIcon } from "../assets/icons";
import { RadioStation } from "../database/models/radioStation";
import IconButton from "./IconButton";
import useAudioPlayer from "../hooks/useAudioPlayer";
import AudioControls from "./AudioControls";
import { useRadio } from "../hooks/useRadio";
import { useState } from "react";
import {
  deleteRadioStation,
  updateRadioStationName,
} from "../database/radioStationService";

interface Props {
  station: RadioStation;
}

const RadioCard = ({ station }: Props) => {
  const [newName, setNewName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { selectedStation, setSelectedStation, setFavoriteRadios } = useRadio();
  const { stationuuid, name, country, countrycode, url } = station;

  const isActiveRadio = selectedStation.name === name;

  const { isPlaying, togglePlay, isLoading, audioRef } = useAudioPlayer(
    url,
    isActiveRadio
  );

  const handlePlayStopClick = () => {
    setSelectedStation(station);
    togglePlay();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSubmitEdit = async (newName: string) => {
    await updateRadioStationName(stationuuid, newName, setFavoriteRadios);
    setIsEditing(false);
  };

  const handleNewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewName(value);
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
        {isEditing ? (
          <div>
            <input
              placeholder="Type the new name for the radio"
              data-testid="edit-input"
              type="text"
              value={newName}
              onChange={handleNewNameChange}
              className=" border border-gray-300 bg-transparent text-white rounded-[10px] p-2 focus:outline-none focus:ring focus:ring-gray-500"
            />
            <div className="flex gap-2 mt-2">
              <button
                className="p-1 bg-red-300 rounded-md"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
              <button
                className="p-1 bg-blue-300 rounded-md"
                data-testid="save-button"
                onClick={() => {
                  handleSubmitEdit(newName);
                }}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="text-3xl">{name}</p>
        )}

        {country && countrycode ? (
          <p className="text-sm">
            {country}, {countrycode}
          </p>
        ) : (
          <p>Location not provided</p>
        )}
      </div>
      <div className="flex gap-4">
        <IconButton
          dataTestid="edit-button"
          onClick={handleEditClick}
          Icon={EditIcon}
        />
        <IconButton
          onClick={() => deleteRadioStation(stationuuid, setFavoriteRadios)} // Call the new function
          Icon={RemoveIcon}
        />
      </div>
      {url && <audio data-testid="audio-element" ref={audioRef} />}
    </div>
  );
};

export default RadioCard;
