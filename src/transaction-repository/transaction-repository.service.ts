import { Injectable } from '@nestjs/common';
import { BaseTransaction } from 'src/transaction-commission/types/baseTransaction';

// TODO: test in-memory storage
const storage: BaseTransaction[] = []

@Injectable()
export class TransactionRepositoryService {
    async storeTransaction(transaction: BaseTransaction): Promise<boolean> {
        storage.push(transaction);

        return true;
    }

    async getTransactions(predicate: (transaction: BaseTransaction) => boolean): Promise<BaseTransaction[]> {
        return storage.filter(predicate);
    }
}
