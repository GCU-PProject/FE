export type MessageAuthor = 'user' | 'bot';

export type RelatedLaw = {
  id: number;
  title: string;
  country: string;
};

export type ChatMessage = {
  id: number;
  type: MessageAuthor;
  content: string;
  relatedLaws?: RelatedLaw[];
  timestamp: Date;
};
