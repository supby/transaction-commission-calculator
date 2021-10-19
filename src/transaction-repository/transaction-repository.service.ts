import { Injectable } from '@nestjs/common';
import { BaseTransation } from 'src/transaction-commission/types/baseTransaction';

// TODO: test in-memory storage
const storage: BaseTransation[] = []

@Injectable()
export class TransactionRepositoryService {
    storeTransaction(transaction: BaseTransation) {
        storage.push(transaction);
    }
}
