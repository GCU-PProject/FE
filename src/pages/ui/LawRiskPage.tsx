import { AlertTriangle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { LegalRiskPanel } from '@/components/risk/LegalRiskPanel';

export const LawRiskPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header activeNavId="law-risk" />

      <div className="border-b border-gray-200 bg-white">
        <div className="px-6 py-10 sm:px-8">
          <div className="flex items-center gap-4">
            <AlertTriangle
              className="h-9 w-9 text-brand-primary"
              strokeWidth={2}
            />
            <h1 className="text-[32px] font-medium leading-tight text-text-primary sm:text-[36px]">
              위험 지수
            </h1>
          </div>
          <p className="mt-1 text-base text-text-secondary">
            체류 정보를 입력하시면 위험지수를 분석해드립니다
          </p>
        </div>
      </div>

      <main className="px-4 py-9 sm:px-6 lg:px-8">
        <LegalRiskPanel />
      </main>
    </div>
  );
};

export default LawRiskPage;
