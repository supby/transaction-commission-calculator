import { BaseTransaction } from "src/transaction-commission/types/baseTransaction";
import { RuleContext } from "./ruleContext";

export class Rule {
    constructor(
        private readonly ruleContext: RuleContext,
        // filter if rule is applicable for transaction. It is async as it is possible call async services inside
        private readonly predicate: (transaction: BaseTransaction, context: RuleContext) => Promise<boolean>,
        // Get commission for transaction. Might be async
        private readonly getCommission: (transaction: BaseTransaction, context: RuleContext) => Promise<number>
        ) {}
        
    IsApplicable(transaction: BaseTransaction): Promise<boolean> {
        return this.predicate(transaction, this.ruleContext);
    }

    GetCommission(transaction: BaseTransaction): Promise<number> {
        return this.getCommission(transaction, this.ruleContext);
    }
}

