import { useEffect, useRef } from 'react';
import { authAPI } from '../services/auth';

const REFRESH_INTERVAL_MS = 50 * 60 * 1000; // 50 minutes

export function useAuthRefresh() {
  useEffect(() => {
    // Auth refresh disabled due to CORS and 404 errors from backend
    return;
  }, []);
}


