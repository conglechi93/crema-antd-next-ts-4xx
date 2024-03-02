import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import {
  StyledMessageScreen,
  StyledMsgAppsFooter,
  StyledMsgScreenScrollbar,
  StyledNoMsg,
  StyledScrollChatNoMain,
} from '../index.styled';
import { postDataApi, putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import {
  ConnectionObjType,
  MessageDataObjType,
  MessageObjType,
  MessageType,
} from '@crema/types/models/apps/Chat';
import AddNewMessage from '../MessagesScreen/AddNewMessage';
import MessagesList from '../MessagesScreen/MessagesList';
import Header from '../MessagesScreen/Header';

type MessagesScreenProps = {
  selectedUser: ConnectionObjType | null;
  setConnectionData: (data: ConnectionObjType[]) => void;
  setSelectedUser: (data: ConnectionObjType | null) => void;
};

type RefProps = {
  getScrollElement: () => {
    scrollTop: number;
    scrollHeight: number;
  };
};

type ChatProps = {
  userMessages: MessageObjType;
  connectionData: ConnectionObjType[];
};
const MessagesScreen: React.FC<MessagesScreenProps> = ({
  selectedUser,
  setConnectionData,
  setSelectedUser,
}) => {
  const [message, setMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const infoViewActionsContext = useInfoViewActionsContext();

  const [selectedMessage, setSelectedMessage] =
    useState<MessageDataObjType | null>(null);

  const [{ apiData: userMessages }, { setQueryParams, setData }] =
    useGetDataApi<MessageObjType>('chat');

  const { user } = useAuthUser();

  const _scrollBarRef = useRef<RefProps | null>(null);
  useEffect(() => {
    if (setQueryParams) setQueryParams({ id: selectedUser?.channelId });
  }, [selectedUser?.channelId]);

  useEffect(() => {
    if (userMessages?.messageData?.length > 0) {
      if (_scrollBarRef?.current) {
        const scrollEl = _scrollBarRef.current.getScrollElement();
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    }
  }, [userMessages, _scrollBarRef]);

  const sendFileMessage = (fileMessage: MessageDataObjType) => {
    const data = {
      ...fileMessage,
      sender: user.id,
      time: dayjs().format('llll'),
    };
    postDataApi<ChatProps>('chat', infoViewActionsContext, {
      channelId: selectedUser?.channelId,
      message: data,
    })
      .then((data) => {
        setData(data?.userMessages);
        setConnectionData(data?.connectionData);
        infoViewActionsContext.showMessage('Message Added Successfully!');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const onSend = (message: string) => {
    const data = {
      ...selectedMessage,
      message,
      message_type: MessageType.TEXT,
      sender: user.id,
      time: dayjs().format('llll'),
    };

    if (isEdit) {
      data.edited = true;
      putDataApi<ChatProps>('chat', infoViewActionsContext, {
        channelId: selectedUser?.channelId,
        message: data,
      })
        .then((data) => {
          setData(data?.userMessages);
          setConnectionData(data?.connectionData);
          infoViewActionsContext.showMessage('Message Edited Successfully!');
        })
        .catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });

      setMessage('');
      setIsEdit(false);
      setSelectedMessage(null);
    } else {
      postDataApi<ChatProps>('chat', infoViewActionsContext, {
        channelId: selectedUser?.channelId,
        message: data,
      })
        .then((data) => {
          setData(data?.userMessages);
          setConnectionData(data?.connectionData);
          infoViewActionsContext.showMessage('Message Added Successfully!');
        })
        .catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
      setMessage('');
    }
  };

  const onChangeStarred = (checked: boolean) => {
    setIsChecked(checked);
  };

  const onClickEditMessage = (data: MessageDataObjType) => {
    if (data.message_type === MessageType.TEXT) {
      setIsEdit(true);
      setMessage(data.message!);
      setSelectedMessage(data);
    }
  };

  const deleteMessage = (messageId: number) => {
    postDataApi<ChatProps>('chat/deleteMessage', infoViewActionsContext, {
      channelId: selectedUser?.channelId,
      messageId,
    })
      .then((data) => {
        setData(data?.userMessages);
        setConnectionData(data?.connectionData);
        infoViewActionsContext.showMessage('Message Deleted Successfully!');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const deleteConversation = () => {
    postDataApi<ConnectionObjType[]>(
      'chat/deleteUserMessages',
      infoViewActionsContext,
      {
        channelId: selectedUser?.channelId,
      },
    )
      .then((data) => {
        setSelectedUser(null);
        setConnectionData(data);
        infoViewActionsContext.showMessage('Chat Deleted Successfully!');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };
  const clearChatHistory = () => {
    postDataApi<ChatProps>('chat/clearChat', infoViewActionsContext, {
      channelId: selectedUser?.channelId,
    })
      .then((data) => {
        setData(data?.userMessages);
        setConnectionData(data?.connectionData);
        infoViewActionsContext.showMessage('Chat Cleared Successfully!');
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <StyledMessageScreen>
      <AppsHeader>
        <Header
          isChecked={isChecked}
          onChangeStarred={onChangeStarred}
          selectedUser={selectedUser as ConnectionObjType}
          deleteConversation={deleteConversation}
          clearChatHistory={clearChatHistory}
        />
      </AppsHeader>

      {userMessages && user ? (
        <StyledMsgScreenScrollbar ref={_scrollBarRef as any}>
          <MessagesList
            userMessages={userMessages}
            authUser={user}
            selectedUser={selectedUser as ConnectionObjType}
            onClickEditMessage={onClickEditMessage}
            deleteMessage={deleteMessage}
          />
        </StyledMsgScreenScrollbar>
      ) : (
        <StyledScrollChatNoMain>
          <StyledNoMsg>
            <IntlMessages id='chatApp.sayHi' /> {selectedUser?.name}
          </StyledNoMsg>
        </StyledScrollChatNoMain>
      )}

      <StyledMsgAppsFooter>
        <AddNewMessage
          currentMessage={message}
          sendFileMessage={sendFileMessage}
          onSendMessage={onSend}
        />
      </StyledMsgAppsFooter>
    </StyledMessageScreen>
  );
};

export default MessagesScreen;
