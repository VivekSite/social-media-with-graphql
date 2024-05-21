export type User = {
    id: string;
    name: string;
    email: string;
    profileImage: string;
  };
  
  export type Post = {
      _id: string,
      title: string,
      message: string,
      isDeleted: boolean,
      tags: string,
      imageUrl: string,
      __v: number,
      author: User,
  }