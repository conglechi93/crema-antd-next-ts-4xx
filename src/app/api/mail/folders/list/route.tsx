import { NextRequest } from 'next/server';
import { MailObjType } from '@crema/types/models/apps/Mail';
import folderList from '@crema/fakedb/apps/mail/folderList';
import labelList from '@crema/fakedb/apps/mail/labelList';
import mailData from '@crema/fakedb/apps/mail/mailList';
let mailList = mailData;
export const GET = async (request: NextRequest) => {
  try {
    const params: any = Object.fromEntries(request.nextUrl.searchParams);
    let folderMailList: MailObjType[] = [];
    if (params.type === 'folder') {
      if (params.name === 'starred') {
        folderMailList = mailList.filter((mail: MailObjType) => mail.isStarred);
      } else {
        const folderId = folderList.find(
          (folder) => folder.alias === params.name,
        )?.id;
        folderMailList = mailList.filter(
          (mail) => mail.folderValue === folderId,
        );
      }
    } else if (params.type === 'label') {
      const labelType = labelList.find((label) => label.alias === params.name)
        ?.id;
      folderMailList = mailList.filter(
        (mail: MailObjType) => mail.label.id === labelType,
      );
    }
    const index = params.page * 15;
    // const count = folderMailList.length;
    const data =
      folderMailList.length > 15
        ? folderMailList.slice(index, index + 15)
        : folderMailList;
    return new Response(JSON.stringify({ data: data, count: data.length }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
