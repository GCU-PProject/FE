import { Send } from 'lucide-react';
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
    <div className='min-h-screen bg-surface font-sans'>
      {/* 공통 상단 헤더 */}
      <Header activeNavId='ai-consulting' />

      <div className='h-[calc(100vh-4rem)] flex flex-col bg-gray-50'>
        {/* 페이지 내부 타이틀 영역 */}
        <div className='bg-white border-b border-gray-200'>
          <div className='max-w-4xl mx-auto px-2 sm:px-4 lg:px-6 py-6'>
            <h1 className='text-3xl mb-2'>AI 법률 상담</h1>
            <p className='text-gray-600'>
              법률 정보를 자연어로 질문하고 답변받으세요
            </p>
          </div>
        </div>

        {/* 본문 */}
        <div className='flex-1 overflow-hidden'>
          <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col'>
            {/* 메세지 리스트 */}
            <ChatMessageList
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
              onRetry={handleRetry}
            />

            {/* 추천 질문 (처음 1개 메세지일 때만) */}
            {messages.length === 1 && (
              <div className='pb-4'>
                <p className='text-sm text-gray-600 mb-3'>추천 질문:</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant='outline'
                      onClick={() => setInputValue(question)}
                      className='text-left justify-start h-auto py-3 px-4 whitespace-normal'
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* 입력창 */}
            <div className='py-4 bg-gray-50'>
              <div className='flex gap-2'>
                <Input
                  placeholder='법률 관련 질문을 입력하세요...'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                />
                <Button
                  onClick={() => void handleSend()}
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>

              </div>
              <p className='text-xs text-gray-500 mt-2'>
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
