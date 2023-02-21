import { ICoinName, ICurrenciesDetail } from "./types";
import { BASE_API_URL } from "./constant";
import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export const fetchCoinsName = async (): Promise<AxiosResponse<ICoinName[]>> => {
  const response = await axiosInstance.get<ICoinName[]>(
    BASE_API_URL.GET_COINS_NAME
  );
  return response;
};

export const fetchCoinsMarket = async (
  page: number,
  ids: string[]
): Promise<AxiosResponse<ICurrenciesDetail[]>> => {
  const response = await axiosInstance.get<ICurrenciesDetail[]>(
    BASE_API_URL.GET_COINS_MARKET,
    {
      params: {
        ids: `${ids}`,
        vs_currency: "usd",
        page,
        per_page: "10",
        price_change_percentage: "24h,7d",
      },
    }
  );
  return response;
};
