'use client';

import { User } from '@/lib/types';
import { Award, Zap, TrendingUp } from 'lucide-react';

interface UserStatsProps {
  user: User;
}

export function UserStats({ user }: UserStatsProps) {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Your Stats</h3>
        {user.hasPriorityPass && (
          <span className="px-3 py-1 bg-warning text-white text-xs font-medium rounded-full">
            Priority Pass
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div className="text-2xl font-bold text-success">{user.reliabilityScore}</div>
          <div className="text-xs text-muted">Reliability</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Zap className="w-5 h-5 text-warning" />
          </div>
          <div className="text-2xl font-bold text-warning">{user.karmaPoints}</div>
          <div className="text-xs text-muted">Karma Points</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Award className="w-5 h-5 text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary">{user.weeklyBookingCount}/3</div>
          <div className="text-xs text-muted">This Week</div>
        </div>
      </div>

      {user.weeklyBookingCount >= 3 && !user.hasPriorityPass && (
        <div className="mt-4 p-3 bg-warning bg-opacity-10 rounded-lg border border-warning">
          <p className="text-sm text-warning font-medium">
            Weekly limit reached. Upgrade to Priority Pass for unlimited bookings!
          </p>
        </div>
      )}
    </div>
  );
}
