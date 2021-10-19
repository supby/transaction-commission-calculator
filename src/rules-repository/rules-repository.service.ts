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

    getRules(): Rule[] {
        // TODO: testing repository in memory. In real word those rules might be loaded from external module or formilized from DB and so on.
        return [
            new Rule({ transactionRepositoryService: this.transactionRepositoryService }, (tr) => true, (tr) => Math.max(0.05, tr.amount * 0.005)),
            new Rule({ transactionRepositoryService: this.transactionRepositoryService }, (tr) => tr.clientId === 42, (tr) => 0.05),
            new Rule(
                { transactionRepositoryService: this.transactionRepositoryService },
                (tr, ctx) => {
                    const monthAgoDate = subMonths(tr.date, 1)
                    const usersTransaction = 
                        ctx.transactionRepositoryService.getTransactions(t => t.clientId === tr.clientId && t.date >= monthAgoDate && t.date <= tr.date);

                    return usersTransaction.reduce((acc, t) => acc += t.amount, 0) >= 1000;
                }, 
                (tr, ctx) => 0.03)
        ];
    }
}
