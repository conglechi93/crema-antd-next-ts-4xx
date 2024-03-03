import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onGetTasksKanban} from 'redux/actions/Task';
import {pageSize} from 'shared/constants/AppConst';

const useDashBoard = (projectCode: string | null) => {
  const dispatch = useDispatch();
  const boardDataInitial = {
    lanes: [],
  };
  const [boardData, setBoardData] = useState<any>(boardDataInitial);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    pageSize: pageSize.DEFAULT,
    projectCode: projectCode,
  });
  const fetchTasksKanban = async (projectCode: string | null) => {
    if (!projectCode) {
      setBoardData(boardDataInitial);
      return;
    }
    const newSearchParams = {
      ...searchParams,
      projectCode: projectCode,
    };
    const res: any = (await dispatch(onGetTasksKanban(newSearchParams))) ?? [];
    if (!res) {
      setBoardData(boardDataInitial);
      return;
    }
    const lanes: Array<any> = [];
    res?.map((item: any) => {
      let lane: any = {};
      const id = item?.workflowStatus?.code;
      const title = item?.workflowStatus?.name;
      const cards: Array<any> = [];
      const cardsItem: Array<any> = item?.cards ?? [];
      cardsItem?.map((card: any) => {
        cards.push({
          ...card,
          id: card?.code,
          title: card?.name,
          description: card?.description,
        });
      });
      lane = {
        id,
        title,
        cards,
      };
      lanes.push(lane);
    });
    const data = {
      lanes: lanes,
    };
    setBoardData(data);
  };
  useEffect(() => {
    fetchTasksKanban(projectCode);
  }, [projectCode]);
  return {boardData, setBoardData, fetchTasksKanban};
};

export default useDashBoard;
