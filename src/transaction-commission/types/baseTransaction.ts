// Base transaction in base currency
export class BaseTransation {
    constructor(
        readonly date: Date,
        readonly amount: number,
        readonly clientId: number,
    ) {}
}