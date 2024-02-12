import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { useLongPress } from "use-long-press";
import { getTitle } from "@/helpers/contentGetter";
import { useAddDocToFav } from "@/helpers/apiMutations";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

function DocItem({ item }) {
  const { addToFavs } = useAddDocToFav();
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState(item.isFavourite);

  const toggleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToFavs({
      id: item._id,
      body: { ...item, isFavourite: !item.isFavourite },
    });
    setIsFavourite((prevState) => !prevState);
  };

  const bind = useLongPress(
    (e) => {
      toggleFavourite(e);
    },
    { threshold: 1000 }
  );

  const onItemClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/document/${item._id}`);
  };

  return (
    <Box
      bg="#2f3143"
      borderRadius="8px"
      position="relative"
      p={{ base: "16px", md: "18px" }}
      mb={{ base: "10px", md: "14px" }}
      _hover={{ cursor: "pointer" }}
      onClick={onItemClick}
      {...bind()}
    >
      <Heading as="h3" fontSize={{ base: "16px", md: "20px" }} mb="8px">
        {getTitle(item)}
      </Heading>
      <Text fontSize={{ base: "12px", md: "14px" }} fontStyle="italic">
        {format(new Date(item.createdAt), "ccc,  dd/MM/yyyy")}
      </Text>
      <Box position="absolute" right="8px" top="8px" onClick={toggleFavourite}>
        {isFavourite ? (
          <IoHeart size={22} bg="red.300" />
        ) : (
          <IoHeartOutline size={22} />
        )}
      </Box>
    </Box>
  );
}

export default DocItem;
