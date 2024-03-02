'use client';
import React from 'react';
import AddInvoice from './AddInvoice';
import { postDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { useRouter } from 'next/navigation';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { StyledTypographyWrapper } from '../index.styled';
import {
  ClientType,
  InvoiceSettingType,
  InvoiceType,
} from '@crema/types/models/invoice';

const AddInvoicePage = () => {
  const router = useRouter();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [{ apiData: clientsList }] = useGetDataApi<ClientType[]>(
    'invoice/clients',
    [],
    {},
    true,
  );

  const [{ apiData: invoiceSettings }] = useGetDataApi<InvoiceSettingType>(
    'invoice/settings',
    {} as InvoiceSettingType,
    {},
    true,
  );


  const [{ apiData: invoiceList }] = useGetDataApi<InvoiceType[]>(
    'invoice',
    [],
    {},
    true,
  );

  const onSave = (invoice: InvoiceType) => {
    postDataApi('invoice', infoViewActionsContext, { invoice })
      .then(() => {
        infoViewActionsContext.showMessage(
          'New Invoice has been created successfully!',
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    router.push('/invoice');
  };

  return clientsList && invoiceList?.length ? (
    <StyledTypographyWrapper>
      <AddInvoice
        clientsList={clientsList}
        totalCount={invoiceList?.length || 0}
        invoiceSettings={invoiceSettings}
        onSave={onSave}
      />
    </StyledTypographyWrapper>
  ) : null;
};

export default AddInvoicePage;
