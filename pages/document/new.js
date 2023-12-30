import dynamic from "next/dynamic";
import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { useMutation } from "@tanstack/react-query";
import { getDoc } from "@/helpers/apiServices";
import { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import notify from "@/helpers/notify";
import { Box } from "@chakra-ui/react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const newDocPage = () => {
  const router = useRouter();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [dirty, setDirty] = useState(false);

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
    setDirty(true);
  };

  return (
    <Box>
      <PageHeader />
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
    </Box>
  );
};

export default newDocPage;
