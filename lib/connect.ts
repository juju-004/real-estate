import { MongoClient, Collection } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const clientPromise = client.connect();

export interface UserDoc {
  _id: string;
  email: string;
  hashed_password?: string;
}

export interface SessionDoc {
  _id: string;
  user_id: string;
  expires_at: Date;
}

export interface TransactionDoc {
  _id: string;
  amount: number;
  email: string;
  reference: string;
  status: "success" | "failed";
  paidAt?: Date;
  createdAt?: Date;
}

export const getCollections = async (): Promise<{
  users: Collection<UserDoc>;
  sessions: Collection<SessionDoc>;
  transactions: Collection<TransactionDoc>;
}> => {
  const db = (await clientPromise).db();
  return {
    users: db.collection<UserDoc>("users"),
    sessions: db.collection<SessionDoc>("sessions"),
    transactions: db.collection<TransactionDoc>("transactions"),
  };
};
