// src/wallet/dto/admin-approval.dto.ts
import { IsInt } from 'class-validator';

export class AdminApprovalDto {
  @IsInt()
  transferId: number; // The ID of the transfer to approve or reject
}
