// src/payment/payment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 }) // Payment amount in decimal format
  amount: number;

  @Column({ type: 'date' }) // Payment date
  date: Date;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  @Column({ default: false }) // Mark as true if the payment is included in a summary
  includedInSummary: boolean;
}
