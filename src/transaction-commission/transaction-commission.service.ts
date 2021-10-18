import { Injectable } from '@nestjs/common';
import { Commission } from './types/commission';
import { Transaction } from './types/transaction';
import { ExchangeService } from 'src/exchange/exchange.service';
import { TransactionRepositoryService } from 'src/transaction-repository/transaction-repository.service';
import { RulesRepositoryService } from 'src/rules-repository/rules-repository.service';

@Injectable()
export class TransactionCommissionService {
  private static BASE_CURRENCY = "EUR";

  constructor(
    private readonly exchangeService: ExchangeService,
    private readonly transactionRepositoryService: TransactionRepositoryService,
    private readonly rulesRepositoryService: RulesRepositoryService
  ) { }

  async addTransaction(transaction: Transaction): Promise<Commission> {
    let amount = transaction.amount;
    if (transaction.currency !== TransactionCommissionService.BASE_CURRENCY) {
      amount = await this.exchangeService.convert(
          transaction.currency, 
          TransactionCommissionService.BASE_CURRENCY, 
          amount, 
          new Date(transaction.date));
    }
    
    this.transactionRepositoryService.storeTransaction(transaction);
    
    const commissionsToApply = this.rulesRepositoryService
        .getRules()
        .filter(r => r.predicate(transaction))
        .map(r => r.getCommission(transaction))
        .sort((a,b) => a - b);

    if (!commissionsToApply || commissionsToApply.length === 0) {
      throw new Error('No Rules found. Should at least 1.');
    }

    return new Commission(commissionsToApply[0], TransactionCommissionService.BASE_CURRENCY);
  }
}
