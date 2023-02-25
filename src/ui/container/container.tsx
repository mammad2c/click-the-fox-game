import {
  Container as UIContainer,
  ContainerProps as UIContainerProps,
} from "@chakra-ui/react";

const Container = (props: UIContainerProps) => {
  return <UIContainer maxW="none" {...props} />;
};

export { Container };
