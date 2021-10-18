import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/transaction-commission/types/transaction';

// TODO: test in-memory storage
const storage: Transaction[] = []

@Injectable()
export class TransactionRepositoryService {
    storeTransaction(transaction: Transaction) {
        storage.push(transaction);
    }
}
