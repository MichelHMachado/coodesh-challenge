import RadioCard from "./RadioCard";
import RadioCardsList from "./RadioCardsList";

const FavoriteRadios = () => {
  return (
    <>
      <h2 className="text-gray-400"></h2>
      <div className="flex justify-between">
        <div className="uppercase">Favorite Radios</div>
        <div>
          <input type="text" />
        </div>
      </div>
      <div className="bg-secondary-gray rounded-lg py-6 px-1 mt-1">
        <RadioCard />
        <div className="h-[3px] w-full bg-black"></div>
        <RadioCardsList />
      </div>
    </>
  );
};

export default FavoriteRadios;
