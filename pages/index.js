import { useState } from "react";
import Loader from "@/components/Loader";
import { Box } from "@chakra-ui/react";
import DocItem from "@/components/DocItem";
import SearchBar from "@/components/SearchBar";
import Fuse from "fuse.js";
import { useQuery } from "@tanstack/react-query";
import notify from "@/helpers/notify";
import { getAll } from "@/helpers/apiServices";

const Index = () => {
  const [query, setQuery] = useState("");
  const { isFetching, error, data, isLoading } = useQuery({
    queryKey: ["allDocs"],
    queryFn: () =>
      getAll("/api/docs")
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        }),
    retry: false,
  });

  if (error) {
    notify("Something went wrong", "error");
    return;
  }

  if (isLoading || isFetching) {
    return <Loader fullScreen />;
  }

  const searchOptions = {
    includeScore: true,
    keys: ["content.blocks.text"],
  };
  const fuse = new Fuse(data, searchOptions);
  const results = fuse.search(query);
  const searchResults = query
    ? results.filter((doc) => doc.score < 0.5).map((doc) => doc.item)
    : data;

  const handleSearchInputChange = (event) => {
    if (event) {
      setQuery(event.target.value);
    } else {
      setQuery("");
    }
  };

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

export default Index;
