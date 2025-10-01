import { Space, Slot, Booking, User } from './types';

// Mock current user
export const mockUser: User = {
  fid: 'user123',
  walletAddress: '0x1234...5678',
  buildingId: 'building-1',
  unitNumber: '4B',
  reliabilityScore: 92,
  karmaPoints: 47,
  weeklyBookingCount: 2,
  lastResetDate: new Date(),
  hasPriorityPass: false,
  noShowStreak: 0,
  totalBookings: 23,
  createdAt: new Date('2024-01-01'),
};

// Mock spaces
export const mockSpaces: Space[] = [
  {
    id: 'gym-1',
    buildingId: 'building-1',
    name: 'Fitness Center',
    type: 'gym',
    capacity: 8,
    slotDuration: 60,
    openTime: '06:00',
    closeTime: '22:00',
    bookingLimitPerWeek: 3,
  },
  {
    id: 'laundry-1',
    buildingId: 'building-1',
    name: 'Laundry Room',
    type: 'laundry',
    capacity: 4,
    slotDuration: 90,
    openTime: '07:00',
    closeTime: '23:00',
    bookingLimitPerWeek: 5,
  },
  {
    id: 'grill-1',
    buildingId: 'building-1',
    name: 'Rooftop Grill',
    type: 'grill',
    capacity: 2,
    slotDuration: 120,
    openTime: '10:00',
    closeTime: '20:00',
    bookingLimitPerWeek: 2,
  },
];

// Generate mock slots for today
export function generateMockSlots(spaceId: string, date: Date = new Date()): Slot[] {
  const slots: Slot[] = [];
  const space = mockSpaces.find(s => s.id === spaceId);
  if (!space) return slots;

  const [openHour] = space.openTime.split(':').map(Number);
  const [closeHour] = space.closeTime.split(':').map(Number);
  
  for (let hour = openHour; hour < closeHour; hour++) {
    const startTime = new Date(date);
    startTime.setHours(hour, 0, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setMinutes(space.slotDuration);

    const isPrimeTime = hour >= 17 && hour <= 20; // 5pm-8pm
    const randomStatus = Math.random();
    
    slots.push({
      id: `slot-${spaceId}-${hour}`,
      spaceId,
      startTime,
      endTime,
      status: randomStatus > 0.6 ? 'available' : randomStatus > 0.3 ? 'booked' : 'available',
      isPrimeTime,
      requiresPriority: isPrimeTime && Math.random() > 0.7,
      viewerCount: Math.floor(Math.random() * 5),
    });
  }

  return slots;
}

// Mock bookings for current user
export const mockUserBookings: Booking[] = [
  {
    id: 'booking-1',
    slotId: 'slot-gym-1-18',
    userId: mockUser.fid,
    status: 'confirmed',
    confirmedAt: new Date(),
    swapOffered: false,
    bookedAt: new Date(),
  },
];
