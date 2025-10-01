// Core data types for SlotSync

export interface User {
  fid: string;
  walletAddress: string;
  buildingId: string;
  unitNumber: string;
  reliabilityScore: number;
  karmaPoints: number;
  weeklyBookingCount: number;
  lastResetDate: Date;
  hasPriorityPass: boolean;
  noShowStreak: number;
  totalBookings: number;
  createdAt: Date;
}

export interface Building {
  id: string;
  name: string;
  address: string;
  managerWallet: string;
  communityFundBalance: number;
  activeResidents: number;
  createdAt: Date;
}

export interface Space {
  id: string;
  buildingId: string;
  name: string;
  type: 'gym' | 'laundry' | 'grill' | 'event';
  capacity: number;
  slotDuration: number;
  openTime: string;
  closeTime: string;
  bookingLimitPerWeek: number;
}

export interface Slot {
  id: string;
  spaceId: string;
  startTime: Date;
  endTime: Date;
  status: 'available' | 'booked' | 'in-use' | 'completed' | 'no-show';
  isPrimeTime: boolean;
  requiresPriority: boolean;
  viewerCount: number;
}

export interface Booking {
  id: string;
  slotId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  confirmationSentAt?: Date;
  confirmedAt?: Date;
  checkedInAt?: Date;
  cancelledAt?: Date;
  autoReleasedAt?: Date;
  swapOffered: boolean;
  bookedAt: Date;
}

export interface Waitlist {
  id: string;
  slotId: string;
  userId: string;
  position: number;
  joinedAt: Date;
  notifiedAt?: Date;
  expiresAt: Date;
}

export interface SwapOffer {
  id: string;
  offeringUserId: string;
  offeringSlotId: string;
  requestedSlotId: string;
  status: 'open' | 'matched' | 'completed' | 'expired';
  matchedUserId?: string;
  feeAmount: number;
  createdAt: Date;
  expiresAt: Date;
}

export interface PriorityPass {
  tokenId: string;
  userId: string;
  mintedAt: Date;
  expiresAt: Date;
  buildingId: string;
  tier: 'silver' | 'gold';
}
