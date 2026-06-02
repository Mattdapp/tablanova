import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Handles scroll on navigation:
 * - With a #hash → smooth-scroll to the matching element (deep-links from the footer).
 * - Without a hash → reset to the top of the page on route change.
 */
export const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section is mounted before scrolling.
      const id = hash.replace('#', '');
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      const t = setTimeout(scrollToTarget, 100);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
};
