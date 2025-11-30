import { useState } from 'react';
import { Scale } from 'lucide-react';
import { Button } from '@/components/common/button/Button';
import { GoogleIcon } from '@/assets/icons/GoogleIcon';

// 구글 로그인 페이지
export type LoginPageProps = {
  onGoogleLogin: () => void;
};

export const LoginPage = ({ onGoogleLogin }: LoginPageProps) => {
  // 향후 로딩/오류 상태 노출 용도
  const [isLoading, setIsLoading] = useState(false);

  const handleClickGoogleLogin = (): void => {
    // TODO: 실제 GA 이벤트 연결
    setIsLoading(true);
    onGoogleLogin();
    setIsLoading(false);
  };

  return (
    <div className='min-h-screen flex items-center justify-center
      bg-gradient-to-br from-blue-600 to-blue-800'>
      <div className='bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full mx-4'>
        <div className='text-center'>
          {/* 브랜드 아이콘/타이틀 */}
          <div className='mb-8'>
            <div className='inline-flex items-center justify-center w-20 h-20
              bg-blue-100 rounded-full mb-4'>
              <Scale className='w-10 h-10 text-blue-600' />
            </div>
            <h1 className='text-4xl mb-2 text-gray-900'>G.law</h1>
            <p className='text-gray-600'>전 세계 법률 정보, 한 곳에서 쉽게</p>
          </div>

          {/* 구글 로그인 버튼만 표시 */}
          <Button
            onClick={handleClickGoogleLogin}
            size='lg'
            className='w-full flex items-center justify-center
              bg-black text-white hover:bg-black/90'
            aria-label='Google로 로그인'
            disabled={isLoading}
          >
            <GoogleIcon className='w-5 h-5 mr-3' />
            Google로 로그인
          </Button>

          <p className='text-xs text-gray-500 mt-6'>
            로그인하면 G.law의 모든 서비스를 이용할 수 있습니다
          </p>
        </div>
      </div>
    </div>
  );
};
