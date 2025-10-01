'use client';

import { useState } from 'react';
import { Slot, Space } from '@/lib/types';
import { X, Clock, MapPin, Users } from 'lucide-react';

interface BookingModalProps {
  slot: Slot;
  space: Space;
  onClose: () => void;
  onConfirm: () => void;
}

export function BookingModal({ slot, space, onClose, onConfirm }: BookingModalProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleConfirm = async () => {
    setIsConfirming(true);
    // Simulate booking API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="glass-card max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-fg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary" />
            <div>
              <div className="font-semibold">{space.name}</div>
              <div className="text-sm text-muted">{space.type}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <div>
              <div className="font-semibold">
                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
              </div>
              <div className="text-sm text-muted">
                {slot.isPrimeTime && '⭐ Prime time slot'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <div className="font-semibold">Capacity: {space.capacity} people</div>
              <div className="text-sm text-muted">{slot.viewerCount} people viewing</div>
            </div>
          </div>
        </div>

        <div className="bg-primary bg-opacity-10 rounded-lg p-4 mb-6">
          <p className="text-sm text-primary font-medium">
            📱 You'll receive a confirmation notification 15 minutes before your slot.
            Please confirm or it will be auto-released to the waitlist.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="btn-ghost flex-1"
            disabled={isConfirming}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="btn-primary flex-1"
            disabled={isConfirming}
          >
            {isConfirming ? 'Booking...' : 'Book It! 🎉'}
          </button>
        </div>
      </div>
    </div>
  );
}
