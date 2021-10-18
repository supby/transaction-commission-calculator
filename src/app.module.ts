import { Module } from '@nestjs/common';
import { TransactionCommissionModule } from './transaction-commission/transaction-commission.module';
import { ExchangeService } from './exchange/exchange.service';
import { RepositoryService } from './repository/repository.service';
import { RulesService } from './rules/rules.service';

@Module({
  imports: [TransactionCommissionModule]
})
export class AppModule {}
