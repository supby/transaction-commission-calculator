// Base transaction in base currency
export class BaseTransaction {
    constructor(
        readonly date: Date,
        readonly amount: number,
        readonly clientId: number,
    ) {}
}