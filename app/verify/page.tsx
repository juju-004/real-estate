"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import { useSession } from "@/context/SessionContext";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import Receipt, { Transaction } from "../components/Receipt";
import { filterError } from "@/lib/helpers";

export default function VerifyPage() {
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const session = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      if (!session || !searchParams) {
        router.back();
        return;
      }
      const reference = searchParams.get("trxref");

      try {
        const { data } = await axios.post("/api/payments/verify", {
          email: session?.email,
          ref: reference,
        });

        console.log(data);

        setTransaction(data);
      } catch (err) {
        toast(filterError(err));
        router.push("/");
      }
    };

    !transaction && verifyPayment();
  }, [transaction]);

  return (
    <div className="flex flex-col px-2 items-center justify-center min-h-[80vh] bg-gray-50">
      {!transaction ? (
        <div className="flex flex-col items-center">
          <Loader className="w-12 h-12 animate-spin text-Blueviolet" />
          <p className="mt-4 text-gray-700 lg:text-xl">
            Verifying your payment...
          </p>
        </div>
      ) : (
        <Receipt transaction={transaction} />
      )}
    </div>
  );
}
