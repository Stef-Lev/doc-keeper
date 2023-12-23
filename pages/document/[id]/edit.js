import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { getDoc } from "@/helpers/apiServices";
import { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import { Box } from "@chakra-ui/react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [dirty, setDirty] = useState(false);
  const { isPending, error, data, fetching } = useQuery({
    queryKey: [`docEdit_${id}`],
    queryFn: () => getDoc("/api/docs/", id).then((res) => res.data),
    enabled: !!id,
    staleTime: Infinity,
  });

  const handleChange = (newEditorState) => {
    const currentContent = editorState.getCurrentContent();
    const newContent = newEditorState.getCurrentContent();

    setEditorState(newEditorState);

    if (currentContent !== newContent) {
      setDirty(true);
    }
  };

  useEffect(() => {
    if (data) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(data.content))
      );
    }
  }, [data]);

  if (isPending) {
    return <Loader fullScreen />;
  }

  console.log({ editorState });
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

export default EditPage;
