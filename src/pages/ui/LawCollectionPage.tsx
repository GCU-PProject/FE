import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Modal } from '@/components/common/Modal';
import { Button } from '@/components/common/button/Button';
import { Badge } from '@/components/common/Badge';

export function LawCollectionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface font-sans">
      <Header />

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-text-primary">
              모달 예시 &gt;&gt;
            </h1>
          </div>
          <Button
            variant="outline"
            className="rounded-full px-4 text-sm"
            onClick={() => setIsModalOpen(true)}
          >
            모달 열기
          </Button>
        </div>
      </main>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="모달 제목 예시"
        description="설명 텍스트 영역(업데이트 날짜)"
        widthClass="max-w-3xl"
        footer={
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Button
              variant="outline"
              className="h-11 rounded-xl border-border-base text-text-secondary w-full"
              onClick={() => setIsModalOpen(false)}
            >
              취소
            </Button>
            <Button
              className="h-11 rounded-xl bg-state-selected-black text-white hover:brightness-95 w-full"
              onClick={() => setIsModalOpen(false)}
            >
              확인
            </Button>
          </div>
        }
      >
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="tag">태그 1</Badge>
          <Badge variant="outline">태그 2</Badge>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-border-base/80 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-text-primary">
              블록 제목 예시 1
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-body">
              모달 본문 예시 1
            </p>
          </div>
          <div className="rounded-2xl border border-border-base/80 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-text-primary">
              블록 제목 예시 2
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-body">
              모달 본문 예시 2
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LawCollectionPage;
