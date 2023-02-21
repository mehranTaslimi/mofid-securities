import { ChangeEvent, useState } from "react";
import { ICoinName } from "../config/types";

interface FilterByNameModalProps {
  coinsName: ICoinName[];
  isOpen: boolean;
  toggle: () => void;
  defaultCoins: ICoinName[];
  onChange?: (coins: ICoinName[]) => void;
}

export default function FilterByCoinModal({
  coinsName,
  isOpen,
  defaultCoins,
  toggle,
  onChange,
}: FilterByNameModalProps) {
  const [selectedCoin, setSelectedCoin] = useState<ICoinName[]>(defaultCoins);
  const [search, setSearch] = useState<string>("");

  const handleSelectCoin = (coin: ICoinName) => {
    setSelectedCoin((prev) => {
      return selectedCoin.map(({ id }) => id).includes(coin.id)
        ? prev.filter(({ id }) => id !== coin.id)
        : [...prev, coin];
    });
  };

  const handleSearch = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearch(ev.target.value);
  };

  const handleSubmit = () => {
    onChange?.(selectedCoin);
    setSearch("");
    toggle();
  };

  const handleClear = () => {
    onChange?.([]);
    setSelectedCoin([]);
    setSearch("");
    toggle();
  };

  return (
    <div className={`modal${isOpen ? " modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="mb-5 text-lg font-bold">Filter by coin name</h3>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search..."
          className="input-bordered input w-full"
        />
        {!!selectedCoin.length && (
          <div className="mt-5 border-b-2 border-slate-700 pb-5">
            <h6 className="text-sm font-bold">Selected names</h6>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedCoin.map((coin, index) => (
                <button
                  onClick={() => handleSelectCoin(coin)}
                  key={index}
                  className={`btn btn-sm flex flex-grow gap-2${
                    selectedCoin.map(({ id }) => id).includes(coin.id)
                      ? " btn-primary"
                      : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  {coin.name}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="my-5 flex flex-wrap gap-2">
          {coinsName
            .filter(
              (coin) =>
                search.length >= 3 &&
                !selectedCoin.map(({ name }) => name).includes(coin.name) &&
                coin.name
                  .toLowerCase()
                  .trim()
                  .includes(search.toLowerCase().trim())
            )
            .map((coin, index) => (
              <button
                onClick={() => handleSelectCoin(coin)}
                key={index}
                className={`btn flex flex-grow btn-sm${
                  selectedCoin.map(({ id }) => id).includes(coin.id)
                    ? " btn-primary"
                    : ""
                }${
                  search.toLowerCase().trim() === coin.name.toLowerCase().trim()
                    ? " border-success"
                    : ""
                }`}
              >
                {coin.name}
              </button>
            ))}
        </div>
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={handleClear}>
            Clear
          </button>
          <button className="btn px-10" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
