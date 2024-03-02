import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useIntl } from 'react-intl';
import { Avatar } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import {
  StyledSuggestTeamBtn,
  StyledSuggestTeamCard,
  StyledSuggestTeamThumb,
  StyledSuggestTeamUser,
  StyledSuggestTeamUserContent,
} from './index.styled';
import { SuggestTeamDataType } from '@crema/types/models/apps/Wall';
import Image from 'next/image';

type SuggestionsProps = {
  data: SuggestTeamDataType;
};

const SuggestTeam: React.FC<SuggestionsProps> = ({ data }) => {
  const { icon, title, subTitle, mediaImg } = data;
  const { messages } = useIntl();

  return (
    <StyledSuggestTeamCard
      title={messages['wall.suggestTeams'] as string}
      extra={<a href='#/'>{messages['common.viewAll'] as string}</a>}
      actions={[
        <StyledSuggestTeamBtn key={1} icon={<LikeOutlined />}>
          <IntlMessages id='wall.likeTeam' />
        </StyledSuggestTeamBtn>,
      ]}
    >
      <StyledSuggestTeamUser>
        <Avatar src={icon} alt='Face Book' />
        <StyledSuggestTeamUserContent>
          <h4>{title}</h4>
          <p>{subTitle}</p>
        </StyledSuggestTeamUserContent>
      </StyledSuggestTeamUser>
      <StyledSuggestTeamThumb>
        <Image src={`${mediaImg}`} alt='F man' width={356} height={180} />
      </StyledSuggestTeamThumb>
    </StyledSuggestTeamCard>
  );
};

export default SuggestTeam;
