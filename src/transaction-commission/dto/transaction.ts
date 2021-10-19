import { IsDateString, IsInt, IsNotEmpty, IsNumberString } from "class-validator"

export class TransactionDto {
  
  @IsDateString()
  @IsNotEmpty()  
  readonly date: string

  @IsNumberString()
  @IsNotEmpty()
  readonly amount: number

  @IsNotEmpty()
  readonly currency: string

  @IsInt()
  @IsNotEmpty()
  readonly client_id: number
}
