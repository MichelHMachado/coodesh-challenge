import { RadioStation } from "../types/radioStation";
import RadioCard from "./RadioCard";

interface Props {
  stations: RadioStation[];
}

const RadioCardsList = ({ stations }: Props) => {
  return (
    <>
      {stations.map((station, index) => {
        if (station.data) {
          return (
            <RadioCard
              key={station.data?.name + index.toString()}
              station={station.data}
            />
          );
        }
      })}
    </>
  );
};

export default RadioCardsList;
