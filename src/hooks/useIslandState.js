import { useState, useCallback, useRef, useEffect } from 'react';

export function useIslandState() {
  const [islandState, setIslandState] = useState('idle');
  const [queue, setQueue] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [liveData, setLiveData] = useState(null);
  const timeoutRef = useRef(null);

  const processQueue = useCallback(() => {
    if (queue.length > 0) {
      const next = queue[0];
      setCurrentNotification(next);
      setIslandState('notification');
      setQueue(q => q.slice(1));

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        setCurrentNotification(null);
        // Only return to idle if we haven't been forced into another state like expanded
        setIslandState(current => current === 'notification' ? 'idle' : current);
      }, next.duration || 4000);
    }
  }, [queue]);

  // Process the queue when idle and nothing is playing
  useEffect(() => {
    if (islandState === 'idle' && !currentNotification && queue.length > 0) {
      const wait = setTimeout(processQueue, 200); // UI delay before next notif springs in
      return () => clearTimeout(wait);
    }
  }, [islandState, currentNotification, queue, processQueue]);

  const notify = useCallback((notification) => {
    const id = Date.now().toString() + Math.random();
    setQueue(prev => [...prev, { id, ...notification }]);
  }, []);

  const expand = useCallback(() => setIslandState('expanded'), []);
  const collapse = useCallback(() => setIslandState('idle'), []);
  
  const setLive = useCallback((data) => {
    setLiveData(data);
    setIslandState('live');
  }, []);

  const clearLive = useCallback(() => {
    setLiveData(null);
    setIslandState('idle');
  }, []);

  return {
    islandState,
    setIslandState,
    currentNotification,
    queue,
    liveData,
    notify,
    expand,
    collapse,
    setLive,
    clearLive
  };
}
