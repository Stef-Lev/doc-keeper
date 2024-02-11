import {
  Input,
  InputLeftElement,
  InputGroup,
  Box,
  InputRightElement,
} from "@chakra-ui/react";
import { IoSearch, IoClose } from "react-icons/io5";

const SearchBar = ({ onChange, query }) => {
  return (
    <Box my="20px">
      <InputGroup>
        <InputLeftElement children={<IoSearch size={20} />} />
        <Input
          value={query}
          type="text"
          placeholder="Search a document"
          onChange={onChange}
        />
        <InputRightElement
          cursor="pointer"
          children={<IoClose size={20} />}
          onClick={() => onChange()}
        />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
