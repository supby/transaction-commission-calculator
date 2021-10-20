import { TransactionRepositoryService } from "src/transaction-repository/transaction-repository.service";

// Context is being injected for every rule filter and commission calculator.
// It allows to call third-party services for rule evaluation.
export interface RuleContext {
    readonly transactionRepositoryService: TransactionRepositoryService;
}