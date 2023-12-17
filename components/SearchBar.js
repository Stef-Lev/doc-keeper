import {
  Input,
  InputLeftElement,
  InputGroup,
  Box,
  InputRightElement,
} from "@chakra-ui/react";
import { IoSearch, IoClose } from "react-icons/io5";

const SearchBar = () => {
  return (
    <Box my="20px">
      <InputGroup>
        <InputLeftElement children={<IoSearch size={20} />} />
        <Input type="text" placeholder="Search a document" />
        <InputRightElement children={<IoClose size={20} />} />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
