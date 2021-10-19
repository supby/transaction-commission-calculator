import { Injectable } from '@nestjs/common';
import { TransactionDto } from 'src/transaction-commission/dto/transaction';

// TODO: test in-memory storage
const storage: TransactionDto[] = []

@Injectable()
export class TransactionRepositoryService {
    storeTransaction(transaction: TransactionDto) {
        storage.push(transaction);
    }
}
