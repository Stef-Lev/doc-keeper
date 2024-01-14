import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiSolidHome, BiHome } from "react-icons/bi";
import {
  IoAddCircle,
  IoAddCircleOutline,
  IoSettingsOutline,
  IoSettings,
  IoHeartOutline,
  IoHeart,
} from "react-icons/io5";

const Footer = () => {
  const { pathname } = useRouter();

  const footerIcons = [
    {
      icon: <BiHome size={32} />,
      iconActive: <BiSolidHome size={32} />,
      href: "/",
    },
    {
      icon: <IoAddCircleOutline size={32} />,
      iconActive: <IoAddCircle size={32} />,
      href: "/document/new",
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
  ];

  return (
    <Box
      position="fixed"
      display="flex"
      justifyContent="center"
      bottom="5"
      w="100%"
      h="56px"
      zIndex={10}
    >
      <Box
        borderRadius="16px"
        backgroundColor="basic.primary"
        color="basic.white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={{ base: "16px", sm: "20px", md: "32px" }}
        w={{ base: "92%", sm: "380px", md: "460px" }}
      >
        {footerIcons.map((item) => (
          <Link href={item.href} key={`page_${item.href}_icon`}>
            <Box
              display="flex"
              justifyContent="center"
              p="10px"
              borderRadius="8px"
            >
              {item.href === pathname ? item.iconActive : item.icon}
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Footer;
