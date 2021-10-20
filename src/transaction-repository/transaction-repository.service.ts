import { Injectable } from '@nestjs/common';
import { BaseTransation } from 'src/transaction-commission/types/baseTransaction';

// TODO: test in-memory storage
const storage: BaseTransation[] = []

@Injectable()
export class TransactionRepositoryService {
    async storeTransaction(transaction: BaseTransation) {
        storage.push(transaction);
    }

    async getTransactions(predicate: (transaction: BaseTransation) => boolean): Promise<BaseTransation[]> {
        return storage.filter(predicate);
    }
}
