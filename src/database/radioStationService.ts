import {
  openDatabase,
  addData,
  getData,
  getAllData,
  DB_CONFIG,
  deleteData,
  updateStationName,
} from "./indexedDB";
import { RadioStation } from "./models/radioStation";

export const checkIfFavorite = async (
  stationuuid: string
): Promise<boolean> => {
  const db = await openDatabase(
    DB_CONFIG.dbName,
    DB_CONFIG.version,
    DB_CONFIG.stores
  );
  const existingStation = await getData(db, "favorite_stations", stationuuid);

  if (existingStation) {
    return true;
  } else return false;
};

export const addRadioToFavorite = async (
  stationuuid: string,
  station: RadioStation
): Promise<void> => {
  const db = await openDatabase(
    DB_CONFIG.dbName,
    DB_CONFIG.version,
    DB_CONFIG.stores
  );

  const data = Array.isArray(station) ? station : [station];

  await addData(db, "favorite_stations", {
    id: stationuuid,
    data: data[0],
  });
};

export const getFavoriteStations = async (): Promise<RadioStation[]> => {
  const db = await openDatabase(
    DB_CONFIG.dbName,
    DB_CONFIG.version,
    DB_CONFIG.stores
  );
  return await getAllData(db, "favorite_stations");
};

export const deleteRadioStation = async (
  stationuuid: string,
  setFavoriteRadios: (stations: RadioStation[]) => void
) => {
  const db = await openDatabase(
    DB_CONFIG.dbName,
    DB_CONFIG.version,
    DB_CONFIG.stores
  );

  await deleteData(db, "favorite_stations", stationuuid);

  const updatedFavorites = await getAllData(db, "favorite_stations");
  setFavoriteRadios(updatedFavorites);
};

export const updateRadioStationName = async (
  stationuuid: string,
  newName: string,
  setFavoriteRadios: (stations: RadioStation[]) => void
) => {
  const db = await openDatabase(
    DB_CONFIG.dbName,
    DB_CONFIG.version,
    DB_CONFIG.stores
  );

  await updateStationName(db, "favorite_stations", stationuuid, newName);

  const updatedFavorites = await getAllData(db, "favorite_stations");
  setFavoriteRadios(updatedFavorites);
};
