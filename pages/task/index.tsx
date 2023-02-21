import Image from "next/image";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useQuery } from "react-query";
import FilterByNameModal from "../../components/FilterByCoinModal";
import TableLoading from "../../components/TableLoading";
import { fetchCoinsName, fetchCoinsMarket } from "../../config/apis";
import { ICoinName } from "../../config/types";

interface Query {
  coins: ICoinName[];
  page: number;
}

export default function TaskOne() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [query, setQuery] = useState<Query>({ page: 0, coins: [] });

  const { data: coinsName, isLoading } = useQuery("coins_name", fetchCoinsName);
  const { data: coinsMarket, isFetching } = useQuery(
    ["coins_market", query.page + 1, query.coins.map(({ id }) => id)],
    () =>
      fetchCoinsMarket(
        query.page + 1,
        query.coins.map(({ id }) => id)
      ),
    {
      enabled: !!coinsName?.data.length,
      keepPreviousData: true,
    }
  );

  const handleChangePage = (selectedItem: { selected: number }) => {
    setQuery((prev) => ({ ...prev, page: selectedItem.selected }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const handleChangeCoins = (coins: ICoinName[]) => {
    setQuery((prev) => ({ ...prev, page: 0, coins }));
  };

  return (
    <div className="container mx-auto mt-5">
      <button className="btn mb-5" onClick={handleToggleModal}>
        Filter by coins name
      </button>
      <FilterByNameModal
        onChange={handleChangeCoins}
        defaultCoins={query.coins}
        isOpen={isOpenModal}
        toggle={handleToggleModal}
        coinsName={coinsName?.data ?? []}
      />
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="!z-0">#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>24h</th>
              <th>7d</th>
              <th>Market Cap</th>
              <th>Total Volume</th>
            </tr>
          </thead>
          <tbody>
            {!isFetching && !isLoading ? (
              coinsMarket?.data.map((coin, index) => (
                <tr key={coin.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <Image
                            loading="lazy"
                            width={48}
                            height={48}
                            src={coin.image}
                            alt={coin.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{coin.name}</div>
                        <div className="text-sm opacity-50">{coin.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td>${coin.current_price?.toLocaleString()}</td>
                  <td
                    className={
                      coin.price_change_percentage_24h_in_currency < 0
                        ? "text-error"
                        : "text-success"
                    }
                  >
                    {coin.price_change_percentage_24h_in_currency?.toFixed(2)}%
                  </td>
                  <td
                    className={
                      coin.price_change_percentage_7d_in_currency < 0
                        ? "text-error"
                        : "text-success"
                    }
                  >
                    {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                  </td>
                  <td>${coin.market_cap?.toLocaleString()}</td>
                  <td>${coin.total_volume?.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <TableLoading />
            )}
          </tbody>
        </table>
        <div className="my-10 flex justify-center">
          <ReactPaginate
            pageCount={Math.ceil(
              (query.coins.length
                ? query.coins.length
                : coinsName?.data.length
                ? coinsName.data.length
                : 0) / 10
            )}
            initialPage={query.page}
            onPageChange={handleChangePage}
            className="btn-group"
            pageClassName="btn p-0"
            activeClassName="btn btn-primary p-0"
            breakClassName="btn btn-disabled"
            previousClassName="btn p-0"
            nextClassName="btn p-0"
            pageLinkClassName="p-4"
            previousLinkClassName="p-4"
            nextLinkClassName="p-4"
          />
        </div>
      </div>
    </div>
  );
}
