import {
  Button as UIButton,
  ButtonProps as UIButtonProps,
} from "@chakra-ui/react";
import { NavLink, To } from "react-router-dom";

interface ButtonProps extends UIButtonProps {
  to?: To;
}

const Button = ({ to, ...restProps }: ButtonProps) => {
  if (to) {
    return (
      <UIButton backgroundColor="yellow" as={NavLink} {...restProps} to={to} />
    );
  }

  return <UIButton backgroundColor="yellow" {...restProps} />;
};

export { Button };
