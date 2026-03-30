import type { ReactNode } from 'react';

/** 정규식 이스케이프 + React 노드 반환으로 regex injection·XSS를 피합니다. */
export const highlightText = (
  text: string,
  highlights: string[],
): ReactNode => {
  const escaped = highlights
    .filter(Boolean)
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  if (escaped.length === 0) return text;

  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');

  return text.split(regex).map((part, index) =>
    escaped.some((h) => new RegExp(`^${h}$`, 'i').test(part)) ? (
      <mark key={index} className="bg-yellow-200 px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    ),
  );
};
