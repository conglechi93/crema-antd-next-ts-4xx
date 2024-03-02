import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  StyledCourceCategorySlider,
  StyledCourseCategoryBadge,
  StyledCourseCategoryCard,
  StyledCourseCategoryContent,
  StyledCourseCategoryFooter,
  StyledCourseCategoryTitle,
} from './index.styled';
import type { CourseCategoryType } from '@crema/types/models/dashboards/AcademyType';
import Image from 'next/image';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

type CourseCategoriesProps = {
  course: CourseCategoryType;
};

const CourseCategories: React.FC<CourseCategoriesProps> = ({ course }) => {
  const { images, title, desc, lessons, xp } = course;

  return (
    <StyledCourseCategoryCard heightFull className='no-card-space'>
      <StyledCourceCategorySlider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image.image}
              alt={image.title}
              width={353}
              height={271}
            />
          </div>
        ))}
      </StyledCourceCategorySlider>
      <StyledCourseCategoryContent>
        <StyledCourseCategoryTitle>{title}</StyledCourseCategoryTitle>
        <p>{desc}</p>
        <StyledCourseCategoryFooter>
          <StyledCourseCategoryBadge
            style={{ backgroundColor: '#E7F4FC', color: '#259BE0' }}
          >
            <Image
              src={'/assets/images/dashboard/academy/lessons.svg'}
              alt='lessons'
              height={16}
              width={16}
            />
            {lessons} Lessons
          </StyledCourseCategoryBadge>
          <StyledCourseCategoryBadge
            style={{ backgroundColor: '#FFF5EB', color: '#FCB267' }}
          >
            <Image
              src={'/assets/images/dashboard/academy/xp.svg'}
              alt='xp'
              height={14}
              width={14}
            />
            {xp} XP
          </StyledCourseCategoryBadge>
        </StyledCourseCategoryFooter>
      </StyledCourseCategoryContent>
    </StyledCourseCategoryCard>
  );
};

export default CourseCategories;
