import { Module } from '@nestjs/common';
import { TransactionCommissionService } from './transaction-commission.service';
import { TransactionCommissionController } from './transaction-commission.controller';
import { ExchangeService } from 'src/exchange/exchange.service';
import { RepositoryService } from 'src/repository/repository.service';
import { RulesService } from 'src/rules/rules.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [TransactionCommissionController],
  providers: [TransactionCommissionService, ExchangeService, RepositoryService, RulesService]
})
export class TransactionCommissionModule {}
