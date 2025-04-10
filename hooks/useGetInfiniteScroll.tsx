import ApiService from "@/services/api";
import { useState, useEffect, useCallback } from "react";

interface UseGetInfiniteScrollOptions {
  initialPage?: number;
  pageSize?: number;
  authorized?: boolean;
}

interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
}

interface UseGetInfiniteScrollResponse<T> {
  data: T[];
  error: string | null;
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

function useGetInfiniteScroll<T>(
  url: string,
  options?: UseGetInfiniteScrollOptions
): UseGetInfiniteScrollResponse<T> {
  const { initialPage = 1, pageSize = 10, authorized } = options || {};

  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(initialPage);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
      });

      const api = authorized ? ApiService.authorized : ApiService.unauthorized;
      const response = await api.get<PaginatedResponse<T>>(
        `${url}?${queryParams.toString()}`
      );

      setData((prev) => [...prev, ...response.data.items]);
      setPage(response.data.page);
      setHasMore(
        response.data.page * response.data.limit < response.data.total
      );
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [url, page, pageSize, authorized, hasMore]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return { data, error, loading, hasMore, loadMore };
}

export default useGetInfiniteScroll;
