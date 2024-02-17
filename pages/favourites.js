import { useSession } from "next-auth/react";
import { Box, Heading } from "@chakra-ui/react";
import DocItem from "@/components/DocItem";
import notify from "@/helpers/notify";
import { useGetAllDocs } from "@/helpers/apiQueries";
import LoaderOverlay from "@/components/LoaderOverlay";

const Favourites = () => {
  const { data: session } = useSession();

  const { isFetching, error, data, isLoading } = useGetAllDocs(
    session?.user?.id
  );

  if (error) {
    notify("Something went wrong", "error");
    return;
  }

  if (isLoading || isFetching) {
    return <LoaderOverlay />;
  }

  const favorites = data.filter((item) => item.isFavourite);

  return (
    <Box>
      <Heading textAlign="center" py="10px">
        Favourite Docs
      </Heading>
      <Box>
        {favorites.map((item, idx) => (
          <DocItem key={idx + 1} item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default Favourites;
