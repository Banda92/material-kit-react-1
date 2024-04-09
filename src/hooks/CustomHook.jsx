import { useState, useEffect } from 'react';

  // 세션스토리지 관리 커스텀훅
export function useSessionStorageState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}


  // 로컬스토리지 관리 커스텀훅
export function useLocalStorageState(key, defaultValue) {
    const [value, setValue] = useState(() => {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    });
  
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
  
    return [value, setValue];
  }
  