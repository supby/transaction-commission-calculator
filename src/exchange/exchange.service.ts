import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExchangeService {
    constructor(private httpService: HttpService) {}
    async convert(from: string, to: string, amount: number, date: Date): Promise<number> {
        const resp = await firstValueFrom(this.httpService.get(`https://api.exchangerate.host/${format(date, 'yyyy-MM-dd')}`));

        const rates = resp.data['rates'];
        const conversionRate = rates[from];

        if (!conversionRate) {
            throw new Error('Destination currency is not found.')
        }

        return amount / conversionRate;
    }
}
