import { Flex, Input as ChakraInput, InputProps, Text } from "@chakra-ui/react";
import { ComponentProps, forwardRef, Ref } from "react";

type CustomInputProps = InputProps & { label: string; errorMessage?: string };

function InternalInput(
  { label, errorMessage, ...rest }: CustomInputProps,
  ref: Ref<ComponentProps<typeof ChakraInput>>,
) {
  return (
    <Flex
      w="full"
      flexDir="column"
      gap={1}
      alignItems="start"
      justifyContent=""
    >
      <Text
        fontSize="14px"
        fontWeight={500}
        color={errorMessage ? "red" : "blue.500"}
      >
        {label}:
      </Text>
      <ChakraInput
        borderWidth="1px solid"
        borderColor={errorMessage ? "red" : "skyblue"}
        boxShadow="none"
        _focus={{
          borderColor: errorMessage ? "red" : "blue",
          borderWidth: "2px",
          boxShadow: "none",
        }}
        _focusVisible={{
          borderColor: errorMessage ? "red" : "blue",
          borderWidth: "2px",
          boxShadow: "none",
        }}
        h="36px"
        ref={ref}
        {...rest}
      />
      {errorMessage ? (
        <Text fontSize="12px" fontWeight={500} color="red">
          {errorMessage}
        </Text>
      ) : null}
    </Flex>
  );
}

const Input = forwardRef(
  (props: CustomInputProps, ref: Ref<ComponentProps<typeof ChakraInput>>) =>
    InternalInput(props, ref),
);

Input.displayName = "Input";
export default Input;
