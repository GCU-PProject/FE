export const highlightText = (text: string, highlights: string[]): React.ReactNode => {
    // 정규식 특수문자 이스케이프
      const escapedHighlights = highlights.map((h) =>
       h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
     );

     // 모든 하이라이트를 OR로 연결한 정규식 생성
       const pattern = escapedHighlights.join('|');
    if (!pattern) return text;

      const regex = new RegExp(`(${pattern})`, 'gi');
   const parts = text.split(regex);

      return parts.map((part, index) => {
        // 매칭된 부분인지 확인
          const isHighlight = escapedHighlights.some((h) =>
            new RegExp(`^${h}$`, 'i').test(part)
          );

         if (isHighlight) {
            return (
                <mark key={index} className="bg-yellow-200 px-1 rounded">
                  {part}
                </mark>
              );
          }
        return part;
      });
  };
