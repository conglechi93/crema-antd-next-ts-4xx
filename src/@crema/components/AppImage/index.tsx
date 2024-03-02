import React, { CSSProperties } from 'react';

type AppImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};
const AppImage = ({ src, alt, ...props }: AppImageProps) => {
  return (
    <picture>
      <img src={src} alt={alt} {...props} />
    </picture>
  );
};

export default AppImage;
