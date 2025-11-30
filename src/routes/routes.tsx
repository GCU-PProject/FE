import { Navigate, createBrowserRouter } from 'react-router-dom';
import ExamplePage from '@/pages/ui/ExamplePage';

/** 앱 라우트 정의 (RouterProvider에서 사용) */
export const appRouter = createBrowserRouter([
  { path: '/', element: <ExamplePage /> },
  { path: '/law-collection', element: <ExamplePage /> },
  { path: '/ai-consulting', element: <ExamplePage /> },
  { path: '/law-compare', element: <ExamplePage /> },
  { path: '/mypage', element: <ExamplePage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);
