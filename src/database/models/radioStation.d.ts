export interface RadioStation {
  data?: RadioStation;
  stationuuid: string;
  name: string;
  url: string;
  country: string;
  countrycode: string;
  language: string;
}

export interface RadioStationData {
  id: string;
  data: RadioStation[] | RadioStation;
}
