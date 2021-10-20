import { Module } from '@nestjs/common';
import { TransactionCommissionService } from './transaction-commission.service';
import { TransactionCommissionController } from './transaction-commission.controller';
import { ExchangeService } from 'src/exchange/exchange.service';
import { TransactionRepositoryService } from 'src/transaction-repository/transaction-repository.service';
import { RulesRepositoryService } from 'src/rules-repository/rules-repository.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [TransactionCommissionController],
  providers: [
    TransactionCommissionService, 
    ExchangeService, 
    TransactionRepositoryService, 
    RulesRepositoryService,
    {
      // TODO: the base currency is configurable. Might be loaded from config or DB.
      provide: 'BASE_CURRENCY',
      useValue: 'EUR',
    }
  ]
})
export class TransactionCommissionModule {}
