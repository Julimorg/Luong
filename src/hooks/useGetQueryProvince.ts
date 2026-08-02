import { useQuery } from "@tanstack/react-query";
import type { IProvince } from "../interface/IProvince";
import { QueryKeys } from "../constant/queryKey";
import { api_handler } from "../api/docApi";
import type { UseQueryOptions } from "@tanstack/react-query";

type UseGetProvincesOptions = Omit<
  UseQueryOptions<IProvince[], unknown>,
  "queryKey" | "queryFn"
>;

export const useGetProvinces = (options?: UseGetProvincesOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.GET_PROVINCES],
    queryFn: () => api_handler.GetAllProvinces(),
    // Dữ liệu tỉnh/thành gần như không đổi -> cache dài, tránh gọi lại API mỗi lần vào trang
    staleTime: 1000 * 60 * 60, // 1 giờ
    gcTime: 1000 * 60 * 60 * 24, // giữ cache 1 ngày
  });
};