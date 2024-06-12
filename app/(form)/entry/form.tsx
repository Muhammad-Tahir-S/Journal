"use client";
import { Button, Flex, useToast, VStack } from "@chakra-ui/react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { revalidatePathAction } from "@/app/actions/revalidatePath";
import Input from "@/app/components/shared/input";
import { db } from "@/app/firebase/config";

type TradeInput = Omit<Trade, "id"> & { id?: string };

export default function EntryForm({ trade }: { trade?: Trade }) {
  const router = useRouter();
  const toast = useToast();

  const {
    watch,
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<Trade>({ defaultValues: trade, mode: "all" });

  const entryValue = watch("entryPrice");
  const tpValue = watch("takeProfitPrice");

  const isBuy = entryValue && tpValue && entryValue < tpValue;

  async function onSuccess(action: "added" | "updated") {
    await revalidatePathAction("/");
    router.push("/");
    toast({
      title: `Trade ${action}.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  async function addTrade(trade: TradeInput) {
    try {
      const docRef = await addDoc(collection(db, "trades"), trade);
      console.log("docRef", docRef);
      console.log("Document written with ID: ", docRef.id);
      onSuccess("added");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function updateTrade(trade: TradeInput) {
    try {
      await updateDoc(doc(db, "trades", trade.id!), trade);
      onSuccess("updated");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function onSubmit(values: Trade) {
    if (!values?.id) {
      addTrade({ ...values, stage: "in-trade" });
    } else {
      updateTrade({ ...values, stage: "in-trade" });
    }
  }

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      gap="16px"
      py={4}
      px={3}
      flex={1}
      flexDir="column"
    >
      <VStack flex={1}>
        <Input
          label="Instrument"
          {...register("instrumentName", {
            required: "Instrument name is required",
          })}
          errorMessage={errors?.instrumentName?.message}
        />
        <Input
          label="Amount in USD"
          type="number"
          {...register("amountInUsd", { valueAsNumber: true })}
        />
        <Input
          label="Entry"
          type="number"
          {...register("entryPrice", {
            required: "Entry price is required",
            valueAsNumber: true,
          })}
          errorMessage={errors?.entryPrice?.message}
        />
        <Input
          label="TP"
          type="number"
          {...register("takeProfitPrice", {
            required: "TP is required",
            valueAsNumber: true,
          })}
          errorMessage={errors?.takeProfitPrice?.message}
        />
        {tpValue && entryValue ? (
          <Input
            label="SL"
            type="number"
            {...register("stopLossPrice", {
              required: "TP is required",
              valueAsNumber: true,
            })}
            errorMessage={errors?.stopLossPrice?.message}
          />
        ) : null}
      </VStack>

      <Button
        type="submit"
        colorScheme={isBuy ? "blue" : "red"}
        isDisabled={!isDirty || !isValid}
      >
        {isBuy ? "Buy" : "Sell"}
      </Button>
    </Flex>
  );
}
