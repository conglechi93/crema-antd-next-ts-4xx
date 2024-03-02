import React from 'react';
import { EyeOutlined } from '@ant-design/icons';
import {
  StyledCourseView,
  StyledRelatedCourseAction,
  StyledRelatedCourseItem,
  StyledRelatedCourseThumb,
} from './index.styled';

import { RelatedCoursesDataType } from '@crema/types/models/dashboards/AcademyType';
import Image from 'next/image';

type CourseItemProps = {
  data: RelatedCoursesDataType;
};

const CourseItem: React.FC<CourseItemProps> = ({ data }) => {
  return (
    <StyledRelatedCourseItem>
      <StyledRelatedCourseThumb>
        <Image src={data.image} alt={data.title} width={337} height={160} />
      </StyledRelatedCourseThumb>
      <h4>{data.title}</h4>
      <StyledRelatedCourseAction>
        <p>{data.author}</p>
        <StyledCourseView>
          <EyeOutlined />
          <span>{data.views} views</span>
        </StyledCourseView>
      </StyledRelatedCourseAction>
    </StyledRelatedCourseItem>
  );
};

export default CourseItem;
