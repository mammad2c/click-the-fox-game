import { Button as UIButton } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { defaultButtonPropsValue } from "./config";
import { ButtonProps } from "./types";

const Button = ({ to, ...restProps }: ButtonProps) => {
  const finalProps = { ...defaultButtonPropsValue, ...restProps };

  if (to) {
    return <UIButton as={NavLink} {...finalProps} to={to} />;
  }

  return <UIButton {...finalProps} />;
};

export { Button };
