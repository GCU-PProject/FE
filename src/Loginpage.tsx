import { useState } from 'react';
import { Scale } from 'lucide-react';
import { Button } from '@/components/common/button/Button';

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
            {/* Google G 아이콘 */}
            <svg
              className='w-5 h-5 mr-3'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26
                  1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74
                  3.28-8.09z'
                fill='#4285F4'
              />
              <path
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23
                  1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99
                  20.53 7.7 23 12 23z'
                fill='#34A853'
              />
              <path
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43
                  8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                fill='#FBBC05'
              />
              <path
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09
                  14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6
                  3.3-4.53 6.16-4.53z'
                fill='#EA4335'
              />
            </svg>
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
