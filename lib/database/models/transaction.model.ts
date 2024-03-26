import { Schema, model, models } from "mongoose";

// Define the Mongoose schema for transactions
const TransactionSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    stripeId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    plan: { type: String },
    credits: { type: Number },
    buyer: { type: Schema.Types.ObjectId, ref: "User" },
});

// Check if the Transaction model already exists in Mongoose models, otherwise create it
const Transaction = models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;