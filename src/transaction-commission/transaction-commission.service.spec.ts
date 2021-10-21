import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from 'src/exchange/exchange.service';
import { RulesRepositoryService } from 'src/rules-repository/rules-repository.service';
import { TransactionRepositoryService } from 'src/transaction-repository/transaction-repository.service';
import { TransactionCommissionService } from './transaction-commission.service';
import { HttpModule } from '@nestjs/axios';
import { BaseTransaction } from './types/baseTransaction';
import { Rule } from 'src/rules-repository/types/rule';
import { RuleContext } from 'src/rules-repository/types/ruleContext';
import { TransactionDto } from './dto/transaction';

describe('TransactionCommissionService', () => {
  let sutService: TransactionCommissionService;
  let exchangeService: ExchangeService;
  let transactionRepoService: TransactionRepositoryService;
  let rulesRepoService: RulesRepositoryService;

  beforeEach(async () => {
    const ExchangeServiceProvider = {
      provide: ExchangeService,
      useFactory: () => ({
        convert: jest.fn(() => Promise.resolve(199.99)),
      }),
    };
    const TransactionRepositoryServiceProvider = {
      provide: TransactionRepositoryService,
      useFactory: () => ({
        getTransactions: jest.fn(() => Promise.resolve([
          new BaseTransaction(new Date(), 100, 42),
          new BaseTransaction(new Date(), 200, 1)
        ])),
        storeTransaction: jest.fn(() => Promise.resolve(true))
      }),
    };
    const RulesRepositoryProvider = (ctx: RuleContext) => ({
      provide: RulesRepositoryService,
      useFactory: () => ({
        getRules: jest.fn(() => Promise.resolve([new Rule(ctx, () => Promise.resolve(true), () => Promise.resolve(0.5))]))
      }),
    });

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        TransactionCommissionService,
        ExchangeServiceProvider, 
        TransactionRepositoryServiceProvider, 
        RulesRepositoryProvider(null),
        {
          provide: 'BASE_CURRENCY',
          useValue: 'EUR',
        }],
    }).compile();

    sutService = module.get<TransactionCommissionService>(TransactionCommissionService);
    exchangeService = module.get<ExchangeService>(ExchangeService);
    transactionRepoService = module.get<TransactionRepositoryService>(TransactionRepositoryService);
    rulesRepoService = module.get<RulesRepositoryService>(RulesRepositoryService);
  });

  it('should be defined', () => {
    expect(sutService).toBeDefined();
  });

  describe("when calling processTransaction", () => {
    it('should call appropriate services and return result', async () => {
      const inputTransaction: TransactionDto = {
        amount: "100.00",
        date: "2021-10-10",
        currency: "PLN",
        client_id: 42
      };

      const res = await sutService.processTransaction(inputTransaction);

      expect(res.amount).toBe("0.5");
      expect(exchangeService.convert).toHaveBeenCalledTimes(1);
      expect(exchangeService.convert).toHaveBeenCalledWith(
          inputTransaction.currency, 
          "EUR", 
          parseFloat(inputTransaction.amount), 
          new Date(inputTransaction.date));
      expect(rulesRepoService.getRules).toHaveBeenCalledTimes(1);
      expect(transactionRepoService.storeTransaction).toHaveBeenCalledTimes(1);
    })  
  })
});
