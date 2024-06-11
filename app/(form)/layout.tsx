import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Flex flex={1} w="full" py="32px" justifyContent="center">
      <Flex w="65%" flexDir="column" border="1px solid blue" gap="12px" p={3}>
        {children}
      </Flex>
    </Flex>
  );
}
