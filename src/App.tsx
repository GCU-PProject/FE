import { RouterProvider } from 'react-router-dom';
import { appRouter } from '@/routes/routes';

export const App = () => {
  return <RouterProvider router={appRouter} />;
};
