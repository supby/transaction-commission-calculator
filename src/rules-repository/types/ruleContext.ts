import { TransactionRepositoryService } from "src/transaction-repository/transaction-repository.service";

export interface RuleContext {
    readonly transactionRepositoryService: TransactionRepositoryService;
}