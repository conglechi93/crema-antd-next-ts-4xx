import { postsList } from '@crema/fakedb/apps/wall';
import { NextRequest } from 'next/server';

let posts = postsList;

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { postId, comment } = reqBody;

    const post: any = posts.find((item) => item.id === postId);
    const newComment = [
      {
        id: Math.floor(Math.random() * 10000),
        date: new Date().toString(),
        liked: false,
        ...comment,
      },
    ];
    post.comments = post?.comments?.concat(newComment);

    posts = posts.map((item) => (item.id === post.id ? post : item));
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
