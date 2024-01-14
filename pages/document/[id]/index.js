import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getOne } from "@/helpers/apiServices";
import Loader from "@/components/Loader";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import notify from "@/helpers/notify";
import PageHeader from "@/components/PageHeader";
import HeaderButton from "@/components/HeaderButton";
import { convertFromRaw, EditorState } from "draft-js";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
const DocViewPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.route, id);
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: [`docView_${id}`],
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
