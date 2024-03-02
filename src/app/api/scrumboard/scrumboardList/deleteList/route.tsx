import boardList from '@crema/fakedb/apps/scrumboard/boardList';
import { NextRequest } from 'next/server';
import { BoardObjType } from '@crema/types/models/apps/ScrumbBoard';

let boardData = boardList;

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { boardId, listId } = reqBody;
    const selectedBoard: BoardObjType = boardData.find(
      (data) => data.id === boardId,
    )!;
    selectedBoard.list = selectedBoard.list.filter(
      (item) => item.id !== listId,
    );
    boardData = boardData.map((data) =>
      data.id === selectedBoard.id ? selectedBoard : data,
    );
    return new Response(JSON.stringify(selectedBoard), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
