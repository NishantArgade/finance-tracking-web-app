"use client";
import { queryClient } from "@/providers/ReactQueryProvider";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const DeleteTransactionBtn = ({ transactionId }) => {
  const handleDeleteTransaction = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/wallet?id=${id}`,
        {
          method: "DELETE",
        }
      );
      return await response.json();
    } catch (error) {
      return Promise.reject();
    }
  };

  const mutation = useMutation({
    mutationKey: ["deleteTransaction"],
    mutationFn: handleDeleteTransaction,
    onSuccess: () => {
      toast.success("Transaction deleted successfully");
      queryClient.invalidateQueries("getAllTransactionHistory");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handelDelete = () => {
    mutation.mutate(transactionId);
  };
  return (
    <button className="w-auto" onClick={handelDelete}>
      <MdDelete className="text-gray-500 hover:text-gray-600 cursor-pointer" />
    </button>
  );
};

export default DeleteTransactionBtn;
