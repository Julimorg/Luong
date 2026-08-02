import type { IProvince } from "../interface/IProvince";
import { externalAxiosClient } from "./axiosClient";


const PROVINCE_BASE_URL = "https://provinces.open-api.vn/api/v2/";

export const api_handler = {
  GetAllProvinces: async (): Promise<IProvince[]> => {
    const res = await externalAxiosClient.get<IProvince[]>(PROVINCE_BASE_URL);
    return res.data;
  },
};
