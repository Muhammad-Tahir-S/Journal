"use client";
import { Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
export default function EntryForm({ trade }: { trade?: Trade }) {
  const { watch, register } = useForm<Trade>({ defaultValues: trade });
  return (
    <>
      <Input {...register("instrumentName")} />
    </>
  );
}
