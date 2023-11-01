import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';
import { Transfer } from '../transfer/transfer.entity';
import { PaymentService } from '../payment/payment.service';
import { ConfigService } from '@nestjs/config';
import { Payment } from '../payment/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet, Transfer, Payment]), // Import both Wallet and Transfer entities
  ],
  controllers: [WalletController],
  providers: [WalletService, PaymentService, ConfigService],
  exports: [WalletService],
})
export class WalletModule {}
