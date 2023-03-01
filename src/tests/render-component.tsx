import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      <ChakraProvider>{children}</ChakraProvider>
    </BrowserRouter>
  );
};

const renderComponent = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { renderComponent, userEvent };
