import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsNumberString } from "class-validator"

export class TransactionDto {
  
  @IsDateString()
  @IsNotEmpty()  
  readonly date: string

  @IsNumberString()
  @IsNotEmpty()
  readonly amount: string

  @IsNotEmpty()
  readonly currency: string

  @IsInt()
  @IsNotEmpty()
  readonly client_id: number
}
