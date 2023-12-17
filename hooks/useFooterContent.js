import {
  IoHomeOutline,
  IoAddCircleOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { Box } from "@chakra-ui/react";

const useFooterContent = (route) => {
  const footers = {
    "/": [
      { icon: <IoHomeOutline size={32} /> },
      { icon: <IoAddCircleOutline size={32} /> },
      { icon: <IoSettingsOutline size={32} /> },
    ],
    "/document/[id]": [{ icon: <IoHomeOutline size={32} /> }],
  };

  return (
    <>
      {footers[route].map((item) => (
        <Box display="flex" justifyContent="center" p="10px" borderRadius="8px">
          {item.icon}
        </Box>
      ))}
    </>
  );
};

export default useFooterContent;
