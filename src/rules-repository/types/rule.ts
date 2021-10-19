import { BaseTransation } from "src/transaction-commission/types/baseTransaction";
import { RuleContext } from "./ruleContext";

export class Rule {
    constructor(
        private readonly ruleContext: RuleContext,
        private readonly predicate: (transaction: BaseTransation, context: RuleContext) => boolean,
        private readonly getCommission: (transaction: BaseTransation, context: RuleContext) => number
        ) {}
        
    IsApplicable(transaction: BaseTransation) {
        //console.log(JSON.stringify(transaction))
        return this.predicate(transaction, this.ruleContext);
    }

    GetCommission(transaction: BaseTransation) {
        return this.getCommission(transaction, this.ruleContext);
    }
}

