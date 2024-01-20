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
import { FaRegSave } from "react-icons/fa";

const useFooterContent = () => {
  const {
    pathname,
    query: { id },
  } = useRouter();

  const footerIcons = {
    home: {
      icon: <BiHome size={32} />,
      iconActive: <BiSolidHome size={32} />,
      href: "/",
    },
    add: {
      icon: <IoAddCircleOutline size={32} />,
      iconActive: <IoAddCircle size={32} />,
      href: "/document/new",
    },
    settings: {
      icon: <IoSettingsOutline size={32} />,
      iconActive: <IoSettings size={32} />,
      href: "/settings",
    },
    favourites: {
      icon: <IoHeartOutline size={32} />,
      iconActive: <IoHeart size={32} />,
      href: "/favourites",
    },
    edit: {
      icon: <BiEdit size={32} />,
      iconActive: <BiSolidEdit size={32} />,
      href: `/document/${id}/edit`,
    },
    delete: {
      icon: <MdDeleteOutline size={32} />,
      iconActive: <MdDeleteOutline size={32} />,
      href: "/delete",
    },
    save: {
      icon: <FaRegSave size={32} />,
      iconActive: <FaRegSave size={32} />,
      href: "/edit",
    },
  };
  const footersPerPage = {
    default: ["home", "add", "settings", "favourites"],
    "/": ["home", "add", "settings", "favourites"],
    "/document/[id]": ["home", "edit", "delete", "settings"],
    "/settings": ["home", "edit", "delete", "settings"],
    "/document/[id]/edit": ["home", "save", "delete", "settings"],
  };

  return (
    <>
      {footersPerPage[pathname]
        ? footersPerPage[pathname].map((item) => (
            <Link
              href={footerIcons[item].href}
              key={`page_${footerIcons[item].href}_icon`}
            >
              <Box
                display="flex"
                justifyContent="center"
                p="10px"
                borderRadius="8px"
              >
                {footerIcons[item].href === pathname
                  ? footerIcons[item].iconActive
                  : footerIcons[item].icon}
              </Box>
            </Link>
          ))
        : footersPerPage["default"]}
    </>
  );
};

export default useFooterContent;
