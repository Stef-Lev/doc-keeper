import { useState } from "react";
import dbConnect from "../lib/dbConnect";
import { Box } from "@chakra-ui/react";
import DocItem from "../components/DocItem";
import SearchBar from "../components/SearchBar";
import Fuse from "fuse.js";

const Index = ({ docs }) => {
  console.log(docs);
  const [query, setQuery] = useState("");
  const searchOptions = {
    includeScore: true,
    keys: ["content.blocks.text"],
  };
  const fuse = new Fuse(docs, searchOptions);
  const results = fuse.search(query);
  const searchResults = query
    ? results.filter((doc) => doc.score < 0.5).map((doc) => doc.item)
    : docs;

  const handleSearchInputChange = (event) => {
    if (event) {
      setQuery(event.target.value);
    } else {
      setQuery("");
    }
  };
  console.log(query);

  return (
    <Box>
      <SearchBar onChange={handleSearchInputChange} query={query} />
      <Box>
        {searchResults.map((item, idx) => (
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
