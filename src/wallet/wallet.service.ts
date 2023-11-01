// src/wallet/wallet.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { User } from '../user/user.entity';
import { Transfer } from '../transfer/transfer.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Transfer) // Inject TransferRepository
    private readonly transferRepository: Repository<Transfer>,
  ) {}

  async createWallet(
    user: User,
    currency: string,
    balance: number,
    walletName: string,
  ): Promise<Wallet> {
    const wallet = this.walletRepository.create({
      user,
      currency,
      walletName,
      balance,
    });
    return this.walletRepository.save(wallet);
  }

  async getWalletsByUser(user: User): Promise<Wallet[]> {
    return this.walletRepository.find({ where: { user } });
  }

  async creditWallet(
    user: User,
    walletId: number,
    amount: number,
  ): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({
      where: { id: walletId, user },
    });

    if (!wallet) {
      throw new NotFoundException(
        'Wallet not found or does not belong to the user',
      );
    }

    // Perform the credit transaction, e.g., updating the wallet balance
    wallet.balance += amount;

    // Update the wallet in the database
    await this.walletRepository.save(wallet);

    return wallet;
  }

  async transferFunds(
    user: User,
    sourceWalletId: number,
    targetWalletId: number,
    amount: number,
  ): Promise<void> {
    const sourceWallet = await this.walletRepository.findOne({
      where: { id: sourceWalletId, user },
    });

    const targetWallet = await this.walletRepository.findOne({
      where: { id: targetWalletId },
    });

    if (!sourceWallet || !targetWallet) {
      throw new NotFoundException('Source or target wallet not found');
    }

    if (sourceWallet.balance < amount) {
      throw new BadRequestException('Insufficient funds in the source wallet');
    }

    // Perform the transfer transaction
    sourceWallet.balance -= amount;
    targetWallet.balance += amount;

    // Update the wallets in the database
    await this.walletRepository.save([sourceWallet, targetWallet]);
  }

  async approveTransfer(transferId: number): Promise<void> {
    const transfer = await this.transferRepository.findOne({
      where: { id: transferId },
    });

    if (!transfer) {
      throw new NotFoundException('Transfer not found');
    }

    // Check if the transfer amount is over N1,000,000
    if (transfer.amount > 1000000) {
      // Mark the transfer as approved
      transfer.approved = true;

      // Update the transfer in the database
      await this.transferRepository.save(transfer);
    } else {
      throw new ForbiddenException('Transfer does not require approval');
    }
  }
}
