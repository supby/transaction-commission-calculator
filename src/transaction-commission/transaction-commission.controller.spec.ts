import { Test, TestingModule } from '@nestjs/testing';
import { TransactionCommissionController } from './transaction-commission.controller';
import { TransactionCommissionService } from './transaction-commission.service';

describe('TransactionCommissionController', () => {
  let controller: TransactionCommissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionCommissionController],
      providers: [TransactionCommissionService],
    }).compile();

    controller = module.get<TransactionCommissionController>(TransactionCommissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
