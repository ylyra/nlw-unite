export type EventBadge = {
  name: string;
  email: string;
  eventTitle: string;
  checkInUrl: string;
};

export type EventBadgeWithImage = EventBadge & {
  code: number;
  image?: string;
};
