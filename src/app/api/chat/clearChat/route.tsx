import connectionList from '@crema/fakedb/apps/chat/connectionList';
import chatList from '@crema/fakedb/apps/chat/chatList';
import { NextRequest } from 'next/server';

let connectionData = connectionList;
let chatData = chatList;

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { channelId } = reqBody;
    let user = connectionData.find(
      (connection) => connection.channelId === channelId,
    );
    if (user) user = { ...user, lastMessage: null };

    connectionData = connectionData.map((item) =>
      item.channelId === user?.channelId ? user : item,
    );
    return new Response(JSON.stringify({ connectionData, userMessages: [] }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
