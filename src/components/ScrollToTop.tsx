import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Reset scroll position
    window.scrollTo(0, 0);
    
    // Reset main content scroll
    const main = document.querySelector('main');
    if (main) {
      main.scrollTop = 0;
    }
    
    // Reset body scroll
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [pathname]);
  
  return null;
};

export default ScrollToTop;