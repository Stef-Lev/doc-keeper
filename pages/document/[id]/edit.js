import dynamic from "next/dynamic";
import HeaderButton from "@/components/HeaderButton";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import PageHeader from "@/components/PageHeader";
import { useGetEditableDoc } from "@/helpers/apiQueries";
import { useDisclosure } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigationObserver } from "hooks/useNavigationObserver";
import AlertModal from "@/components/AlertModal";
import { useUpdateDoc } from "@/helpers/apiMutations";
import LoaderOverlay from "@/components/LoaderOverlay";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import notify from "@/helpers/notify";
import { Box } from "@chakra-ui/react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { updateDoc, isLoading: isEditLoading } = useUpdateDoc();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [dirty, setDirty] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigationObserver({
    shouldStopNavigation: dirty,
    onNavigate: () => onOpen(),
  });

  const { isLoading, error, data, isFetching } = useGetEditableDoc(
    id,
    session?.user?.id
  );

  useEffect(() => {
    if (data) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(data.content))
      );
    }
  }, [data]);

  if (error) {
    notify("Something went wrong", "error");
    return null;
  }

  if (isLoading || isFetching || !data || isEditLoading) {
    return <LoaderOverlay />;
  }

  const handleChange = (newEditorState) => {
    setDirty(true);
    setEditorState(newEditorState);
  };

  const handlePatchDocument = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    if (!raw.blocks.map((it) => it.type).includes("header-one")) {
      notify("Please add a title to the document (H1)", "error");
    } else {
      setDirty(false);
      updateDoc({ id, body: { content: raw } });
    }
  };

  return (
    <Box>
      <PageHeader
        buttons={[
          <HeaderButton
            text="Save"
            type="save"
            onClick={() => handlePatchDocument()}
          />,
        ]}
      />
      {editorState && (
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
            editorState={editorState}
            toolbarClassName="rich-toolbar"
            wrapperClassName="rich-wrapper"
            editorClassName="rich-editor"
            onEditorStateChange={handleChange}
          />
        </Box>
      )}
      <AlertModal
        type="leave"
        onClose={onClose}
        isOpen={isOpen}
        callBackAction={navigate}
      />
    </Box>
  );
};

export default EditPage;
