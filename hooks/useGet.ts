import ApiService from "@/services/api";
import { useState, useEffect, useCallback } from "react";

interface UseGetOptions {
  pagination?: { page: number; pageSize: number };
  refetchTime?: number;
  authorized?: boolean;
}

interface UseGetResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  refetch: () => void;
}

function useGet<T>(url: string, options?: UseGetOptions): UseGetResponse<T> {
  const { pagination, refetchTime, authorized } = options || {};

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (pagination) {
        queryParams.append("page", pagination.page.toString());
        queryParams.append("pageSize", pagination.pageSize.toString());
      }

      const api = authorized ? ApiService.authorized : ApiService.unauthorized;
      const response = await api.get<T>(`${url}?${queryParams.toString()}`);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [url, pagination, authorized]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
    if (refetchTime) {
      const intervalId = setInterval(fetchData, refetchTime);
      return () => clearInterval(intervalId);
    }
  }, [fetchData, refetchTime]);

  return { data, error, loading, refetch };
}

export default useGet;
