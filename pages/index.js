import Link from "next/link";
import dbConnect from "../lib/dbConnect";
import { Box } from "@chakra-ui/react";
import DocItem from "../components/DocItem";
import SearchBar from "../components/SearchBar";

const Index = ({ docs }) => {
  console.log(docs);
  return (
    <Box>
      <SearchBar />
      <Box>
        {docs.map((item, idx) => (
          <DocItem key={idx + 1} item={item} />
        ))}
      </Box>
    </Box>
  );
};

export async function getServerSideProps() {
  await dbConnect();
  const data = await import("../database.json");
  const json = JSON.parse(JSON.stringify(data));
  const docs = json.documents.map((item) => {
    return {
      title: item.content.blocks.filter((item) => item.type === "header-one")[0]
        .text,
      id: item.id,
      date: item.createdAt,
    };
  });
  console.log(docs);

  return { props: { docs } };
}

export default Index;
