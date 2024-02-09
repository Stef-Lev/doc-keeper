import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postOne, deleteOne, updateOne } from "./apiServices";
import { useRouter } from "next/router";
import notify from "./notify";

export const useAddDoc = (userId) => {
  const router = useRouter();
  const { mutate: addDoc, isLoading } = useMutation(
    (data) => postOne(`/api/docs?user=${userId}`, data),
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
      onSuccess: async () => {
        notify("Document updated", "success");
        await queryClient.invalidateQueries("allDocs");
        await router.push("/");
      },
      onError: (error) => {
        notify("Error: " + error.message, "error");
      },
    }
  );

  return {
    updateDoc,
    isLoading,
  };
};

export const useDeleteDoc = (userId) => {
  const router = useRouter();
  const { mutate: deleteDoc, isLoading } = useMutation(
    (id) => deleteOne(`/api/docs/${id}?user=${userId}`),
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

export const useRegisterUser = () => {
  const { mutate: registerUser, isLoading } = useMutation(
    (data) => postOne("/api/auth/register", data),
    {
      onSuccess: () => {
        notify("Successfully added", "success");
      },
      onError: (error) => {
        notify("Error: " + error.message, "error");
      },
    }
  );

  return {
    registerUser,
    isLoading,
  };
};
