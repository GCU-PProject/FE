import { useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '@/types/chat';
import { requestChatAnswer } from '@/api/chat';
import { getChatCountryId } from '@/lib/chatCountryIds';
import { getChatSessionId } from '@/lib/chatSession';
import { usePreferredCountries } from '@/hooks/usePreferredCountries';

export const useChatbot = () => {
  const { preferredCountries } = usePreferredCountries();
  const sessionIdRef = useRef(getChatSessionId());
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

  const handleSend = async (message?: string) => {
    const messageToSend = message || inputValue;
    if (!messageToSend.trim() || isLoading) return;

    const nextId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;

    const userMessage: ChatMessage = {
      id: nextId,
      type: 'user',
      content: messageToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const data = await requestChatAnswer({
        query: messageToSend,
        country_id: getChatCountryId(preferredCountries[0]),
        session_id: sessionIdRef.current,
      });

      const botMessage: ChatMessage = {
        id: userMessage.id + 1,
        type: 'bot',
        content: data.result?.answer ?? '답변을 찾지 못했습니다.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'AI 답변을 불러오지 못했습니다.';

      const botMessage: ChatMessage = {
        id: userMessage.id + 1,
        type: 'bot',
        content: errorMessage,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleRetry = (messageId: number) => {
    const botMessageIndex = messages.findIndex((m) => m.id === messageId);
    const messageToRetry = messages
      .slice(0, botMessageIndex)
      .reverse()
      .find((m) => m.type === 'user');

    if (messageToRetry) {
      void handleSend(messageToRetry.content);
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
