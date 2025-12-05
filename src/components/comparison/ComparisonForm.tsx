import type { CountryOption } from '@/types/comparison';
import { GitCompare } from 'lucide-react';
import { Card } from '@/components/common/card';
import { Input } from '@/components/common/input/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/common/button/button';

export type ComparisonFormProps = {
  topic: string;
  country1: string;
  country2: string;
  countries: CountryOption[];
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
                                 countries,
                                 isLoading,
                                 onChangeTopic,
                                 onChangeCountry1,
                                 onChangeCountry2,
                                 onSubmit,
                               }: ComparisonFormProps) => (
  <Card className='mb-8 p-6'>
    <div className='space-y-4'>
      <div>
        <label className='mb-2 block text-sm'>비교 주제</label>
        <Input
          placeholder='예: 음주운전 처벌, 근로시간 제한, 마약 처벌 등'
          value={topic}
          onChange={(e) => onChangeTopic(e.target.value)}
        />
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <label className='mb-2 block text-sm'>첫 번째 국가</label>
          <Select
            value={country1}
            onValueChange={onChangeCountry1}
          >
            <SelectTrigger>
              <SelectValue placeholder='국가 선택' />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem
                  key={country.code}
                  value={country.code}
                >
                  {country.flag} {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className='mb-2 block text-sm'>두 번째 국가</label>
          <Select
            value={country2}
            onValueChange={onChangeCountry2}
          >
            <SelectTrigger>
              <SelectValue placeholder='국가 선택' />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem
                  key={country.code}
                  value={country.code}
                >
                  {country.flag} {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={onSubmit}
        disabled={isLoading || !topic || !country1 || !country2}
        className='w-full'
      >
        <GitCompare className='mr-2 h-4 w-4' />
        {isLoading ? '분석 중...' : '법률 비교하기'}
      </Button>
    </div>
  </Card>
);
