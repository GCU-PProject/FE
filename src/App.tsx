import { LoginPage } from '@/pages/ui/LoginPage';

/**
 * Render the LoginPage component with an internal Google login handler.
 *
 * The rendered LoginPage receives an `onGoogleLogin` prop bound to a handler
 * that logs "Google 로그인 버튼 클릭!" to the console when invoked.
 *
 * @returns The JSX element for LoginPage with `onGoogleLogin` set to the logging handler.
 */
function App() {
  const handleGoogleLogin = () => {
    console.log("Google 로그인 버튼 클릭!");
  };

  return (
    <LoginPage onGoogleLogin={handleGoogleLogin} />
  );
}

export default App;