"use client";
import { Button, Flex, Input } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { addDoc, collection } from "firebase/firestore";
import { PlusSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { db } from "../firebase/config";
import Table from "../shared/components/Table";

export default function TradesList({ trades }: { trades: Trade[] }) {
  const router = useRouter();
  console.log("trades", trades);
  const addTrade = async () => {
    const trade: Omit<Trade, "id"> = {
      instrumentName: "BTC",
      amount: 10,
      amountInUsd: 1000,
      stage: "entry",
      takeProfitPrice: 20,
      stopLossPrice: 30,
      entryPrice: 5,
    };

    try {
      const docRef = await addDoc(collection(db, "trades"), trade);
      console.log("docRef", docRef);
      console.log("Document written with ID: ", docRef.id);
      router.refresh();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Flex flex={1} flexDir="column" alignItems="center" justifyContent="center">
      <Flex
        h="60px"
        w="full"
        py="16px"
        px="24px"
        justifyContent="space-between"
      >
        <Input w="50%" />
        <Button onClick={() => router.push(`/entry`)} leftIcon={<PlusSquare />}>
          Add trade
        </Button>
      </Flex>

      <Flex w="full" justifyContent="center" flex={1} py={6}>
        {!trades?.length ? null : (
          <Table
            data={trades}
            columns={columns}
            onRowClick={({ id }) => router.push(`/entry/${id}`)}
          />
        )}
      </Flex>
    </Flex>
  );
}

const columns: ColumnDef<Trade>[] = [
  { accessorKey: "instrumentName", header: "Instrument" },
  {
    id: "amount",
    header: "Amount",
    cell: ({
      row: {
        original: { amount, amountInUsd },
      },
    }) => (
      <span>
        {amount}/${amountInUsd}
      </span>
    ),
  },
  { accessorKey: "entryPrice", header: "Entry" },
  { accessorKey: "takeProfitPrice", header: "TP" },
  { accessorKey: "stopLossPrice", header: "SL" },
];
