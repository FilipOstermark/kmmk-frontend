import "src/view/Common/GlowImage.css"

export interface GlowImageProps {
  imageSrc: string
  blurRadiusPx: number

  wrapperClassName?: string
  imageClassName?: string
  glowClassName?: string
  onClick?: () => void
}

export const GlowImage: (props: GlowImageProps) => JSX.Element = ({
  imageSrc, 
  blurRadiusPx,
  wrapperClassName = "",
  imageClassName = "",
  glowClassName = "",
  onClick = () => {}
}) => (
    <div className={`glow-image-wrapper ${wrapperClassName}`}>

    <img 
      className={`glow-image-glow ${glowClassName}`} 
      src={imageSrc} 
      loading="lazy" 
      style={{
        filter: `blur(${blurRadiusPx}px) saturate(5)`
      }} />
    
    <img 
      className={`glow-image-image ${imageClassName}`} 
      src={imageSrc} 
      loading="lazy"
      onClick={onClick} />
    </div>
  )
