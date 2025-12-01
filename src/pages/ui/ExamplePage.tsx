import { Header } from '@/components/layout/Header';

// 헤더/입력 샘플 UI 페이지
export const ExamplePage = () => {
  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <Header
        onNavSelect={(id) => {
          console.log('navigate to', id);
        }}
      />
    </div>
  );
};
