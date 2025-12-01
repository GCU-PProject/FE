import { Navigate, createBrowserRouter } from 'react-router-dom';
import { ExamplePage } from '@/pages/ui/ExamplePage';
import { LoginPage } from '@/pages/ui/LoginPage';

const LoginRoute = () => {
  const handleGoogleLogin = () => {
    console.log('Google 로그인 버튼 클릭!');
  };

  return <LoginPage onGoogleLogin={handleGoogleLogin} />;
};

/** 앱 라우트 정의 (RouterProvider에서 사용) */
export const appRouter = createBrowserRouter([
  { path: '/', element: <LoginRoute /> },
  { path: '/law-collection', element: <ExamplePage /> },
  { path: '/ai-consulting', element: <ExamplePage /> },
  { path: '/law-compare', element: <ExamplePage /> },
  { path: '/mypage', element: <ExamplePage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]);
