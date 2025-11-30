import { RouterProvider } from 'react-router-dom';
import { appRouter } from '@/routes/appRouter';

export const App = () => {
  return <RouterProvider router={appRouter} />;
};
