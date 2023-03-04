import { ButtonProps as UIButtonProps } from "@chakra-ui/react";
import { To } from "react-router-dom";

export interface ButtonProps extends UIButtonProps {
  to?: To;
}
