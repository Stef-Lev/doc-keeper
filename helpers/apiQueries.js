import { useQuery } from "@tanstack/react-query";
import { getAll, getOne } from "./apiServices";

export const useGetAllDocs = () => {
  return useQuery({
    queryKey: ["allDocs"],
    queryFn: () =>
      getAll("/api/docs")
        .then((res) => res.data)
        .catch((err) => {
          notify("Error fetching documents: " + err.message, "error");
          throw err;
        }),
    retry: false,
    staleTime: 2000,
  });
};

export const useGetDocPreview = (id) => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: [`docView_${id}`],
    queryFn: () =>
      getOne("/api/docs/", id)
        .then((res) => res.data)
        .catch((err) => {
          notify("Error fetching document: " + err.message, "error");
          throw err;
        }),
    enabled: !!id,
    retry: false,
    staleTime: 2000,
  });
  return { isLoading, error, data, isFetching };
};

export const useGetEditableDoc = (id) => {
  return useQuery({
    queryKey: [`docEdit_${id}`],
    queryFn: () =>
      getOne("/api/docs/", id)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        }),
    enabled: !!id,
    retry: false,
    staleTime: 2000,
  });
};
