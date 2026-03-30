import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/input/Input';
import { DropdownSelect } from '@/components/common/dropdown/DropdownSelect';
import { Button } from '@/components/common/button/Button';
import { RiskResultModal } from '@/components/risk/RiskResultModal';

export const LawRiskPage = () => {
  const [stayCountry, setStayCountry] = useState('');
  const [stayPurpose, setStayPurpose] = useState('');
  const [visaType, setVisaType] = useState('');
  const [age, setAge] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleAnalysis = () => {
    if (!stayCountry || !stayPurpose || !visaType || !age) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-bg-soft font-sans">
      <Header activeNavId="law-risk" />

      <div className="flex h-[133px] w-full flex-col justify-center border-b border-border-subtle bg-white shadow-sm">
        <div className="px-6 py-6 sm:px-10 lg:px-8">
          <div className="flex items-center gap-3">
            <AlertTriangle
              className="h-8 w-8 text-brand-primary"
              strokeWidth={2}
            />
            <h1 className="text-[28px] font-medium leading-tight text-text-primary sm:text-[32px]">
              위험 지수
            </h1>
          </div>
          <p className="mt-1 text-sm font-normal text-text-secondary sm:text-base">
            체류 정보를 입력하시면 위험지수를 분석해드립니다
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="bg-white p-6">
          <div className="space-y-4">
            <DropdownSelect
              label="체류국가"
              value={stayCountry}
              onChange={(e) => setStayCountry(e.target.value)}
              className="bg-gray-50"
            >
              <option value="" disabled>
                체류국가를 선택하세요
              </option>
              <option value="미국">🇺🇸 미국</option>
              <option value="중국">🇨🇳 중국</option>
              <option value="일본">🇯🇵 일본</option>
              <option value="독일">🇩🇪 독일</option>
              <option value="영국">🇬🇧 영국</option>
              <option value="프랑스">🇫🇷 프랑스</option>
              <option value="베트남">🇻🇳 베트남</option>
              <option value="인도">🇮🇳 인도</option>
            </DropdownSelect>

            <DropdownSelect
              label="체류목적"
              value={stayPurpose}
              onChange={(e) => setStayPurpose(e.target.value)}
              className="bg-gray-50"
            >
              <option value="" disabled>
                체류목적을 선택하세요
              </option>
              <option value="취업">취업</option>
              <option value="유학">유학</option>
              <option value="사업">사업</option>
              <option value="가족동반">가족동반</option>
              <option value="관광">관광</option>
              <option value="연수">연수</option>
            </DropdownSelect>

            <DropdownSelect
              label="비자 종류"
              value={visaType}
              onChange={(e) => setVisaType(e.target.value)}
              className="bg-gray-50"
            >
              <option value="" disabled>
                비자 종류를 선택하세요
              </option>
              <option value="취업비자">취업비자</option>
              <option value="학생비자">학생비자</option>
              <option value="사업비자">사업비자</option>
              <option value="동반비자">동반비자</option>
              <option value="관광비자">관광비자</option>
              <option value="워킹홀리데이">워킹홀리데이</option>
            </DropdownSelect>

            <div>
              <label htmlFor="law-risk-age" className="mb-2 block text-sm">
                연령
              </label>
              <Input
                id="law-risk-age"
                type="number"
                placeholder="연령을 입력하세요"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <Button
              type="button"
              onClick={handleAnalysis}
              disabled={!stayCountry || !stayPurpose || !visaType || !age}
              className="w-full"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              위험 지수 분석하기
            </Button>
          </div>
        </Card>
      </div>

      {showResult ? (
        <RiskResultModal
          open={showResult}
          onClose={() => setShowResult(false)}
          stayCountry={stayCountry}
          stayPurpose={stayPurpose}
          visaType={visaType}
          age={age}
        />
      ) : null}
    </div>
  );
};
