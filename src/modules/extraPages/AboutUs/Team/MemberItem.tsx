import React from 'react';
import { StyledAppCard, StyledTeamDesc, StyledTeamTitle } from './index.styled';
import { TeamData } from '@crema/fakedb/extraPages';
import Image from 'next/image';

type MemberItemProps = {
  member: TeamData;
};
const MemberItem = ({ member }: MemberItemProps) => {
  return (
    <StyledAppCard
      cover={
        <Image alt='MemberItem' src={member.srcImg} width={367} height={367} />
      }
    >
      <StyledTeamTitle level={5}>{member.name}</StyledTeamTitle>
      <StyledTeamDesc>{member.position}</StyledTeamDesc>
    </StyledAppCard>
  );
};

export default MemberItem;
