"use client";

import { transactionTypeOptions } from "@/Utils";
import { queryClient } from "@/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";

const Transaction = () => {
  const [inputs, setInputs] = useState({
    name: "",
    type: null,
    amount: "",
  });
  const addTransaction = async () => {
    try {
      return await fetch("/api/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inputs?.name,
          type: inputs?.type?.value,
          amount: inputs?.amount,
          color: inputs?.type?.color,
        }),
      });
    } catch (error) {
      return Promise.reject();
    }
  };

  const mutation = useMutation({
    mutationKey: ["addTransaction"],
    mutationFn: addTransaction,
    onSuccess: () => {
      toast.success("Transaction added successfully");
      setInputs({ name: "", type: null, amount: "" });
      queryClient.invalidateQueries("getAllTransactionHistory");
    },
    onError: () => {
      toast.error("Failed to add transaction");
    },
  });

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    const { name, type, amount } = inputs;
    if (name && type && type?.value && amount) {
      mutation.mutate();
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div className="w-full">
      <p className="text-center text-lg font-bold tracking-wide text-gray-500 my-3">
        Transaction
      </p>
      <form
        onSubmit={handleTransactionSubmit}
        className="p-2 w-full flex flex-col gap-3"
      >
        <input
          className="shadow-md p-2 bg-white text-sm text-gray-600 rounded-[0.250rem] outline-blue-500 border-[1.5px] border-gray-300"
          type="text"
          placeholder="Sallary, House Rent, SIP"
          value={inputs.name}
          onChange={(e) =>
            setInputs((state) => ({ ...state, name: e.target.value }))
          }
        />

        <Select
          className="shadow-md  bg-white text-sm text-gray-600"
          value={inputs.type}
          onChange={(e) => setInputs((state) => ({ ...state, type: e }))}
          options={transactionTypeOptions}
          placeholder="Select type of transaction"
          styles={{
            input: (provided) => ({
              ...provided,
              color: "gray",
              outline: "red",
              padding: "0.3rem 0",
            }),
            container: (provided) => ({
              ...provided,
              borderRadius: "0.5rem",
              border: "none",
            }),
            valueContainer: (provided) => ({
              ...provided,
              color: "gray",
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "#A8AEB8",
            }),
          }}
        />
        <input
          className="shadow-md p-2 bg-white text-sm text-gray-600 rounded-[0.250rem]  border-[1.5px] border-gray-300 outline-blue-500"
          type="number"
          placeholder="Amount"
          value={inputs.amount}
          onChange={(e) =>
            setInputs((state) => ({ ...state, amount: e.target.value }))
          }
        />
        <button
          type="submit"
          className="text-white font-medium bg-blue-500 hover:bg-blue-600 rounded-md shadow-md p-2 mt-2"
        >
          Make Transaction
        </button>
      </form>
    </div>
  );
};

export default Transaction;
