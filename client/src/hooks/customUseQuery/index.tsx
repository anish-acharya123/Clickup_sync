import { useQuery, QueryKey } from "react-query";
import axios, { AxiosRequestConfig } from "axios";

const API = async <T,>(
  api: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response = await axios.get(api, options);
    return response.data;
  } catch (error) {
    throw new Error("user cannot fetch");
  }
};

const customUseQuery = <TData,>(
  querykey: QueryKey,
  url: string,
  options: AxiosRequestConfig = {}
) => {
  return useQuery({
    queryKey: querykey,
    queryFn: () => API<TData>(url, options),
  });
};

export default customUseQuery;
