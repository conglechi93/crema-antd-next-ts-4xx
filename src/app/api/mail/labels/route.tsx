import labelList from '@crema/fakedb/apps/mail/labelList';
import mailData from '@crema/fakedb/apps/mail/mailList';
import { NextRequest } from 'next/server';
import { MailObjType } from '@crema/types/models/apps/Mail';
let mailList = mailData;
export const GET = async () => {
  try {
    return new Response(JSON.stringify(labelList), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { mailIds, type } = reqBody;
    mailList = mailList.map((mail) => {
      if (mailIds.includes(mail.id)) {
        mail.label = type;
        return mail;
      }
      return mail;
    });
    const updatedMails = mailList.filter((mail: MailObjType) =>
      mailIds.includes(mail.id),
    );
    return new Response(JSON.stringify(updatedMails), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
