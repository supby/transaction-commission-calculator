import { Injectable } from '@nestjs/common';
import { Rule } from './types/rule';

// TODO: rules repository for testing purposes
const ruleStorage: Rule[] = [
    {
        predicate: (tr) => true,
        getCommission: (tr) => Math.max(0.05, tr.amount * 0.005)
    },
    {
        predicate: (tr) => tr.client_id === 42,
        getCommission: (tr) => 0.05
    },
]

@Injectable()
export class RulesRepositoryService {
    addRule(rule: Rule) {
        ruleStorage.push(rule);
    }

    getRules(): Rule[] {
        return ruleStorage;
    }
}
