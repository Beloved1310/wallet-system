// src/wallet/dto/create-wallet.dto.ts
import { IsString, IsNumber, IsNotEmpty, IsCurrency } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  currency: string;

  @IsNumber()
  balance: number;

  @IsString()
  @IsNotEmpty()
  walletName: string;
}
