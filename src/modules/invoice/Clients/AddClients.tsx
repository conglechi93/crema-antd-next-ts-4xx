'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import AddClient from './AddClient';
import { postDataApi } from '@crema/hooks/APIHooks';
import { StyledTypographyWrapper } from '../index.styled';
import { ClientType } from '@crema/types/models/invoice';

const AddClients = () => {
  const router = useRouter();
  const infoViewActionsContext = useInfoViewActionsContext();

  const onSave = (client: ClientType) => {
    postDataApi('invoice/clients', infoViewActionsContext, {
      client,
    })
      .then(() => {
        infoViewActionsContext.showMessage(
          'New Client has been created successfully!',
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    router.push('/invoice/clients');
  };

  return (
    <StyledTypographyWrapper>
      <AddClient onSave={onSave} />
    </StyledTypographyWrapper>
  );
};

export default AddClients;
