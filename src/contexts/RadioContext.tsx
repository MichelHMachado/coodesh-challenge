import React, { createContext, useEffect, useState } from "react";
import { RadioStation } from "../database/models/radioStation";
import { getRadiosStation } from "../api/getAllRadioStations";
import {
  addData,
  DB_CONFIG,
  getData,
  openDatabase,
} from "../database/indexedDB";

interface RadioContextType {
  stations: RadioStation[];
  favoriteRadios: RadioStation[];
  selectedStation: RadioStation;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setStations: (stations: RadioStation[]) => void;
  setFavoriteRadios: (stations: RadioStation[]) => void;
  setSelectedStation: (station: RadioStation) => void;
}

export const RadioContext = createContext<RadioContextType | undefined>(
  undefined
);

export const RadioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [favoriteRadios, setFavoriteRadios] = useState<RadioStation[]>([]);
  const [selectedStation, setSelectedStation] = useState<RadioStation>({
    stationuuid: "",
    name: "",
    language: "",
    country: "",
    countrycode: "",
    url: "",
  });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const db = await openDatabase(
          DB_CONFIG.dbName,
          DB_CONFIG.version,
          DB_CONFIG.stores
        );
        const storedStations = await getData(db, "stations", "stationList");

        if (!storedStations) {
          const stationsData = await getRadiosStation();
          if (stationsData) {
            await addData(db, "stations", {
              id: "stationList",
              data: stationsData,
            });
            setStations(stationsData);
          }
        } else {
          setStations(storedStations);
        }
      } catch (error) {
        console.log("Error fetching stations: ", error);
      }
    };

    fetchStations();
  }, []);

  return (
    <RadioContext.Provider
      value={{
        stations,
        favoriteRadios,
        selectedStation,
        isPlaying,
        setIsPlaying,
        setStations,
        setFavoriteRadios,
        setSelectedStation,
      }}
    >
      {children}
    </RadioContext.Provider>
  );
};
