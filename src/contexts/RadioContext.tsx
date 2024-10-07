import React, { createContext, useEffect, useState } from "react";
import {
  RadioStation,
  RadioStationData,
} from "../database/models/radioStation";
import { getRadiosStation } from "../api/getAllRadioStations";
import {
  addData,
  DB_CONFIG,
  getData,
  openDatabase,
} from "../database/indexedDB";

interface RadioContextType {
  stations: RadioStation[];
  isFetching: boolean;
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
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setIsFetching(true);
        const db = await openDatabase(
          DB_CONFIG.dbName,
          DB_CONFIG.version,
          DB_CONFIG.stores
        );

        const storedData = await getData(db, "stations", "stationList");

        const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
        const currentTime = Date.now();

        let timeSpentFromLastFetch: number | null = null;

        if (storedData && "timestamp" in storedData) {
          timeSpentFromLastFetch = currentTime - Number(storedData.timestamp);
        }

        if (
          !storedData ||
          (timeSpentFromLastFetch ?? Infinity) > oneDayInMilliseconds
        ) {
          const fetchedStations = await getRadiosStation();

          if (
            !storedData ||
            (storedData &&
              "data" in storedData &&
              JSON.stringify(fetchedStations) !==
                JSON.stringify(storedData.data))
          ) {
            if (fetchedStations) {
              const dataWithTimestamp: RadioStationData = {
                id: "stationList",
                data: fetchedStations,
                timestamp: currentTime,
              };

              await addData(db, "stations", dataWithTimestamp);
              setStations(fetchedStations);
            }
          } else if (storedData && "data" in storedData) {
            setStations(storedData.data);
          }
        } else if (storedData && "data" in storedData) {
          setStations(storedData.data);
        } else {
          console.warn(
            "Stored data is not valid RadioStationData, using fetched data."
          );
          const fetchedStations = await getRadiosStation();
          setStations(fetchedStations!);
        }
      } catch (error) {
        console.log("Error fetching stations: ", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchStations();
  }, []);

  return (
    <RadioContext.Provider
      value={{
        stations,
        isFetching,
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
