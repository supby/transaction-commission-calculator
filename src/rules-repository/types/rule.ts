import { BaseTransation } from "src/transaction-commission/types/baseTransaction";

export type Rule = {
    predicate: (transaction: BaseTransation) => boolean;
    getCommission: (transaction: BaseTransation) => number;
}