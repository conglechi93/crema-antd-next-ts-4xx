import styled from 'styled-components';

export const StyledProductImageSlide = styled.div`
  position: relative;
`;

export const StyledProductImageSlideRoot = styled.div`
  position: relative;
  display: flex;
`;
export const StyledMediaSlider = styled.div`
  width: 100%;
  & .slick-slider {
    pb: 5;
  }
& .slick-track {
  display: flex;
& .slick-slide {
  height: 500px;
& > div {
  height: 100%;
},
},
},
& .slick-slide img {
  display: inline-block;
}
& .slick-dots {
  bottom: 0;
  // display: 'flex !important',
  // justifyContent: 'center',
  // alignItems: 'center',
  // listStyle: 'none',
  // gap: '10px',

& li {
  width: 10px;
  height: 10px;
& button {
  width: 10px;
  height: 10px;
  padding: 0;
  // borderRadius: '50%',
  // backgroundColor: (theme) =>
  //   lighten(theme.palette.common.black, 0.5),
  // color: (theme) => lighten(theme.palette.common.black, 0.5),
  // overflow: 'hidden',
},
& button:before {
  font-size: 0;
  backgroundColor: (theme) =>lighten(theme.palette.common.black, 0.5);
  width: 10px;
  height: 10px;
  border-radius: 50%;
},
},
},
`;
export const StyledProductFav = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  font-size: 20px;
  cursor: pointer;

  [dir='rtl'] & {
    right: auto;
    left: 10px;
  }
`;

export const StyledProductImageSlideAction = styled.div`
  display: flex;
  justify-content: center;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding-left: 20px;

    [dir='rtl'] & {
      padding-left: 0;
      padding-right: 20px;
    }
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.xxl}px) {
    padding-left: 60px;

    [dir='rtl'] & {
      padding-left: 0;
      padding-right: 60px;
    }
  }
`;
