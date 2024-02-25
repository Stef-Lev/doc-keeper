import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import AlertModal from "@/components/AlertModal";
import { Box, useDisclosure } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import notify from "@/helpers/notify";
import PageHeader from "@/components/PageHeader";
import HeaderButton from "@/components/HeaderButton";
import { useDeleteDoc } from "@/helpers/apiMutations";
import { useGetDocPreview } from "@/helpers/apiQueries";
import LoaderOverlay from "@/components/LoaderOverlay";
import { convertFromRaw, EditorState } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
const DocViewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { data: session } = useSession();
  const { deleteDoc } = useDeleteDoc(session?.user?.id);
  const { isLoading, error, data, isFetching } = useGetDocPreview(
    id,
    session?.user?.id
  );

  const handleDeleteClick = () => {
    onOpen();
  };

  if (error) {
    notify("Something went wrong", "error");
    return null;
  }

  if (isLoading || isFetching || !data) {
    return <LoaderOverlay />;
  }

  return (
    <Box>
      <PageHeader
        buttons={[
          <HeaderButton
            text="Edit"
            type="edit"
            onClick={() => router.push(`/document/${id}/edit`)}
          />,
          <HeaderButton
            text="Delete"
            type="delete"
            onClick={() => handleDeleteClick()}
          />,
        ]}
        backToPage={`/`}
      />
      {data.content && (
        <Box
          textAlign="center"
          margin="16px auto"
          background="#fff"
          padding="10px"
          marginBottom="120px"
          color="#000"
          borderRadius="10px"
        >
          <Editor
            toolbarOnFocus={false}
            toolbarHidden={true}
            readOnly={true}
            editorState={EditorState.createWithContent(
              convertFromRaw(data.content)
            )}
          />
        </Box>
      )}
      <AlertModal
        type="delete"
        onClose={onClose}
        isOpen={isOpen}
        callBackAction={() => deleteDoc(id)}
      />
    </Box>
  );
};

export default DocViewPage;
