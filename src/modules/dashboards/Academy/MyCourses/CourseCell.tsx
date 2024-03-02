import React from 'react';
import AppMenu from '@crema/components/AppMenu';
import {
  StyledCourseCell,
  StyledCourseCellAction,
  StyledCourseCellBtn,
  StyledCourseCellContent,
  StyledCourseCellInfo,
  StyledCourseCellMenu,
  StyledCourseCellRate,
  StyledCourseCellRating,
  StyledCourseCellThumb,
} from './index.styled';
import Image from 'next/image';

type CourseCellProps = {
  course: {
    id: number;
    title: string;
    duration: string;
    rating: number;
    isCompleted: boolean;
    thumb: string;
  };
};

const CourseCell: React.FC<CourseCellProps> = ({ course }) => {
  return (
    <StyledCourseCell key={course.id} className='item-hover'>
      <StyledCourseCellContent>
        <StyledCourseCellThumb>
          <Image alt='' src={course.thumb} height={60} width={60} />
        </StyledCourseCellThumb>
        <StyledCourseCellInfo>
          <h3 className='text-truncate'>{course.title}</h3>
          <p className='text-truncate'>{course.duration}</p>
        </StyledCourseCellInfo>
      </StyledCourseCellContent>

      <StyledCourseCellAction>
        {course.isCompleted ? (
          <div className='ant-row ant-row-middle'>
            <StyledCourseCellRate>Rate</StyledCourseCellRate>
            <StyledCourseCellBtn type='primary'>
              Certificate
            </StyledCourseCellBtn>
          </div>
        ) : (
          <div className='ant-row ant-row-middle'>
            <Image
              src={'/assets/images/dashboard/academy/rating.svg'}
              alt='rating'
              width={15}
              height={18}
            />
            <StyledCourseCellRating>{course.rating}</StyledCourseCellRating>
            <StyledCourseCellBtn className='btn-primary-outline'>
              View Course
            </StyledCourseCellBtn>
          </div>
        )}
        <StyledCourseCellMenu>
          <AppMenu />
        </StyledCourseCellMenu>
      </StyledCourseCellAction>
    </StyledCourseCell>
  );
};

export default CourseCell;
