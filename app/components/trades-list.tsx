"use client";
import { Button, Flex, Input } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { PlusSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import Table from "../shared/components/Table";

export default function TradesList({ trades }: { trades: Trade[] }) {
  const router = useRouter();

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
    accessorKey: "amountInUsd",
    header: "Amount",
  },
  { accessorKey: "entryPrice", header: "Entry" },
  { accessorKey: "takeProfitPrice", header: "TP" },
  { accessorKey: "stopLossPrice", header: "SL" },
];
