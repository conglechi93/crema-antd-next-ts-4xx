import mailData from '@crema/fakedb/apps/mail/mailList';
import { NextRequest } from 'next/server';

let mailList = mailData;
export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const { mail } = reqBody;
    mailList = [mail, ...mailList];
    return new Response(JSON.stringify(mailList), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
