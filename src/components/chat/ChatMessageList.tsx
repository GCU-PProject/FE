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
            <div className='bg-blue-100 rounded-full p-2 h-fit'>
              <Bot className='w-5 h-5 text-blue-600' />
            </div>
          )}

          <div
            className={`max-w-[80%] ${
              message.type === 'user' ? 'order-first' : ''
            }`}
          >
            <Card
              className={`p-4 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white'
              }`}
            >
              <p className='whitespace-pre-line leading-relaxed'>
                {message.content}
              </p>

              {message.relatedLaws && message.relatedLaws.length > 0 && (
                <div className='mt-4 pt-4 border-t border-gray-200'>
                  <p className='text-sm text-gray-600 mb-2'>관련 법률:</p>
                  <div className='space-y-2'>
                    {message.relatedLaws.map((law) => (
                      <Link
                        key={law.id}
                        to={`/laws/${law.id}`}
                        className='flex items-center justify-between p-2 rounded bg-gray-50 hover:bg-gray-100 transition-colors'
                      >
                        <div className='flex items-center gap-2'>
                          <Badge variant='secondary' className='text-xs'>
                            {law.country}
                          </Badge>

                          <span className='text-sm'>{law.title}</span>
                        </div>
                        <ExternalLink className='w-4 h-4 text-gray-400' />
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
                  className="border-none text-black shadow-none hover:bg-gray-100"
                >
                  <RefreshCw className='w-3 h-3 mr-1' />
                  다른 답변
                </Button>
              </div>
            )}
          </div>

          {message.type === 'user' && (
            <div className='bg-gray-200 rounded-full p-2 h-fit'>
              <User className='w-5 h-5 text-gray-600' />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className='flex gap-3'>
          <div className='bg-blue-100 rounded-full p-2 h-fit'>
            <Bot className='w-5 h-5 text-blue-600' />
          </div>
          <Card className='p-4'>
            <div className='flex gap-2'>
              <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce' />
              <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100' />
              <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200' />
            </div>
          </Card>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};
