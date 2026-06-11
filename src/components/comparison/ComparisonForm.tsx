import type { CountryOption } from '@/types/comparison';
import { GitCompare } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { Input } from '@/components/common/input/Input';
import { DropdownSelect } from '@/components/common/dropdown/DropdownSelect';
import { Button } from '@/components/common/button/Button';

export type ComparisonFormProps = {
  topic: string;
  country1: string;
  country2: string;
  comparisonCountries: CountryOption[];
  isLoading: boolean;
  onChangeTopic: (value: string) => void;
  onChangeCountry1: (value: string) => void;
  onChangeCountry2: (value: string) => void;
  onSubmit: () => void;
};

export const ComparisonForm = ({
                                 topic,
                                 country1,
                                 country2,
                                 comparisonCountries,
                                 isLoading,
                                 onChangeTopic,
                                 onChangeCountry1,
                                 onChangeCountry2,
                                 onSubmit,
                               }: ComparisonFormProps) => (
  <Card className="mb-8 bg-white p-6">
    <div className="space-y-4">
      {/* 비교 주제 입력 */}
      <div>
                <label htmlFor="comparison-topic" className="mb-2 block text-sm">
                  비교 주제
                </label>
                <Input
                  id="comparison-topic"
          placeholder="예: 음주운전 처벌, 근로시간 제한, 마약 처벌 등"
          value={topic}
          onChange={(e) => onChangeTopic(e.target.value)}
        />
      </div>

      {/* 국가 선택 드롭다운 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 첫 번째 국가 */}
        <DropdownSelect
          label="첫 번째 국가"
          value={country1}
          onChange={(e) => onChangeCountry1(e.target.value)}
          className="bg-gray-50"
        >
          {/* placeholder 역할 옵션 */}
          <option value="" disabled>
            국가 선택
          </option>
          {comparisonCountries.map((country) => (
            <option key={country.code} value={country.code}>
              {/* 코드 대신 국기 + 이름 (실패)*/}
              {country.flag ?? ''} {country.name}
            </option>
          ))}
        </DropdownSelect>

        {/* 두 번째 국가 */}
        <DropdownSelect
          label="두 번째 국가"
          value={country2}
          onChange={(e) => onChangeCountry2(e.target.value)}
          className="bg-gray-50"
        >
          <option value="" disabled>
            국가 선택
          </option>
          {comparisonCountries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.flag ?? ''} {country.name}
            </option>
          ))}
        </DropdownSelect>
      </div>

      {/* 제출 버튼 */}
      <Button
        onClick={onSubmit}
        disabled={isLoading || !topic.trim() || !country1 || !country2}
        className="w-full"
      >
        <GitCompare className="mr-2 h-4 w-4" />
        {isLoading ? '분석 중...' : '법률 비교하기'}
      </Button>
    </div>
  </Card>
);
