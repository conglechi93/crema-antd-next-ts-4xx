import { photos } from '@crema/fakedb';

export const GET = async () => {
  try {
    return new Response(JSON.stringify(photos), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
