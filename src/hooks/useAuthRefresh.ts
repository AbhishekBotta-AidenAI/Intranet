import { useEffect, useRef } from 'react';
import { authAPI } from '../services/auth';

const REFRESH_INTERVAL_MS = 50 * 60 * 1000; // 50 minutes

export function useAuthRefresh() {
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const doRefresh = async () => {
      try {
        await authAPI.refresh();
      } catch (err) {
        if (!cancelled) {
          console.warn('Refresh token failed', err);
        }
      }
    };

    // initial refresh attempt to extend session
    doRefresh();

    // schedule periodic refresh
    timerRef.current = window.setInterval(() => {
      doRefresh();
    }, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
}
