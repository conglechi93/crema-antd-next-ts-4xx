'use client';
import React from 'react';
import ListItem from './ListItem';

import AppList from '@crema/components/AppList';
import AppInfoView from '@crema/components/AppInfoView';
import { StyledUserStandard } from './index.styled';
import { useGetDataApi } from '@crema/hooks/APIHooks';

const Standard = () => {
  const [{ apiData: usersList }] = useGetDataApi('userList', []);

  return (
    <StyledUserStandard>
      {usersList ? (
        <AppList
          interval={120}
          data={usersList}
          renderItem={(user) => {
            return <ListItem user={user} key={user.id} />;
          }}
        />
      ) : null}
      <AppInfoView />
    </StyledUserStandard>
  );
};

export default Standard;
