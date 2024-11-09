import NextImage, { ImageProps } from 'next/image'

export function CustomImage(props: ImageProps) {
  return <NextImage {...props} />
} 