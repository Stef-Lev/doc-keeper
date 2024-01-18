import { Box } from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { FaRegSave } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const HeaderButton = ({ text, type, onClick }) => {
  const attrs = {
    edit: { color: "rgba(255,255,255,0.2)", icon: <BiEdit size={22} /> },
    save: { color: "rgba(71, 230, 86, 0.3)", icon: <FaRegSave size={22} /> },
    delete: {
      color: "rgba(230,70,70,0.3)",
      icon: <MdDeleteOutline size={22} />,
    },
    default: { color: "white", icon: null },
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
