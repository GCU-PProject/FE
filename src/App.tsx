import { LoginPage } from '@/Loginpage';

function App() {
  const handleGoogleLogin = () => {
    console.log("Google 로그인 버튼 클릭!");
  };

  return (
    <LoginPage onGoogleLogin={handleGoogleLogin} />
  );
}

export default App;