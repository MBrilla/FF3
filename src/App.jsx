import { useEffect } from 'react';
import { initScrollAnimations } from './utils/scrollAnimations';

function App() {
  useEffect(() => {
    initScrollAnimations();
  }, []);

  // ... rest of the component code ...
}

export default App; 