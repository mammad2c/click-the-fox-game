import { Link as UILink, LinkProps as UILinkProps } from "@chakra-ui/react";
import { NavLink, To } from "react-router-dom";

interface LinkProps extends UILinkProps {
  to: To;
}

const Link = (props: LinkProps) => {
  return <UILink as={NavLink} {...props} _activeLink={{ color: "blue" }} />;
};

export default Link;
