import { Test, TestingModule } from '@nestjs/testing';
import { TransactionRepositoryService as TransactionRepositoryService } from './transaction-repository.service';

describe('RepositoryService', () => {
  let service: TransactionRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionRepositoryService],
    }).compile();

    service = module.get<TransactionRepositoryService>(TransactionRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
