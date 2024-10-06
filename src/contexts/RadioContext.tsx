import React, { createContext, useEffect, useState } from "react";
import { RadioStation } from "../types/radioStation";
import { getRadiosStation } from "../api/getAllRadioStations";
import { addData, getData, openDatabase } from "../utils/indexedDB";

interface RadioContextType {
  stations: RadioStation[];
  favoriteRadios: RadioStation[];
  selectedStation: RadioStation;
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
    name: "",
    language: "",
    country: "",
    countrycode: "",
    url: "",
  });

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const db = await openDatabase("RadioDB", 4, [
          "stations",
          "favorite_stations",
        ]);
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
        setStations,
        setFavoriteRadios,
        setSelectedStation,
      }}
    >
      {children}
    </RadioContext.Provider>
  );
};
