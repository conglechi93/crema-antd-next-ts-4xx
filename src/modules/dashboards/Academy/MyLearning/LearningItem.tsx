import React from 'react';
import AppCircularProgress from '@crema/components/AppCircularProgress';
import {
  StyledLearningAction,
  StyledLearningContent,
  StyledLearningItems,
  StyledLearningItemsInfo,
  StyledLearningThumb,
} from './index.styled';

import { LearningDataType } from '@crema/types/models/dashboards/AcademyType';
import Image from 'next/image';

type LearningItemProps = {
  course: LearningDataType;
};

const LearningItem: React.FC<LearningItemProps> = ({ course }) => {
  return (
    <StyledLearningItems className='item-hover' key={course.id}>
      <StyledLearningItemsInfo>
        <StyledLearningThumb>
          <Image alt='' src={course.icon} height={50} width={50} />
        </StyledLearningThumb>
        <StyledLearningContent>
          <h3>{course.title}</h3>
          <p>{course.desc}</p>
        </StyledLearningContent>
      </StyledLearningItemsInfo>

      <StyledLearningAction>
        <AppCircularProgress
          strokeColor='#0A8FDC'
          trailColor='rgb(214, 214, 214)'
          percent={course.percentage}
          size={45}
        />
      </StyledLearningAction>
    </StyledLearningItems>
  );
};

export default LearningItem;
