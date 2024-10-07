import { useEffect } from "react";
import FavoriteRadios from "./FavoriteRadios";

import { DB_CONFIG, getAllData, openDatabase } from "../database/indexedDB";
import { useRadio } from "../hooks/useRadio";

const Main = () => {
  const { favoriteRadios, setFavoriteRadios } = useRadio();
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
    <div className="py-10 px-6 w-full">
      <h1 className="text-3xl font-semibold text-center mb-4">Radio Browser</h1>

      <FavoriteRadios favoriteStations={favoriteRadios} />
    </div>
  );
};

export default Main;
