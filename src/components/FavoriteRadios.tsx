import { useEffect, useState } from "react";

import RadioCardsList from "./RadioCardsList";
import { RadioStation } from "../database/models/radioStation";
import IconButton from "./IconButton";
import { SearchIcon } from "../assets/icons";
import { useRadio } from "../hooks/useRadio";

interface Props {
  favoriteStations: RadioStation[];
}

const FavoriteRadios = ({ favoriteStations }: Props) => {
  const { selectedStation } = useRadio();
  const [filteredStations, setFilteredStations] = useState<RadioStation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredStations(favoriteStations);
  }, [favoriteStations]);

  const filterStations = (input: string) => {
    const filtered = favoriteStations.filter((station) => {
      if (input === "") return true;
      return (
        station.data?.name.toLowerCase().includes(input.toLowerCase()) ||
        station.data?.language?.toLowerCase().includes(input.toLowerCase()) ||
        station.data?.country.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFilteredStations(filtered);
    setSearchTerm("");
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="uppercase">Favorite Radios</div>
        <div className="flex gap-4 items-center">
          <IconButton
            Icon={SearchIcon}
            onClick={() => {
              filterStations(searchTerm);
            }}
            fill="blue"
            containerSize="5"
          />
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                filterStations(searchTerm);
              }
            }}
            onChange={handleSearchTermChange}
            value={searchTerm}
            type="text"
            placeholder="Search your stations..."
            className="bg-transparent text-white rounded-[10px] p-2 focus:outline-none focus:ring focus:ring-gray-500"
          />
        </div>
      </div>
      <div className="bg-secondary-gray rounded-[10px] py-2 px-1 mt-1">
        {selectedStation.name !== "" ? (
          <div>{selectedStation.name}</div>
        ) : (
          <div>Choose a Radio</div>
        )}

        <div className="shadow-md border-2 border-gray-700"></div>
        <RadioCardsList stations={filteredStations} />
      </div>
    </>
  );
};

export default FavoriteRadios;
