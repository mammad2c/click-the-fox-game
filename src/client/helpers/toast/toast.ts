import { createStandaloneToast } from "@chakra-ui/react";

const { ToastContainer, toast } = createStandaloneToast({
  defaultOptions: {
    duration: 5000,
    isClosable: true,
  },
});

export { ToastContainer, toast };
