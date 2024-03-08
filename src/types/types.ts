export interface IMessage {
  id: string;
  text: string;
  username: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
