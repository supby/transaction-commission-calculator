import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TransactionCommissionController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/transaction-commission (POST)', () => {
    return request(app.getHttpServer())
      .post('/transaction-commission')
      .send({
        date: "2021-01-01",
        amount: "100.00",
        currency: "EUR",
        client_id: 42
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .expect('{"amount":0.05,"currency":"EUR"}');
  });
});
