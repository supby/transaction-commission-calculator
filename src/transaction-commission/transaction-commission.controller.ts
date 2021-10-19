import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionCommissionService } from './transaction-commission.service';
import { TransactionDto } from './dto/transaction';

@Controller('transaction-commission')
export class TransactionCommissionController {
  constructor(private readonly transactionCommissionService: TransactionCommissionService) {}

  @Post()
  addTransaction(@Body() createTransactionCommissionDto: TransactionDto) {
    
    return this.transactionCommissionService.addTransaction(createTransactionCommissionDto);
  }
}
