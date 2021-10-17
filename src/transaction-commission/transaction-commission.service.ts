import { Injectable } from '@nestjs/common';
import { CommissionDto } from './dto/commission.dto';
import { TransactionDto } from './dto/transaction.dto';
import { ExchangeService } from 'src/exchange/exchange.service';
import { RepositoryService } from 'src/repository/repository.service';
import { RulesService } from 'src/rules/rules.service';

@Injectable()
export class TransactionCommissionService {
  private static BASE_CURRENCY = "EUR";

  constructor(
    private readonly exchangeService: ExchangeService,
    private readonly repositoryService: RepositoryService,
    private readonly rulesService: RulesService
  ) { }

  async addTransaction(transaction: TransactionDto): Promise<CommissionDto> {
    let amount = transaction.amount;
    if (transaction.currency !== TransactionCommissionService.BASE_CURRENCY) {
      amount = await this.exchangeService.convert(transaction.currency, TransactionCommissionService.BASE_CURRENCY, amount)
    }
    
    this.repositoryService.storeTransaction(transaction);

    // TODO: get rules for transaction

    // TODO: calculate commission based on rules and stored transactions

    return new CommissionDto(transaction.amount, transaction.currency);
  }
}
