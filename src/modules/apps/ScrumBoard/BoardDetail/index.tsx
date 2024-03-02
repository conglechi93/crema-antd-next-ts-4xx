import React, { useEffect } from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import BoardDetailView from './BoardDetailView';
import { useParams, useRouter } from 'next/navigation';
import { StyledScrumBoardDetailTitle } from './index.styled';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import type { BoardObjType } from '@crema/types/models/apps/ScrumbBoard';

const BoardDetail = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [{ apiData: boardDetail }, { setData, setQueryParams }] =
    useGetDataApi<BoardObjType>('scrumboard', undefined, { id: id }, false);

  useEffect(() => {
    setQueryParams({ id });
    return () => {
      setQueryParams({});
    };
  }, [id]);

  const onGoToBoardList = () => {
    router.back();
  };

  if (!boardDetail) {
    return null;
  }

  return (
    <AppsContainer
      fullView
      noContentAnimation
      title={
        <>
          <StyledScrumBoardDetailTitle onClick={onGoToBoardList}>
            Scrum Board
          </StyledScrumBoardDetailTitle>
          &gt; {boardDetail?.name}
        </>
      }
    >
      <BoardDetailView boardDetail={boardDetail} setData={setData} />
    </AppsContainer>
  );
};

export default BoardDetail;
