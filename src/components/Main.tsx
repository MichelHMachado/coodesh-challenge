import { useEffect } from "react";
import FavoriteRadios from "./FavoriteRadios";

import { DB_CONFIG, getAllData, openDatabase } from "../database/indexedDB";
import { useRadio } from "../hooks/useRadio";
import IconButton from "./IconButton";
import { HamburgerIcon } from "@/assets/icons";

interface Props {
  isSidebarVisible: boolean;
  handleToggleSidebar: () => void;
}

const Main = ({ isSidebarVisible, handleToggleSidebar }: Props) => {
  const { isFetching, favoriteRadios, setFavoriteRadios } = useRadio();

  useEffect(() => {
    const fetchFavoriteRadios = async () => {
      try {
        const db = await openDatabase(
          DB_CONFIG.dbName,
          DB_CONFIG.version,
          DB_CONFIG.stores
        );
        const data = await getAllData(db, "favorite_stations");
        setFavoriteRadios(data);
      } catch (error) {
        console.log("Error getting favorite radios: ", error);
      }
    };
    fetchFavoriteRadios();
  }, [setFavoriteRadios]);

  return (
    <div className="py-10 px-6 w-full relative">
      <div
        className={`absolute top-2 ${
          isSidebarVisible ? "hidden" : ""
        }  md:visible`}
      >
        <IconButton
          fill="blue"
          Icon={HamburgerIcon}
          onClick={handleToggleSidebar}
        />
      </div>
      <h1 className="text-3xl font-semibold text-center mb-4">Radio Browser</h1>

      <FavoriteRadios favoriteStations={favoriteRadios} />
      {isFetching && (
        <div className="flex flex-col gap-10 justify-center items-center absolute top-[50%] left-[50%] w-80 bg-blue-500/30 backdrop-blur-md border border-white/30 rounded-lg shadow-lg p-4 translate-x-[-50%] translate-y-[-50%]">
          <div className="loader"></div>
          <div>
            <p className="text-lg text-center">
              Processing stations from all around the word!
            </p>
            <p className="text-md text-center mt-3 text-gray-300 font-semibold">
              It will take only a few seconds and will happen just on your first
              access
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
