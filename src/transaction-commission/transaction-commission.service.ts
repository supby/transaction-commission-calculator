import { Inject, Injectable } from '@nestjs/common';
import { Commission } from './dto/commission';
import { TransactionDto } from './dto/transaction';
import { ExchangeService } from 'src/exchange/exchange.service';
import { TransactionRepositoryService } from 'src/transaction-repository/transaction-repository.service';
import { RulesRepositoryService } from 'src/rules-repository/rules-repository.service';
import { BaseTransaction } from './types/baseTransaction';
import { tr } from 'date-fns/locale';
import { Rule } from 'src/rules-repository/types/rule';

@Injectable()
export class TransactionCommissionService {
  constructor(
    @Inject('BASE_CURRENCY') private readonly baseCurrency: string,
    private readonly exchangeService: ExchangeService,
    private readonly transactionRepositoryService: TransactionRepositoryService,
    private readonly rulesRepositoryService: RulesRepositoryService
  ) { }

  async processTransaction(transactionDto: TransactionDto): Promise<Commission> {
    // TODO: consider here possible Big number
    let amount = parseFloat(transactionDto.amount);
    const transactionDate = new Date(transactionDto.date);
    if (transactionDto.currency !== this.baseCurrency) {
      amount = await this.exchangeService.convert(
          transactionDto.currency,
          this.baseCurrency,
          amount, 
          transactionDate);
    }

    const baseTransaction = new BaseTransaction(transactionDate, amount, transactionDto.client_id);    
    const applicableRules = await this.rulesRepositoryService.getRules((r: Rule) => r.IsApplicable(baseTransaction));
    const commissionsToApply = await Promise.all(applicableRules.map(r => r.GetCommission(baseTransaction)));
    
    commissionsToApply.sort((a,b) => a - b);

    if (!commissionsToApply || commissionsToApply.length === 0) {
      throw new Error('No Rules found. Should be at least 1.');
    }

    this.transactionRepositoryService.storeTransaction(baseTransaction);

    return new Commission(commissionsToApply[0], this.baseCurrency);
  }
}
