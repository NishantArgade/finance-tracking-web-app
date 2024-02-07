"use client";

import { useQuery } from "@tanstack/react-query";
import DeleteTransactionBtn from "./DeleteTransactionBtn";

const getHistory = async () => {
  try {
    const response = await fetch(`api/wallet`);
    const obj = await response.json();
    return obj.data;
  } catch (e) {
    return [];
  }
};

const History = () => {
  const { data: history } = useQuery({
    queryKey: ["getAllTransactionHistory"],
    queryFn: getHistory,
    initialData: [],
  });
  return (
    <>
      {history.length > 0 ? (
        <div className="p-2 w-full h-full ">
          <div className="text-center text-lg  my-3 font-bold tracking-wide text-gray-500 ">
            History
          </div>
          <div className="flex flex-col py-2 pr-2 gap-y-3 h-60  overflow-auto scrollbar text-gray-700">
            {history.map((transaction, i) => (
              <div
                key={i}
                className="bg-gray-100 shadow-md  flex p-2 border-gray-200 border-[0.8px] border-r-[10px]  rounded-md"
                style={{
                  borderRightColor: transaction.color ?? "gray",
                }}
              >
                <DeleteTransactionBtn transactionId={transaction._id} />
                <p className="flex justify-center items-center w-full ">
                  <span className="text-gray-500 font-medium">
                    {transaction.name}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-lg w-full text-center my-3 font-bold tracking-wide text-gray-400">
          No history Available
        </div>
      )}
    </>
  );
};

export default History;
