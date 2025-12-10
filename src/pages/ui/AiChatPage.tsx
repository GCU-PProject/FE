import { Globe, MessageSquare, Send } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useChatbot } from '@/hooks/useChatbot';
import { ChatMessageList } from '@/components/chat/ChatMessageList';
import { Input } from '@/components/common/input/Input';
import { Button } from '@/components/common/button/Button';

export const AiChatPage = () => {
  const {
    messages,
    inputValue,
    isLoading,
    messagesEndRef,
    suggestedQuestions,
    setInputValue,
    handleSend,
    handleKeyPress,
    handleRetry,
  } = useChatbot();

  return (
    <div className="min-h-screen bg-surface font-sans">
      {/* 공통 상단 헤더 */}
      <Header activeNavId="ai-consulting" />

      <div className="flex h-[calc(100vh-4rem)] flex-col bg-gray-50">
        {/* 페이지 내부 타이틀 영역 */}
        <div className="border-b border-gray-200 bg-white h-[133px] flex flex-col justify-center">
          <div className="px-4 py-6 sm:px-10 lg:px-8">

            <div className="flex items-center gap-3">
            <MessageSquare className="w-7 h-7 text-brand-primary" strokeWidth={2} />
            <h1 className="text-[28px] font-medium leading-tight text-text-primary sm:text-[32px]">
              AI 법률 상담
            </h1>
            </div>
            <p className="text-sm text-secondary sm:text-base">
              법률 정보를 자연어로 질문하고 답변받으세요
            </p>
          </div>
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-hidden">
          <div className="mx-auto flex h-full max-w-4xl flex-col px-4 sm:px-6 lg:px-8">
            {/* 메시지 리스트 */}
            <ChatMessageList
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
              onRetry={handleRetry}
            />

            {/* 추천 질문 (처음 1개 메세지일 때만) */}
            {messages.length === 1 && (
              <div className="pb-4">
                <p className="mb-3 text-xs font-medium text-text-tertiary">
                  추천 질문
                </p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      onClick={() => setInputValue(question)}
                      className="rounded-xl border border-border-soft bg-surface px-4 py-3 text-left text-sm text-text-secondary
                                 shadow-[0_1px_0_rgba(15,23,42,0.02)] transition
                                 hover:border-brand-primary hover:bg-brand-soft hover:text-brand-primary"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 입력창 */}
            <div className="bg-gray-50 py-4">
              <div className="flex gap-2">
                <Input
                  placeholder="법률 관련 질문을 입력하세요..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading}
                />
                <Button
                  onClick={() => void handleSend()}
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                * G.law AI 답변은 참고용이며, 정확한 법률 자문은 전문가와 상담하세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChatPage;
