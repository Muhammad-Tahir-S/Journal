import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

import BackButton from "../components/back-button";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Flex flex={1} flexDir="column" w="full" p="32px" alignItems="center">
      <BackButton alignSelf="flex-start" />

      <Flex
        flex={1}
        w="65%"
        flexDir="column"
        border="1px solid blue"
        gap="12px"
        p={3}
      >
        {children}
      </Flex>
    </Flex>
  );
}
