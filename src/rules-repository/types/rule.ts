import { Transaction } from "src/transaction-commission/types/transaction";

// export class Rule {
    
//     constructor(private readonly predicate: (transaction: Transaction) => boolean) {}

//     getCommission(transaction: Transaction): number {
//         return Math.max(0.05, transaction.amount * 0.005);
//     }
    
// }

export type Rule = {
    predicate: (transaction: Transaction) => boolean;
    getCommission: (transaction: Transaction) => number;
}