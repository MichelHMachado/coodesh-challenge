import { RadioStation } from "../database/models/radioStation";

export const getRadiosStation = async (): Promise<RadioStation[] | null> => {
  try {
    const response = await fetch(
      "https://de1.api.radio-browser.info/json/stations/search",
      {
        headers: {
          "User-Agent": "radio-browser-challenge-michel-machado/0.0.0",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RadioStation[] = await response.json();

    const filteredData = data.map((station: RadioStation) => ({
      stationuuid: station.stationuuid,
      name: station.name,
      url: station.url,
      country: station.country,
      countrycode: station.countrycode,
      language: station.language,
    }));

    console.log("Stations fetched successfully");

    return filteredData;
  } catch (error) {
    console.log("Error getting all radio stations: ", error);
    return null;
  }
};
