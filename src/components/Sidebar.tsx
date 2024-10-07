import { useState } from "react";
import { RadioStation } from "../database/models/radioStation";

import { useRadio } from "../hooks/useRadio";
import SidebarRadioCard from "./SidebarRadioCard";

const ITEMS_PER_PAGE = 10;

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
