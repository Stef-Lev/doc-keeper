import dynamic from "next/dynamic";
import PageHeader from "@/components/PageHeader";
import HeaderButton from "@/components/HeaderButton";
import { useNavigationObserver } from "hooks/useNavigationObserver";
import AlertModal from "@/components/AlertModal";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useAddDoc } from "@/helpers/mutations";
import { EditorState, convertToRaw } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import notify from "@/helpers/notify";
import { Box } from "@chakra-ui/react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const newDocPage = () => {
  const { addDoc } = useAddDoc();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [dirty, setDirty] = useState(false);

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
    setDirty(true);
  };
  const { onOpen, onClose, isOpen } = useDisclosure();
  const navigate = useNavigationObserver({
    shouldStopNavigation: dirty,
    onNavigate: () => onOpen(),
  });

  const handleCreateDocument = async () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    if (!raw.blocks.map((it) => it.type).includes("header-one")) {
      notify("Please add a title to the document (H1)", "error");
    } else {
      setDirty(false);
      await addDoc({ content: raw, createdAt: new Date() });
    }
  };

  return (
    <Box>
      <PageHeader
        buttons={[
          <HeaderButton
            text="Save"
            type="save"
            onClick={handleCreateDocument}
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

export default newDocPage;
