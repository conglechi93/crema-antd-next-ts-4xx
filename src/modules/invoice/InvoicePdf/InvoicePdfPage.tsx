'use client';
import React from 'react';
import InvoicePdf from './index';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import { useParams, useRouter } from 'next/navigation';
import { isEmptyObject } from '@crema/helpers/ApiHelper';
import { StyledTypographyWrapper } from '../index.styled';
import {
  InvoiceType,
  InvoiceSettingType,
  ClientType,
} from '@crema/types/models/invoice';

const InvoicePdfPage = () => {
  const params = useParams();
  const [{ apiData: invoiceSettings }] = useGetDataApi<InvoiceSettingType>(
    'invoice/settings',
    {} as InvoiceSettingType,
    {},
    true,
  );

  const [{ apiData: clientsList }] = useGetDataApi<ClientType[]>(
    'invoice/clients',
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

  return clientsList?.length > 0 &&
    !isEmptyObject(invoiceSettings) &&
    !isEmptyObject(selectedInv) ? (
    <StyledTypographyWrapper>
      <InvoicePdf
        selectedInv={selectedInv}
        clientsList={clientsList}
        invoiceSettings={invoiceSettings}
      />
    </StyledTypographyWrapper>
  ) : null;
};

export default InvoicePdfPage;
