import { CheckCircle, XCircle, ReceiptText } from "lucide-react";
import { ReactNode } from "react";
export interface Transaction {
  _id: string;
  email: string;
  amount: number;
  reference: string;
  status: "success" | "failed"; // or string if it's open-ended
  paidAt: string;
  createdAt: string;
}

export default function Receipt({ transaction }: { transaction: Transaction }) {
  const { email, amount, _id, reference, status, paidAt, createdAt } =
    transaction;

  const isSuccess = status === "success";

  return (
    <div className="max-w-xl mx-auto p-6 w-full bg-white rounded-t-xl border-t-2 border-x-2 border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <ReceiptText className="text-Blueviolet" size={28} />
        <h2 className="text-xl font-semibold text-gray-800">Payment Receipt</h2>
      </div>

      <div className="space-y-4">
        <ReceiptRow label="Transaction ID" value={_id} />
        <ReceiptRow label="Reference" value={reference} />
        <ReceiptRow label="Email" value={email} />
        <ReceiptRow
          label="Amount"
          value={`₦${(amount / 100).toLocaleString()}`}
        />
        <ReceiptRow
          label="Status"
          value={
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium ${
                isSuccess
                  ? "bg-kellygreen/10 text-kellygreen "
                  : "bg-red/10 text-red"
              }`}
            >
              {isSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Success
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-1" />
                  Failed
                </>
              )}
            </span>
          }
        />
        <ReceiptRow label="Paid At" value={new Date(paidAt).toLocaleString()} />
        <ReceiptRow
          label="Created At"
          value={new Date(createdAt).toLocaleString()}
        />
      </div>
    </div>
  );
}

function ReceiptRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between text-sm text-gray-600 border-black/20 border-b py-2">
      <span className="font-medium">{label}</span>
      <span className="text-right break-all max-w-[60%]">{value}</span>
    </div>
  );
}
