import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionCommissionModule } from './transaction-commission/transaction-commission.module';
import { ExchangeService } from './exchange/exchange.service';
import { RepositoryService } from './repository/repository.service';
import { RulesService } from './rules/rules.service';

@Module({
  imports: [TransactionCommissionModule],
  controllers: [AppController],
  providers: [AppService, ExchangeService, RepositoryService, RulesService],
})
export class AppModule {}
