"use client";
import Graph from "@/components/Graph.jsx";
import History from "@/components/History";
import Transaction from "@/components/Transaction";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { useMemo } from "react";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { data } = useQuery({
    queryKey: "allWalletsData",
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/wallet");
      return res.json();
    },
    initialData: [],
  });

  const calculatedData = useMemo(() => {
    const groupData = _.groupBy(data?.data, "type");
    const sumByType = _.mapValues(groupData, (value) => ({
      color: value[0].color,
      total: _.sumBy(value, "amount"),
    }));
    const totalTransaction = _.sumBy(_.values(sumByType), "total");
    const typesWiseData = _.mapValues(sumByType, (value) => ({
      percentage: Math.round((value.total / totalTransaction) * 100),
      color: value.color,
    }));
    return { totalTransaction, typesWiseData };
  }, [data]);

  return (
    <main className="container mx-auto bg-gray-600 shadow-md">
      <header>
        <p className="text-2xl font-bold text-center py-3 text-[#aebac1]">
          Welcome to the Finance Tracking App
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 px-2 md:px-8 min-h-screen bg-gray-50">
        <section className="col-span-1 lg:col-span-6">
          {/** Chart */}
          <div className="bg-[#EDF7FC] relative shadow-md rounded-md  w-full md:h-80 h-96 my-2 flex-r-center p-2">
            <div className="relative">
              <Graph transactionData={calculatedData?.typesWiseData} />
              <div className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4">
                <p className="text-center text-gray-400 font-bold tracking-wide">
                  Total
                </p>
                <p className="font-bold text-2xl text-center text-teal-500 drop-shadow-sm">
                  ₹{calculatedData?.totalTransaction}
                </p>
              </div>
            </div>

            <div className="absolute md:top-10 md:right-7 left-3 bottom-4">
              <div className="flex  md:flex-col items-start justify-start gap-3">
                {Object.entries(calculatedData?.typesWiseData).map(
                  ([key, value], i) => (
                    <div
                      key={i}
                      className="flex justify-start gap-x-2 items-center w-full "
                    >
                      <span
                        className="w-3 h-3 shadow-sm rounded-sm"
                        style={{
                          backgroundColor: value.color ?? "gray",
                        }}
                      ></span>
                      <p className="text-gray-500 text-sm">{key}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          {/** Latest Transaction Status */}
          <div className="flex flex-col items-center py-2 pr-2 gap-y-3 h-60  overflow-auto scrollbar ">
            {Object.entries(calculatedData?.typesWiseData).map(
              ([key, value], i) => (
                <div
                  key={i}
                  className={`flex text-gray-500 justify-between w-2/3 items-center bg-gray-50 shadow-md  py-2 px-4  border-l-[10px] border-gray-300 rounded-md`}
                  style={{
                    borderLeftColor: value.color ?? "gray",
                  }}
                >
                  <p className="font-medium">{key}</p>
                  <p className="font-semibold">{value.percentage}%</p>
                </div>
              )
            )}
          </div>
        </section>

        <section className="col-span-1 lg:col-span-4 flex flex-col justify-start gap-3 items-start w-full h-full ">
          <Transaction />
          <History />
        </section>
      </div>

      <Toaster
        toastOptions={{
          className: "text-sm",
        }}
      />
    </main>
  );
}
