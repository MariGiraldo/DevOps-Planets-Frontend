
// src/hooks/useNivel.ts
import { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import { Nivel } from '../models/Nivel';

export function useNivel(levelId: number, initialTimer: number = 180) {
  // 1. All the states you want to recycle
  const [nivel, setNivel] = useState<Nivel | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(initialTimer);
  const [revealEnabled, setRevealEnabled] = useState(false);
  
  const token = localStorage.getItem('token');

  // 2. The API Fetch Effect
  useEffect(() => {
    const fetchNivel = async () => {
      try {
        setLoading(true);
        if (!token) throw new Error('No token found');

        // Uses the dynamic levelId here!
        const data = await api.getNivel(token, levelId); 
        setNivel(data);
      } catch (e: any) {
        console.error(`Fallo fetch nivel ${levelId}`, e);
        setError('Error fetching level data');
      } finally {
        setLoading(false);
      }
    };

    fetchNivel();
  }, [token, levelId]); // Reruns if token or levelId changes

  // 3. The Timer Effect
  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimer((current) => {
        if (current <= 1) {
          setRevealEnabled(true);
          clearInterval(interval);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 4. The Timer Formatting
  const formattedTimer = useMemo(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [timer]);

  // 5. Return everything the component will need
  return {
    nivel,
    setLoading,
    loading,
    setError,
    error,
    
    
    formattedTimer,
    revealEnabled,
    setRevealEnabled,
    token
  };
}