import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import notify from "@/helpers/notify";
import PageHeader from "@/components/PageHeader";
import HeaderButton from "@/components/HeaderButton";
import { useDeleteDoc } from "@/helpers/apiMutations";
import { useGetDocPreview } from "@/helpers/apiQueries";
import { convertFromRaw, EditorState } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
const DocViewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const { deleteDoc } = useDeleteDoc();
  const { isLoading, error, data, isFetching } = useGetDocPreview(
    id,
    session?.user?.id
  );

  const handleDeleteClick = async () => {
    await deleteDoc(id);
  };

  if (error) {
    notify("Something went wrong", "error");
    return null;
  }

  if (isLoading || isFetching || !data) {
    return <Loader fullScreen />;
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
      />
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
    </Box>
  );
};

export default DocViewPage;
