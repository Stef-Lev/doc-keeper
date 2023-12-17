import React from "react";
import { useRouter } from "next/router";
import { Box, Heading, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { useLongPress } from "use-long-press";

function DocItem({ item }) {
  const router = useRouter();
  const bind = useLongPress(
    () => {
      alert("Long pressed!");
    },
    { threshold: 1000 }
  );
  return (
    <Box
      bg="#2f3143"
      borderRadius="8px"
      p={{ base: "16px", md: "18px" }}
      mb={{ base: "10px", md: "14px" }}
      _hover={{ cursor: "pointer" }}
      onClick={() => router.push(`/document/${item.id}`)}
      {...bind()}
    >
      <Heading as="h3" fontSize={{ base: "16px", md: "20px" }} mb="8px">
        {item.title}
      </Heading>
      <Text fontSize={{ base: "12px", md: "14px" }} fontStyle="italic">
        {format(new Date(item.date), "PPP")}
      </Text>
    </Box>
  );
}

export default DocItem;
