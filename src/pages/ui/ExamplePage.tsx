import { Button } from '@/components/common/button/Button';

export default function ExamplePage() {
  return (
    <div className="flex flex-col gap-3 p-6">
      <Button>기본 버튼</Button>
      <Button variant="outline">아웃라인</Button>
      <Button variant="destructive">위험</Button>
      <Button size="sm">작은</Button>
      <Button size="lg">큰</Button>
      <Button variant="link">링크 버튼</Button>
    </div>
  );
}
