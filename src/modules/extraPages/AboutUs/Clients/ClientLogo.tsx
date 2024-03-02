import React from 'react';
import { StyledClientLogo } from './index.styled';
import { AboutUsClientsData } from '@crema/fakedb/extraPages';
import Image from "next/image";

type ClientLogoProps = {
  client: AboutUsClientsData;
};

const ClientLogo = ({ client }: ClientLogoProps) => {
  return (
    <StyledClientLogo>
      <Image src={`${client.srcImg}`} alt={client.name} width={130} height={60} />
    </StyledClientLogo>
  );
};

export default ClientLogo;
