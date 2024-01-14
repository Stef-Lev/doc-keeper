import { Box } from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { FaRegSave } from "react-icons/fa";

const HeaderButton = ({ text, type, onClick }) => {
  const attrs = {
    edit: { color: "whiteAlpha.300", icon: <BiEdit size={22} /> },
    save: { color: "green.400", icon: <FaRegSave size={22} /> },
    default: { color: "whiteAlpha.300", icon: null },
  };
  return (
    <Box
      display="flex"
      gap={attrs[type].icon ? 1 : 0}
      alignItems="center"
      border="1px solid"
      borderColor={attrs[type].color}
      bg={attrs[type].color}
      p="2px 6px"
      borderRadius="8px"
      cursor="pointer"
      onClick={onClick}
    >
      <Box>{text}</Box>
      {attrs[type].icon && <Box>{attrs[type].icon}</Box>}
    </Box>
  );
};

export default HeaderButton;
