import dynamic from "next/dynamic";
import HeaderButton from "@/components/HeaderButton";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { useDisclosure } from "@chakra-ui/react";
import { getOne } from "@/helpers/apiServices";
import { useState, useEffect } from "react";
import { useNavigationObserver } from "hooks/useNavigationObserver";
import AlertModal from "@/components/AlertModal";
import { useAddDoc } from "@/helpers/mutations";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import notify from "@/helpers/notify";
import { Box } from "@chakra-ui/react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { addDoc } = useAddDoc();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [dirty, setDirty] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigationObserver({
    shouldStopNavigation: dirty,
    onNavigate: () => onOpen(),
  });

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: [`docEdit_${id}`],
    queryFn: () =>
      getOne("/api/docs/", id)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        }),
    enabled: !!id,
    retry: false,
    staleTime: Infinity,
  });

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

  if (isLoading || isFetching || !data) {
    return <Loader fullScreen />;
  }

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
    setDirty(true);
  };

  const handleCreateDocument = async () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    if (!raw.blocks.map((it) => it.type).includes("header-one")) {
      notify("Please add a title to the document (H1)", "error");
    } else {
      await addDoc({ content: raw, createdAt: new Date() });
      console.log({ content: raw, createdAt: new Date() });
    }
  };

  return (
    <Box>
      <PageHeader
        buttons={[
          <HeaderButton
            text="Save"
            type="save"
            onClick={() => handleCreateDocument()}
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
          editorState={editorState}
          toolbarClassName="rich-toolbar"
          wrapperClassName="rich-wrapper"
          editorClassName="rich-editor"
          onEditorStateChange={handleChange}
        />
      </Box>
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
