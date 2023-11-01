// src/wallet/wallet.controller.ts
import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WalletService } from './wallet.service';
import { CreditWalletDto } from './dto/credit-wallet.dto';
import { TransferDto } from './dto/transfer.dto';
import { AdminApprovalDto } from './dto/admin-approval.dto';
import { AdminGuard } from './admin.guard';
import { PaymentService } from '../payment/payment.service';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Controller('wallets')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly paymentService: PaymentService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createWallet(@Req() request, @Body() createWalletDto: CreateWalletDto) {
    const { currency, balance, walletName } = createWalletDto;
    const user = request.user; // Get the authenticated user from the JWT token

    const wallet = await this.walletService.createWallet(
      user,
      currency,
      balance,
      walletName,
    );

    return wallet;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserWallets(@Req() request) {
    const user = request.user; // Get the authenticated user from the JWT token

    const wallets = await this.walletService.getWalletsByUser(user);

    return wallets;
  }

  @UseGuards(JwtAuthGuard)
  @Post('credit')
  async creditWallet(@Body() creditWalletDto: CreditWalletDto, @Req() request) {
    const { walletId, amount } = creditWalletDto;
    const user = request.user; // Get the authenticated user from the JWT token
    const creditedWallet = await this.walletService.creditWallet(
      user,
      walletId,
      amount,
    );

    return creditedWallet;
  }

  @UseGuards(JwtAuthGuard)
  @Post('transfer')
  async transferFunds(@Body() transferDto: TransferDto, @Req() request) {
    const { sourceWalletId, targetWalletId, amount } = transferDto;
    const user = request.user; // Get the authenticated user from the JWT token

    // Call the WalletService method to transfer funds
    await this.walletService.transferFunds(
      user,
      sourceWalletId,
      targetWalletId,
      amount,
    );

    return { message: 'Funds transferred successfully' };
  }

  @UseGuards(JwtAuthGuard, AdminGuard) // Use AdminGuard to ensure only admin users can access this endpoint
  @Post('approve-transfer')
  async approveTransfer(@Body() adminApprovalDto: AdminApprovalDto) {
    const { transferId } = adminApprovalDto;

    // Call the WalletService method to approve the transfer
    await this.walletService.approveTransfer(transferId);

    return { message: 'Transfer approved' };
  }

  @UseGuards(AdminGuard)
  @Post('generate-monthly-summary')
  async generateMonthlySummary(
    @Body() { year, month }: { year: number; month: number },
  ) {
    await this.paymentService.generateMonthlySummary(year, month);
    return { message: 'Monthly summary generated' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('initialize-payment')
  async initializePayment(
    @Body() paymentData: { userEmail: string; amount: number },
  ): Promise<{ paymentUrl: string }> {
    const { userEmail, amount } = paymentData;
    const paymentUrl = await this.paymentService.initializePayment(
      userEmail,
      amount,
    );
    return { paymentUrl };
  }

  @Get('verify-payment/:reference')
  async verifyPayment(@Param('reference') reference: string): Promise<boolean> {
    const isPaymentSuccessful = await this.paymentService.verifyPayment(
      reference,
    );
    return isPaymentSuccessful; 
  }
}
