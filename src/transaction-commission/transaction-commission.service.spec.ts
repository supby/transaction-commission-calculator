import { Test, TestingModule } from '@nestjs/testing';
import { TransactionCommissionService } from './transaction-commission.service';

describe('TransactionCommissionService', () => {
  let service: TransactionCommissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionCommissionService],
    }).compile();

    service = module.get<TransactionCommissionService>(TransactionCommissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
