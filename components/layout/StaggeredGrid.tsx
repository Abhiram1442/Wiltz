'use client';

import { type ReactNode, Children } from 'react';

interface StaggeredGridProps {
  children: ReactNode;
  className?: string;
}

export function StaggeredGrid({ children, className = '' }: StaggeredGridProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <div
          className="animate-fade-up"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
