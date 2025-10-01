'use client';

import { Space } from '@/lib/types';
import { Dumbbell, Shirt, Flame, Calendar } from 'lucide-react';

interface SpaceSelectorProps {
  spaces: Space[];
  selectedSpaceId: string;
  onSelectSpace: (spaceId: string) => void;
}

const spaceIcons = {
  gym: Dumbbell,
  laundry: Shirt,
  grill: Flame,
  event: Calendar,
};

export function SpaceSelector({ spaces, selectedSpaceId, onSelectSpace }: SpaceSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {spaces.map((space) => {
        const Icon = spaceIcons[space.type];
        const isSelected = space.id === selectedSpaceId;
        
        return (
          <button
            key={space.id}
            onClick={() => onSelectSpace(space.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium
              transition-all duration-200 whitespace-nowrap
              ${isSelected 
                ? 'bg-primary text-white shadow-button' 
                : 'bg-surface text-fg border-2 border-border hover:border-primary'
              }
            `}
            aria-pressed={isSelected}
          >
            <Icon className="w-4 h-4" />
            <span>{space.name}</span>
          </button>
        );
      })}
    </div>
  );
}
