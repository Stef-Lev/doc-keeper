import { useRouter } from "next/router";
import {
  IoAddCircle,
  IoAddCircleOutline,
  IoSettingsOutline,
  IoSettings,
  IoHeartOutline,
  IoHeart,
} from "react-icons/io5";
import { BiSolidEdit, BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { Box } from "@chakra-ui/react";
import { BiSolidHome, BiHome } from "react-icons/bi";

const useFooterContent = () => {
  const { route, asPath } = useRouter();
  const footers = {
    "/": [
      {
        icon: <BiHome size={32} />,
        iconActive: <BiSolidHome size={32} />,
        href: "/",
      },
      {
        icon: <IoAddCircleOutline size={32} />,
        iconActive: <IoAddCircle size={32} />,
        href: "/add",
      },
      {
        icon: <IoSettingsOutline size={32} />,
        iconActive: <IoSettings size={32} />,
        href: "/settings",
      },
      {
        icon: <IoHeartOutline size={32} />,
        iconActive: <IoHeart size={32} />,
        href: "/favourites",
      },
    ],
    "/document/[id]": [
      {
        icon: <BiHome size={32} />,
        iconActive: <BiSolidHome size={32} />,
        href: "/",
      },
      {
        icon: <BiEdit size={32} />,
        iconActive: <BiSolidEdit size={32} />,
        href: "/edit",
      },
      {
        icon: <MdDeleteOutline size={32} />,
        iconActive: <MdDeleteOutline size={32} />,
        href: "/delete",
      },
      {
        icon: <IoSettingsOutline size={32} />,
        iconActive: <IoSettings size={32} />,
        href: "/settings",
      },
    ],
  };

  return (
    <>
      {footers[route].map((item) => (
        <Link href={item.href} key={`page_${item.href}_icon`}>
          <Box
            display="flex"
            justifyContent="center"
            p="10px"
            borderRadius="8px"
          >
            {item.href === route ? item.iconActive : item.icon}
          </Box>
        </Link>
      ))}
    </>
  );
};

export default useFooterContent;
