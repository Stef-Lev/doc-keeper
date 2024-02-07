import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import { Box } from "@chakra-ui/react";
import DocItem from "@/components/DocItem";
import SearchBar from "@/components/SearchBar";
import Fuse from "fuse.js";
import notify from "@/helpers/notify";
import { useGetAllDocs } from "@/helpers/apiQueries";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const { isFetching, error, data, isLoading } = useGetAllDocs();
  const { data: session, status } = useSession();

  console.log({ session });

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
  console.log(data);

  return (
    <Box>
      <SearchBar onChange={handleSearchInputChange} query={query} />
      <Box>
        {searchResults.map((item, idx) => (
          <DocItem key={idx + 1} item={item} />
        ))}
      </Box>
      <button onClick={() => signOut()}>LOGOUT</button>
    </Box>
  );
};

export default HomePage;
