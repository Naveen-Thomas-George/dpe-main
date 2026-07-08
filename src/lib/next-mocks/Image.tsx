import React from 'react';

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height' | 'loading'> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  quality?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  placeholder,
  blurDataURL,
  loading,
  sizes,
  className,
  style,
  ...rest
}) => {
  const isLazy = priority ? 'eager' : (loading || 'lazy');

  const fillStyles: React.CSSProperties = fill
    ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: 'cover',
        objectPosition: 'center',
      }
    : {};

  const mergedStyles: React.CSSProperties = {
    ...fillStyles,
    ...style,
  };

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={isLazy}
      sizes={sizes}
      className={className}
      style={mergedStyles}
      {...rest}
    />
  );
};

export default Image;
