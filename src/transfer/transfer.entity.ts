// transfer.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Wallet } from '../wallet/wallet.entity';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.outgoingTransfers)
  sourceWallet: Wallet;

  @ManyToOne(() => Wallet, (wallet) => wallet.incomingTransfers)
  targetWallet: Wallet;

  @Column({ default: false })
  approved: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
