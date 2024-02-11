import { useQuery } from "@tanstack/react-query";
import { getAll, getOne } from "./apiServices";
import notify from "./notify";

export const useGetAllDocs = (userId) => {
  return useQuery({
    queryKey: ["allDocs", userId],
    queryFn: () =>
      getAll(`/api/docs?user=${userId}`)
        .then((res) => res.data)
        .catch((err) => {
          notify("Error fetching documents: " + err.message, "error");
          throw err;
        }),
    enabled: !!userId,
    retry: false,
    staleTime: 2000,
  });
};

export const useGetDocPreview = (id, userId) => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["docView", id, userId],
    queryFn: () =>
      getOne(`/api/docs/${id}?user=${userId}`)
        .then((res) => res.data)
        .catch((err) => {
          notify("Error fetching document: " + err.message, "error");
          throw err;
        }),
    enabled: !!id && !!userId,
    retry: false,
    staleTime: 2000,
  });
  return { isLoading, error, data, isFetching };
};

export const useGetEditableDoc = (id, userId) => {
  return useQuery({
    queryKey: ["docEdit", id, userId],
    queryFn: () =>
      getOne(`/api/docs/${id}?user=${userId}`)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        }),
    enabled: !!id,
    retry: false,
    staleTime: 2000,
  });
};
