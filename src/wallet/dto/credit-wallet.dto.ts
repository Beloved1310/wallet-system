// src/wallet/dto/credit-wallet.dto.ts
import { IsNumber, IsPositive, IsInt } from 'class-validator';

export class CreditWalletDto {
  @IsInt()
  walletId: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}
