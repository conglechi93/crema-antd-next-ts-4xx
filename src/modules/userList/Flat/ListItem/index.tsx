import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import UserSocialMediaInfo from './UserSocialMediaInfo';
import {
  StyledUserFlatListItem,
  StyledUserFlatListItemContent,
  StyledUserFlatListItemInner,
  StyledUserFlatListItemPara,
  StyledUserFlatListItemThumb,
} from '../index.styled';
import { UserList } from '@crema/types/models/Apps';
import Image from 'next/image';

type ListItemProps = {
  user: UserList;
};

const ListItem: React.FC<ListItemProps> = ({ user }) => {
  return (
    <StyledUserFlatListItem>
      <StyledUserFlatListItemInner>
        <StyledUserFlatListItemThumb>
          <Image src={`${user.image}`} alt='user' width={130} height={130} />
        </StyledUserFlatListItemThumb>

        <StyledUserFlatListItemContent>
          <h3>
            <span>{user.name}</span>
            <span>
              <IntlMessages id='common.in' />
            </span>
            <span className='user-des'>{user.topic}</span>
          </h3>

          <StyledUserFlatListItemPara>
            {user.information}
          </StyledUserFlatListItemPara>

          <UserSocialMediaInfo user={user} />
        </StyledUserFlatListItemContent>
      </StyledUserFlatListItemInner>
    </StyledUserFlatListItem>
  );
};

export default ListItem;
