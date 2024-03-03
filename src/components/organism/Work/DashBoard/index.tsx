import {memo, useState} from 'react';
import Board from 'react-trello';
import NewCardForm from '../NewCardForm';
import WorkModal from '../TaskModal';
import {ActionType} from 'shared/constants/AppVariables';
import NewLaneSection from '../NewLaneSection/inde';
import BoardCard from '../BoardCard';
import NewLaneForm from '../NewLaneForm';
import LaneHeader from '../LaneHeader';
import styles from './style.module.scss';
import useDashBoard from './useDashBoard';
import {useDispatch} from 'react-redux';
import {onChangeRankModeKanbanIndex} from 'redux/actions/Task';
import {message} from 'antd';
type PropsType = {
  projectCode: string | null;
};
const DashBoard = (props: PropsType) => {
  const {projectCode} = props;
  const dispatch = useDispatch();
  const {boardData, fetchTasksKanban} = useDashBoard(projectCode);
  const infoInitial = {
    type: ActionType.ADD,
    record: null,
    lanesInfo: null,
    action: () => {},
  };
  const [info, setInfo] = useState<any>(infoInitial);
  const [isOpenWorkModal, setIsOpenWorkModal] = useState(false);
  // const shouldReceiveNewData = (nextData) => {
  //   setBoardData(nextData);
  // };

  const onClickAddCard = (listId) => {
    setInfo({
      type: ActionType.ADD,
      record: null,
      lanesInfo: {
        workflowStatus: listId,
        projectCode: projectCode,
      },
      action: () => {
        fetchTasksKanban(projectCode);
        setInfo(infoInitial);
      },
    });
    setIsOpenWorkModal(true);
  };

  const handleDragCard = async (
    cardId: any,
    currentLaneId: number,
    targetLaneId: number,
    position: number,
  ) => {
    console.log('handleDragCard', currentLaneId, targetLaneId, position);
    const reqParams = {
      code: cardId,
      workflowStatus: targetLaneId,
      index: position,
    };
    const res: any = await dispatch(onChangeRankModeKanbanIndex(reqParams));
    message.open({
      type: res ? 'success' : 'error',
      content: res ? 'Cập nhật thành công!' : 'Cập nhật thất bại',
    });
    fetchTasksKanban(projectCode);
  };

  const [list, setList] = useState<any | null>(null);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const getCardById = (lane: any, cardId: number) =>
    lane.cards.find((item) => item.id === cardId);
  const onEditCardDetail = (cardId: number) => {
    const selectedList = boardData.lanes.find((item) => {
      const correctCard = item.cards.find((card) => card.id === cardId);
      if (correctCard) return item;
    });
    const selectedCard = getCardById(selectedList as any, cardId);
    setSelectedCard(selectedCard as any);
    setList(selectedList as any);
    const info = {
      type: ActionType.VIEW,
      record: selectedCard,
      action: () => {},
      lanesInfo: null,
    };
    setInfo(info);
    setIsOpenWorkModal(true);
  };

  return (
    <div>
      <Board
        className={styles.dashboard_work}
        editable
        data={boardData}
        // canAddLanes
        draggable
        // onDataChange={shouldReceiveNewData}
        onCardAdd={(card, laneId) => {
          console.log('onCardAdd', card, laneId);
          // onClickAddCard(laneId);
        }}
        // onCardAdd={(_: CardObjType, laneId: number) => {
        //   onClickAddCard(laneId);
        // }}
        onLaneUpdate={(laneId: number, data: any) => {
          console.log('onLaneUpdate', laneId, data);
        }}
        handleDragEnd={handleDragCard}
        t={(listId) => onClickAddCard(listId)}
        onCardClick={(cardId: number, e: any) => {
          onEditCardDetail(cardId);
        }}
        components={{
          Card: BoardCard,
          LaneHeader: LaneHeader,
          AddCardLink: NewCardForm,
          NewCardForm: WorkModal,
          NewLaneForm: NewLaneForm,
          NewLaneSection: NewLaneSection,
        }}
      />
      {isOpenWorkModal && (
        <WorkModal
          info={info}
          isOpen={isOpenWorkModal}
          setIsOpen={setIsOpenWorkModal}
        />
      )}
    </div>
  );
};

export default memo(DashBoard);
