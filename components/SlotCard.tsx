'use client';

import { Slot } from '@/lib/types';
import { Clock, Users, Star, Lock } from 'lucide-react';

interface SlotCardProps {
  slot: Slot;
  isUserBooking?: boolean;
  onBook?: (slotId: string) => void;
}

export function SlotCard({ slot, isUserBooking = false, onBook }: SlotCardProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getStatusClass = () => {
    if (isUserBooking) return 'slot-mine';
    if (slot.status === 'booked') return 'slot-booked';
    if (slot.isPrimeTime) return 'slot-prime';
    return 'slot-available';
  };

  const handleClick = () => {
    if (slot.status === 'available' && onBook) {
      onBook(slot.id);
    }
  };

  return (
    <div 
      className={`${getStatusClass()} relative`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${formatTime(slot.startTime)} slot, ${slot.status}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span className="font-semibold">{formatTime(slot.startTime)}</span>
        </div>
        {slot.isPrimeTime && (
          <Star className="w-4 h-4 text-warning fill-warning" />
        )}
      </div>

      <div className="flex items-center gap-3 text-sm text-muted">
        {slot.status === 'booked' && (
          <>
            <Lock className="w-3 h-3" />
            <span>Booked</span>
          </>
        )}
        {slot.status === 'available' && (
          <>
            <Users className="w-3 h-3" />
            <span>{slot.viewerCount} viewing</span>
          </>
        )}
        {isUserBooking && (
          <span className="text-accent font-medium">Your booking</span>
        )}
      </div>

      {slot.requiresPriority && (
        <div className="mt-2 text-xs text-warning flex items-center gap-1">
          <Star className="w-3 h-3" />
          <span>Priority Pass required</span>
        </div>
      )}
    </div>
  );
}
