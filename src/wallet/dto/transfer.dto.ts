// src/wallet/dto/transfer.dto.ts
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class TransferDto {
  @IsInt()
  sourceWalletId: number;

  @IsInt()
  targetWalletId: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}
