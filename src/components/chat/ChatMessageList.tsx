import type { RefObject } from 'react';
import { Bot, ExternalLink, RefreshCw, User } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { ChatMessage } from '@/types/chat';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/button/Button';
import { Badge } from '@/components/common/Badge';

type ChatMessageListProps = {
  messages: ChatMessage[];
  isLoading: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  onRetry: (messageId: number) => void;
};

export const ChatMessageList = ({
                                  messages,
                                  isLoading,
                                  messagesEndRef,
                                  onRetry,
                                }: ChatMessageListProps) => {
  return (
    <div className='flex-1 overflow-y-auto py-6 space-y-4'>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${
            message.type === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.type === 'bot' && (
            <div className='bg-brand-light rounded-full p-2 h-fit'>
              <Bot className='w-5 h-5 text-brand-primary' />
            </div>
          )}

          <div
            className='max-w-[80%]'
          >
            <Card
              className={`p-4 ${
                message.type === 'user'
                  ? 'bg-brand-primary text-white'
                  : 'bg-white'
              }`}
            >
              <p className='whitespace-pre-line leading-relaxed'>
                {message.content}
              </p>

              {message.relatedLaws && message.relatedLaws.length > 0 && (
                <div className='mt-4 pt-4 border-t border-border-base'>
                  <p className='text-sm text-text-secondary mb-2'>관련 법률:</p>
                  <div className='space-y-2'>
                    {message.relatedLaws.map((law) => (
                      <Link
                        key={law.id}
                        to={`/laws/${law.id}`}
                        className='flex items-center justify-between p-2 rounded bg-bg-soft hover:bg-border-base transition-colors'
                      >
                        <div className='flex items-center gap-2'>
                          <Badge variant='secondary' className='text-xs'>
                            {law.country}
                          </Badge>

                          <span className='text-sm'>{law.title}</span>
                        </div>
                        <ExternalLink className='w-4 h-4 text-text-tertiary' />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {message.type === 'bot' && (
              <div className='flex items-center gap-2 mt-2 ml-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => onRetry(message.id)}
                  aria-label="다른 답변 요청"
                  className="border-none text-black shadow-none hover:bg-gray-100"
                >
                  <RefreshCw className='w-3 h-3 mr-1' />
                  다른 답변
                </Button>
              </div>
            )}
          </div>

          {message.type === 'user' && (
            <div className='bg-border-base rounded-full p-2 h-fit'>
              <User className='w-5 h-5 text-text-secondary' />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <output className='flex gap-3' aria-live="polite" aria-label="답변 생성 중">
          <div className='bg-brand-light rounded-full p-2 h-fit'>
            <Bot className='w-5 h-5 text-brand-primary' />
          </div>
          <Card className='p-4'>
            <div className='flex gap-2'>
              <div className='w-2 h-2 bg-text-tertiary rounded-full animate-bounce' />
              <div className='w-2 h-2 bg-text-tertiary rounded-full animate-bounce' style={{ animationDelay: '100ms' }} />
              <div className='w-2 h-2 bg-text-tertiary rounded-full animate-bounce' style={{ animationDelay: '200ms' }} />
            </div>
          </Card>
        </output>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
