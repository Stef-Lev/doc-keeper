import { useQuery } from "@tanstack/react-query";
import { getAll, getOne } from "./apiServices";
import notify from "./notify";

export const useGetAllDocs = (userId) => {
  return useQuery({
    queryKey: [`allDocs?user=${userId}`],
    queryFn: () =>
      getAll(`/api/docs?user=${userId}`)
        .then((res) => res.data)
        .catch((err) => {
          notify("Error fetching documents: " + err.message, "error");
          throw err;
        }),
    enabled: !!userId,
    retry: false,
    staleTime: Infinity,
  });
};

export const useGetDocPreview = (id, userId) => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: [`docView?id=${id}&user=${userId}`],
    queryFn: () =>
      getOne(`/api/docs/${id}?user=${userId}`)
        .then((res) => res.data)
        .catch((err) => {
          notify("Error fetching document: " + err.message, "error");
          throw err;
        }),
    enabled: !!id && !!userId,
    retry: false,
    staleTime: Infinity,
  });
  return { isLoading, error, data, isFetching };
};

export const useGetEditableDoc = (id, userId) => {
  return useQuery({
    queryKey: [`docEdit?id=${id}&user=${userId}`],
    queryFn: () =>
      getOne(`/api/docs/${id}?user=${userId}`)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        }),
    enabled: !!id,
    retry: false,
    staleTime: Infinity,
  });
};
