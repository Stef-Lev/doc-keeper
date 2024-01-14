import { useMutation } from "@tanstack/react-query";
import { postOne, deleteOne } from "./apiServices";
import { useRouter } from "next/router";
import notify from "./notify";

export const useAddDoc = () => {
  const router = useRouter();
  const { mutate: addDoc, isLoading } = useMutation(
    (data) => postOne("/api/docs/", data),
    {
      onSuccess: () => {
        notify("Successfully added", "success");
        router.push("/");
      },
      onError: (error) => {
        notify("Error: " + error.message, "error");
      },
    }
  );

  return {
    addDoc,
    isLoading,
  };
};

export const useDeleteDoc = () => {
  const router = useRouter();
  const { mutate: deleteDoc, isLoading } = useMutation(
    (id) => deleteOne("/api/docs/", id),
    {
      onSuccess: () => {
        notify("Document deleted", "success");
        router.push("/");
      },
      onError: (error) => {
        notify("Error: " + error.message, "error");
      },
    }
  );

  return {
    deleteDoc,
    isLoading,
  };
};
