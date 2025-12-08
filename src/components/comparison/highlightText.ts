export const highlightText = (text: string, highlights: string[]): string => {
  let highlighted = text;

  highlights.forEach((h) => {
    const regex = new RegExp(`(${h})`, 'gi');
    highlighted = highlighted.replace(
      regex,
      '<mark class="bg-yellow-200 px-1 rounded">$1</mark>',
    );
  });

  return highlighted;
};
