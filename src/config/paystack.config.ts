// src/config/paystack.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('paystack', () => ({
  secretKey: process.env.PAYSTACK_SECRET_KEY, // Load the secret key from your environment variables
}));
