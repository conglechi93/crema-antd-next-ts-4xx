'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import AddClient from './AddClient';
import { putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { isEmptyObject } from '@crema/helpers/ApiHelper';
import { StyledTypographyWrapper } from '../index.styled';
import { ClientType } from '@crema/types/models/invoice';

const EditClients = () => {
  const router = useRouter();
  const params = useParams();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [{ apiData: selectedClient }] = useGetDataApi<ClientType>(
    'invoice/clients/detail',
    {} as ClientType,
    { id: params?.all?.[0] },
    true,
  );
  const onSave = (client: ClientType) => {
    putDataApi('invoice/clients', infoViewActionsContext, {
      client,
    })
      .then(() => {
        infoViewActionsContext.showMessage(
          'Client has been updated successfully!',
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    router.push('/invoice/clients');
  };

  return !isEmptyObject(selectedClient) ? (
    <StyledTypographyWrapper>
      <AddClient selectedClient={selectedClient} onSave={onSave} />
    </StyledTypographyWrapper>
  ) : null;
};

export default EditClients;
