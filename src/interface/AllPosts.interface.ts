export interface Posts {
  singelDetails: any;
  _id: string;
  body: string;
  image: string;
  privacy: string;
  user: User;
  sharedPost: any;
  likes: any[];
  createdAt: string;
  commentsCount: number;
  topComment: any;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
  Comments: any;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface Comment {
  _id: string;
  content: string;
  commentCreator: CommentCreator;
}

export interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}
export interface ICreatePost {
  body: string;
}
