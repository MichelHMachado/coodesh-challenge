import { useEffect, useState } from "react";
import { RadioStation } from "../types/radioStation";
import IconButton from "./IconButton";
import { CheckIcon } from "../assets/icons";
import { addData, getAllData, getData, openDatabase } from "../utils/indexedDB";

import useAudioPlayer from "../hooks/useAudioPlayer";
import AudioControls from "./AudioControls";
import { useRadio } from "../hooks/useRadio";

const ITEMS_PER_PAGE = 10;

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
  const { name, url } = station;

  const [isFavorite, setIsFavorite] = useState(false);

  const { isPlaying, togglePlay, isLoading, audioRef } = useAudioPlayer(
    url,
    isSelected
  );

  const handlePlayStopClick = () => {
    togglePlay();
  };

  useEffect(() => {
    const checkIfFavorite = async () => {
      const db = await openDatabase("RadioDB", 4, ["favorite_stations"]);
      const existingStation = await getData(db, "favorite_stations", name);
      if (existingStation) {
        setIsFavorite(true);
      }
    };
    checkIfFavorite();
  }, [name]);

  const addRadioToFavoriteList = async () => {
    console.log("station: ", station);
    console.log("name: ", name);
    const db = await openDatabase("RadioDB", 4, ["favorite_stations"]);

    const existingStation = await getData(db, "favorite_stations", name);
    if (existingStation) {
      alert("Station is already in the favorites list.");
      return;
    }

    await addData(db, "favorite_stations", { id: name, data: station });

    setIsFavorite(true);

    const updatedFavorites = await getAllData(db, "favorite_stations");
    setFavoriteRadios(updatedFavorites);
  };

  return (
    <div
      className={`p-3  rounded-[10px] border border-black cursor-pointer transition-all duration-300 ${
        isSelected
          ? "bg-gray-400 text-black "
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

const Sidebar = () => {
  const { stations, selectedStation, setSelectedStation, setFavoriteRadios } =
    useRadio();
  const [filteredStations, setFilteredStations] = useState<RadioStation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filterStations = (input: string) => {
    const uniqueStationNames = new Set<string>();
    const filtered = stations.filter((station) => {
      if (input === "") return true;

      const isUnique = !uniqueStationNames.has(station.name);
      if (isUnique) {
        uniqueStationNames.add(station.name);

        return (
          station.name.toLowerCase().includes(input.toLowerCase()) ||
          station.language.toLowerCase().includes(input.toLowerCase()) ||
          station.country.toLowerCase().includes(input.toLowerCase())
        );
      }
      return false;
    });

    setFilteredStations(filtered);
    setCurrentPage(1);
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterStations(value);
  };

  const totalPages = Math.ceil(filteredStations.length / ITEMS_PER_PAGE);
  const currentStations = filteredStations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-black p-4 shrink-0 max-w-[280px]">
      <input
        value={searchTerm}
        onChange={handleSearchTermChange}
        type="text"
        placeholder="Search stations"
        className="mb-4 p-3 rounded-[10px] bg-[#62626C] shadow-md focus:outline-none focus:ring focus:ring-gray-500"
      />
      {filteredStations.length > 0 && (
        <div className="flex flex-col gap-3">
          {searchTerm !== "" && (
            <>
              <div className="pagination mt-4">
                {currentPage > 1 && (
                  <button onClick={handlePreviousPage}>Previous</button>
                )}
                <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
                {currentPage < totalPages && (
                  <button onClick={handleNextPage}>Next</button>
                )}
              </div>
              {currentStations.map((station, index) => (
                <SidebarRadioCard
                  isSelected={selectedStation.name === station.name}
                  key={station.name + index}
                  station={station}
                  setSelectedStation={setSelectedStation}
                  setFavoriteRadios={setFavoriteRadios}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
