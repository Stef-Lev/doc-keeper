import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOne, deleteOne, updateOne } from "./apiServices";
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

export const useUpdateDoc = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: updateDoc, isLoading } = useMutation(
    (variables) => {
      const { id, body } = variables;
      updateOne("/api/docs/", id, body);
    },
    {
      onSuccess: () => {
        notify("Document updated", "success");
        queryClient.invalidateQueries("allDocs");
      },
      onError: (error) => {
        notify("Error: " + error.message, "error");
      },
      onSettled: () => {
        router.push("/");
      },
    }
  );

  return {
    updateDoc,
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
