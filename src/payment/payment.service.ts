import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Paystack from 'paystack';
import { Payment } from './payment.entity';
import { Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class PaymentService {
  private paystack;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async initializePayment(userEmail: string, amount: number): Promise<string> {
    try {
      const secretKey = process.env.PAYSTACK_SECRET_KEY;
      const paymentData = {
        email: userEmail,
        amount: amount * 100, // Amount in kobo
      };

      const initializePaymentResponse = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${secretKey}`,
          },
        },
      );

      if (initializePaymentResponse.data.status === true) {
        return initializePaymentResponse.data.data.authorization_url;
      } else {
        throw new Error('Failed to initialize payment');
      }
    } catch (error) {
      throw new Error('Failed to initialize payment');
    }
  }

  async verifyPayment(reference: string): Promise<boolean> {
    try {
      const secretKey = process.env.PAYSTACK_SECRET_KEY;
      const verifyPaymentResponse = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      });

      if (verifyPaymentResponse.data.status === true) {
        return verifyPaymentResponse.data.data.status === 'success';
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      throw new Error('Payment verification failed');
    }
  }


  async generateMonthlySummary(year: number, month: number): Promise<void> {
    // Calculate the start and end date for the specified month and year
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const payments = await this.paymentRepository.find({
      where: {
        date: Between(startDate, endDate),
        includedInSummary: false,
      },
    });

    // Mark the payments as included in a summary
    await Promise.all(
      payments.map(async (payment) => {
        payment.includedInSummary = true;
        await this.paymentRepository.save(payment);
      }),
    );
  }
}
