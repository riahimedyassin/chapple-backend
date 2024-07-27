type SentTo = {
  email: string;
  username: string;
};

export class GetFriendRequestDto {
  constructor(
    public readonly sent_at: Date,
    public readonly sent_by: SentTo,
    public readonly id: number,
  ) {}
}
