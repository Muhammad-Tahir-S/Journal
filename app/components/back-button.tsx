"use client";
import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { ArrowBigLeftDash } from "lucide-react";
import { useRouter } from "next/navigation";

function BackButton(props: Omit<ButtonProps, "onClick" | "role">) {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} role="group" {...props}>
      <Icon
        as={ArrowBigLeftDash}
        boxSize="24px"
        _groupHover={{ stroke: "blue" }}
      />
    </Button>
  );
}

export default BackButton;
