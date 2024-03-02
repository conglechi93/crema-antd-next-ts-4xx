'use client';
import React from 'react';
import AddInvoice from '../AddInvoice/AddInvoice';
import { putDataApi, useGetDataApi } from '@crema/hooks/APIHooks';
import { useParams, useRouter } from 'next/navigation';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { isEmptyObject } from '@crema/helpers/ApiHelper';
import {
  ClientType,
  InvoiceSettingType,
  InvoiceType,
} from '@crema/types/models/invoice';

const EditInvoicePage = () => {
  const router = useRouter();
  const params = useParams();
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
  const [{ apiData: selectedInv }] = useGetDataApi<InvoiceType>(
    'invoice/detail',
    {} as InvoiceType,
    { id: params?.all?.[0] },
    true,
  );

  const onSave = (invoice: InvoiceType) => {
    putDataApi('invoice/clients', infoViewActionsContext, { invoice })
      .then(() => {
        infoViewActionsContext.showMessage(
          'New Invoice has been udpated successfully!',
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    router.push('/invoice');
  };

  return clientsList && invoiceList?.length && !isEmptyObject(selectedInv) ? (
    <AddInvoice
      selectedInv={selectedInv}
      clientsList={clientsList}
      totalCount={invoiceList?.length || 0}
      invoiceSettings={invoiceSettings}
      onSave={onSave}
    />
  ) : null;
};

export default EditInvoicePage;
