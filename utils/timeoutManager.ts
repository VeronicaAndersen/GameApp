import { useEffect, useRef } from 'react';

/**
 * Manages setTimeout/setInterval cleanup to prevent memory leaks
 */
export class TimeoutManager {
  private timeouts: Set<NodeJS.Timeout> = new Set();
  private intervals: Set<NodeJS.Timeout> = new Set();

  /**
   * Creates a timeout that will be automatically tracked for cleanup
   */
  setTimeout(callback: () => void, ms: number): NodeJS.Timeout {
    const id = setTimeout(() => {
      callback();
      this.timeouts.delete(id);
    }, ms);
    this.timeouts.add(id);
    return id;
  }

  /**
   * Creates an interval that will be automatically tracked for cleanup
   */
  setInterval(callback: () => void, ms: number): NodeJS.Timeout {
    const id = setInterval(callback, ms);
    this.intervals.add(id);
    return id;
  }

  /**
   * Clears a specific timeout
   */
  clearTimeout(id: NodeJS.Timeout): void {
    clearTimeout(id);
    this.timeouts.delete(id);
  }

  /**
   * Clears a specific interval
   */
  clearInterval(id: NodeJS.Timeout): void {
    clearInterval(id);
    this.intervals.delete(id);
  }

  /**
   * Clears all tracked timeouts and intervals
   */
  clearAll(): void {
    this.timeouts.forEach(id => clearTimeout(id));
    this.intervals.forEach(id => clearInterval(id));
    this.timeouts.clear();
    this.intervals.clear();
  }

  /**
   * Returns true if there are active timeouts or intervals
   */
  hasActive(): boolean {
    return this.timeouts.size > 0 || this.intervals.size > 0;
  }
}

/**
 * React hook for managing timeouts in components
 * Automatically cleans up all timeouts on component unmount
 */
export function useTimeoutManager(): TimeoutManager {
  const managerRef = useRef<TimeoutManager>();

  if (!managerRef.current) {
    managerRef.current = new TimeoutManager();
  }

  useEffect(() => {
    return () => {
      managerRef.current?.clearAll();
    };
  }, []);

  return managerRef.current;
}
