'use client';

import { useState } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { mockSpaces, mockUser, generateMockSlots, mockUserBookings } from '@/lib/mock-data';
import { SpaceSelector } from '@/components/SpaceSelector';
import { SlotCard } from '@/components/SlotCard';
import { UserStats } from '@/components/UserStats';
import { BookingModal } from '@/components/BookingModal';
import { ConfettiEffect } from '@/components/ConfettiEffect';
import { Calendar, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const [selectedSpaceId, setSelectedSpaceId] = useState(mockSpaces[0].id);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [bookings, setBookings] = useState(mockUserBookings);

  const selectedSpace = mockSpaces.find(s => s.id === selectedSpaceId);
  const slots = generateMockSlots(selectedSpaceId);

  const handleBookSlot = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleConfirmBooking = () => {
    if (selectedSlot) {
      setBookings([...bookings, {
        id: `booking-${Date.now()}`,
        slotId: selectedSlot,
        userId: mockUser.fid,
        status: 'confirmed',
        confirmedAt: new Date(),
        swapOffered: false,
        bookedAt: new Date(),
      }]);
      setShowConfetti(true);
      setSelectedSlot(null);
      
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const selectedSlotData = slots.find(s => s.id === selectedSlot);

  return (
    <div className="min-h-screen bg-bg">
      {showConfetti && <ConfettiEffect />}
      
      {/* Header */}
      <header className="glass-card sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">SlotSync</h1>
              <p className="text-sm text-muted">Building 23 • Unit {mockUser.unitNumber}</p>
            </div>
            <Wallet>
              <ConnectWallet>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8" />
                  <Name className="text-sm font-medium" />
                </div>
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* User Stats */}
        <UserStats user={mockUser} />

        {/* Quick Actions */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Quick Actions</h2>
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="btn-primary text-sm py-2">
              View My Bookings
            </button>
            <button className="btn-ghost text-sm py-2">
              Swap Board
            </button>
          </div>
        </div>

        {/* Space Selector */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Select Space</h2>
          <SpaceSelector
            spaces={mockSpaces}
            selectedSpaceId={selectedSpaceId}
            onSelectSpace={setSelectedSpaceId}
          />
        </div>

        {/* Available Slots */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-lg">Available Slots</h2>
            <div className="flex items-center gap-2 text-sm text-muted">
              <TrendingUp className="w-4 h-4" />
              <span>Live availability</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {slots.slice(0, 8).map((slot) => {
              const isUserBooking = bookings.some(b => b.slotId === slot.id);
              return (
                <SlotCard
                  key={slot.id}
                  slot={slot}
                  isUserBooking={isUserBooking}
                  onBook={handleBookSlot}
                />
              );
            })}
          </div>
        </div>

        {/* Community Pulse */}
        <div className="glass-card p-4">
          <h2 className="font-semibold text-lg mb-4">Community Pulse</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Peak gym time</span>
              <span className="text-sm font-medium">6-8pm (87% booked)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Building fund</span>
              <span className="text-sm font-medium text-success">$42.50</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Active residents</span>
              <span className="text-sm font-medium">156</span>
            </div>
          </div>
        </div>

        {/* CTA for Priority Pass */}
        {!mockUser.hasPriorityPass && (
          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="font-bold text-xl mb-2">Upgrade to Priority Pass</h3>
            <p className="text-sm text-muted mb-4">
              Get unlimited bookings and priority access to prime time slots
            </p>
            <button className="btn-primary w-full">
              Mint Priority Pass - $8
            </button>
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {selectedSlot && selectedSlotData && selectedSpace && (
        <BookingModal
          slot={selectedSlotData}
          space={selectedSpace}
          onClose={() => setSelectedSlot(null)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}
