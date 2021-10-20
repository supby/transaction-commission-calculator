import { Injectable } from '@nestjs/common';
import { subMonths } from 'date-fns';
import { BaseTransation } from 'src/transaction-commission/types/baseTransaction';
import { TransactionRepositoryService } from 'src/transaction-repository/transaction-repository.service';
import { Rule } from './types/rule';

@Injectable()
export class RulesRepositoryService {
    constructor(
        private readonly transactionRepositoryService: TransactionRepositoryService
    ) {}   

    async getRules(filter: (rule: Rule) => Promise<boolean>): Promise<Rule[]> {
        // TODO: testing repository in memory. In real word those rules might be loaded from external module or formalized from DB and so on.
        const allRules = [
            new Rule({ transactionRepositoryService: this.transactionRepositoryService }, async () => true, async (tr) => Math.max(0.05, tr.amount * 0.005)),
            new Rule({ transactionRepositoryService: this.transactionRepositoryService }, async (tr) => tr.clientId === 42, async () => 0.05),
            new Rule(
                { transactionRepositoryService: this.transactionRepositoryService },
                async (tr, ctx) => {
                    const monthAgoDate = subMonths(tr.date, 1)
                    const usersTransaction = await ctx.transactionRepositoryService
                        .getTransactions(t => t.clientId === tr.clientId && t.date >= monthAgoDate && t.date <= tr.date);

                    return usersTransaction.reduce((acc, t) => acc += t.amount, 0) >= 1000;
                }, 
                async () => 0.03)
        ];

        const filteredRules: Rule[] = []
        for (const rule of allRules) {            
            if (await filter(rule)) filteredRules.push(rule);
        }

        return filteredRules;
    }
}
