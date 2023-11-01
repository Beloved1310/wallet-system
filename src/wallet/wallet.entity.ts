// wallet.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Transfer } from '../transfer/transfer.entity'; // Import Transfer entity
import { User } from '../user/user.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currency: string;

  @Column()
  walletName: string;

  @Column()
  balance: number;

  @ManyToOne(() => User, (user) => user.wallets)
  user: User;

  @OneToMany(() => Transfer, (transfer) => transfer.sourceWallet) // Define the one-to-many relationship
  outgoingTransfers: Transfer[]; // Define the outgoingTransfers property

  @OneToMany(() => Transfer, (transfer) => transfer.targetWallet) // Define another one-to-many relationship
  incomingTransfers: Transfer[]; // Define the incomingTransfers property
}
