import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getDoc } from "@/helpers/apiServices";
import Loader from "@/components/Loader";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/PageHeader";
// import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
const DocViewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.route, id);
  const { isPending, error, data, fetching } = useQuery({
    queryKey: ["docView"],
    queryFn: () => getDoc("/api/docs/", id).then((res) => res.data),
    enabled: !!id,
  });

  if (isPending) {
    return <Loader fullScreen />;
  }
  console.log({ data });
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
