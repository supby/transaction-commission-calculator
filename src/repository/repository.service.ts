import { Injectable } from '@nestjs/common';
import { TransactionDto } from 'src/transaction-commission/dto/transaction.dto';

// TODO: test in-memory storage
const storage: TransactionDto[] = []

@Injectable()
export class RepositoryService {
    storeTransaction(transaction: TransactionDto) {
        storage.push(transaction);
    }
}
