import { useMutation } from "@tanstack/react-query";
import { postDoc } from "./apiServices";
import { useRouter } from "next/router";
import notify from "./notify";

export const createDoc = async (data) => {
  const router = useRouter();
  const createDocMutation = useMutation((data) => postDoc("/api/docs", data), {
    onSuccess: async () => {
      notify("Document created successfully", "success");
      router.push("/");
    },
    onError: (error) => {
      notify("Error creating document: " + error.message, "error");
    },
  });
  const createDocument = async (data) => {
    await createDocMutation.mutateAsync(data);
  };

  return {
    createDocument,
    isCreating: createDocMutation.isLoading,
  };
};
