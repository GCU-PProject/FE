import { useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '@/types/chat';

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      content:
        '안녕하세요! G.law AI 챗봇입니다. 전 세계 법률 정보를 안내해드립니다. 궁금하신 법률 정보를 질문해주세요.',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedQuestions: string[] = [
    '미국의 음주운전 처벌 기준은?',
    '일본에서 오버스테이 시 처벌은?',
    '독일의 근로시간 제한은?',
    '싱가포르의 마약 관련 법률은?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;

    const nextId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;
    
    const userMessage: ChatMessage = {
      id: nextId,
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // TODO: 실제 API 연동 자리 (지금은 mock 응답 유지)
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: userMessage.id + 1,
        type: 'bot',
        content:
          '미국의 음주운전 관련 법률에 대해 답변드리겠습니다.\n\n' +
          '미국에서는 혈중알코올농도(BAC) 0.08% 이상인 상태에서 운전하는 것이 불법입니다. ' +
          '초범의 경우 최대 $2,000의 벌금과 6개월 이하의 면허정지 처분을 받을 수 있습니다.\n\n' +
          '재범 시에는 최대 $5,000의 벌금과 1년 이하의 면허취소가 적용되며, 3회 이상 적발될 경우 중범죄로 간주되어 형사처벌 대상이 됩니다.\n\n' +
          '또한 21세 미만의 경우 "Zero Tolerance" 정책이 적용되어 0.02% 이상만 되어도 처벌받을 수 있습니다.',
        relatedLaws: [
          { id: 1, title: '도로교통법 (Traffic Law)', country: '미국' },
        ],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleRetry = (messageId: number) => {
    const messageToRetry = messages.find((m) => m.id === messageId - 1);
    if (messageToRetry && messageToRetry.type === 'user') {
      setInputValue(messageToRetry.content);
    }
  };

  return {
    messages,
    inputValue,
    isLoading,
    messagesEndRef,
    suggestedQuestions,
    setInputValue,
    handleSend,
    handleKeyPress,
    handleRetry,
  };
};
