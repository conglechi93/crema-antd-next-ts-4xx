import boardList from '@crema/fakedb/apps/scrumboard/boardList';
import { NextRequest } from 'next/server';
import {
  BoardObjType,
  CardListObjType,
  CardObjType,
} from '@crema/types/models/apps/ScrumbBoard';

let boardData = boardList;

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { board, list, card } = reqBody;
    const selectedBoard: BoardObjType = boardData.find(
      (data) => data.id === board.id,
    )!;
    const selectedList: CardListObjType = selectedBoard.list.find(
      (data) => data.id === list.id,
    )!;
    selectedList.cards = selectedList.cards.concat(card);
    selectedBoard.list = selectedBoard.list.map((data) =>
      data.id === selectedList.id ? selectedList : data,
    );
    boardData = boardData.map((data) =>
      data.id === selectedBoard.id ? selectedBoard : data,
    );
    return new Response(JSON.stringify(selectedBoard), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { board, list, card } = reqBody;
    const selectedBoard: BoardObjType = boardData.find(
      (data) => data.id === board.id,
    )!;
    const selectedList: CardListObjType = selectedBoard.list.find(
      (data) => data.id === list.id,
    )!;
    selectedList.cards = selectedList.cards.map((data: CardObjType) =>
      data.id === card.id ? card : data,
    );
    selectedBoard.list = selectedBoard.list.map((data) =>
      data.id === selectedList.id ? selectedList : data,
    );
    boardData = boardData.map((data) =>
      data.id === selectedBoard.id ? selectedBoard : data,
    );
    return new Response(JSON.stringify(selectedBoard), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};
