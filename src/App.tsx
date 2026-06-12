import { useEffect } from 'react';
import AppRoutes from '@/routes/routes';
import { getHealth } from '@/api/health';

const App = () => {
  useEffect(() => {
    void (async () => {
      try {
        await getHealth();
      } catch (error) {
        console.warn('Health check failed', error);
      }
    })();
  }, []);

  return <AppRoutes />;
};

export default App;
