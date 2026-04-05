import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Header = () => {
  const [dateStr, setDateStr] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchDate = async () => {
      try {
        const res = await axios.get(
          'https://10000--main--fastapi--admin.dev.storewise.in/'
        );
        if (!cancelled) {
          const raw = res.data;
          // API may return { date: "..." } or a plain string
          const d = typeof raw === 'string' ? raw : raw.date || raw.message || JSON.stringify(raw);
          setDateStr(d);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          // Graceful fallback to local date if the remote server is down (e.g. 502 Bad Gateway)
          const fallbackDate = new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
          setDateStr(fallbackDate);
          setLoading(false);
        }
      }
    };
    fetchDate();
    return () => { cancelled = true; };
  }, []);

  return (
    <header className="app-header">
      <div className="header-inner">
        <motion.div 
          className="header-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to right, #a855f7, #3b82f6, #06b6d4, #a855f7)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '-0.5px'
            }}
            animate={{ backgroundPosition: ['0% center', '200% center'] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          >
            ARITRA DAS
          </motion.h1>
          <motion.p 
            className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mt-1"
            style={{ color: '#94a3b8' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            Assignment
          </motion.p>
        </motion.div>
        <div className="header-right">
          <div className="header-date-chip">
            {loading && <span className="date-loading">Fetching date…</span>}
            {error && <span className="date-error">⚠ Could not load date</span>}
            {!loading && !error && (
              <span className="date-value">📅 {dateStr}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
