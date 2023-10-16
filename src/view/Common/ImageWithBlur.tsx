import "src/view/Common/ImageWithBlur.css"

export interface ImageWithBlurProps {
  className?: string
  blurImgClassName?: string
  imgClassName?: string
  src: string
  blurRadiusPx: number
}

export const ImageWithBlur: (props: ImageWithBlurProps) => JSX.Element = ({
  className = "", 
  blurImgClassName = "",
  imgClassName = "",
  src, 
  blurRadiusPx
}) => (
    <div className={`image-with-blur-wrapper ${className}`}>
      <img 
        className={`image-with-blur-blur-image ${blurImgClassName}`} 
        src={src} 
        style={{ filter: `saturate(5) blur(${blurRadiusPx}px)` }} />
      <img 
        className={`image-with-blur-normal-image ${imgClassName}`} 
        src={src} />
    </div>
  )
