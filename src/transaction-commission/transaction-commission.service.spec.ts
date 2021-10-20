import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from 'src/exchange/exchange.service';
import { RulesRepositoryService } from 'src/rules-repository/rules-repository.service';
import { TransactionRepositoryService } from 'src/transaction-repository/transaction-repository.service';
import { TransactionCommissionService } from './transaction-commission.service';
import { HttpModule } from '@nestjs/axios';

describe('TransactionCommissionService', () => {
  let service: TransactionCommissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        TransactionCommissionService, 
        ExchangeService, 
        TransactionRepositoryService, 
        RulesRepositoryService,
        {
          provide: 'BASE_CURRENCY',
          useValue: 'EUR',
        }],
    }).compile();

    service = module.get<TransactionCommissionService>(TransactionCommissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should ')
});
