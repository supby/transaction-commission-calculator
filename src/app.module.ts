import { Module } from '@nestjs/common';
import { TransactionCommissionModule } from './transaction-commission/transaction-commission.module';

@Module({
  imports: [TransactionCommissionModule]
})
export class AppModule {}
