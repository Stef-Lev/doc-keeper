import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { getTitle } from "@/helpers/contentGetter";
import { updateOne } from "@/helpers/apiServices";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

function DocItem({ item, withFav = false }) {
  const router = useRouter();
  const [isFavourite, setIsFavourite] = useState(item.isFavourite);

  const toggleFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateOne(`/api/docs/${item._id}`, {
      ...item,
      isFavourite: !item.isFavourite,
    });
    setIsFavourite((prevState) => !prevState);
  };

  const onItemClick = () => {
    const url = withFav
      ? `/document/${item._id}`
      : `/document/${item._id}?favourite=true`;
    router.push(url);
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
    >
      <Heading as="h3" fontSize={{ base: "16px", md: "20px" }} mb="8px">
        {getTitle(item)}
      </Heading>
      <Text fontSize={{ base: "12px", md: "14px" }} fontStyle="italic">
        {format(new Date(item.createdAt), "ccc,  dd/MM/yyyy")}
      </Text>
      {withFav && (
        <Box
          position="absolute"
          right="8px"
          top="8px"
          onClick={toggleFavourite}
          id="fav-btn"
        >
          {isFavourite ? (
            <IoHeart size={22} bg="red.300" />
          ) : (
            <IoHeartOutline size={22} />
          )}
        </Box>
      )}
    </Box>
  );
}

export default DocItem;
