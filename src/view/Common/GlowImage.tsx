import "src/view/Common/GlowImage.css"

export interface GlowImageProps {
  wrapperClassName?: string
  imageClassName?: string
  glowClassName?: string
  imageSrc: string
  blurRadiusPx: number
}

export const GlowImage: (props: GlowImageProps) => JSX.Element = ({
  wrapperClassName = "", 
  imageClassName = "",
  glowClassName = "",
  imageSrc, 
  blurRadiusPx
}) => (
    <div className={`glow-image-wrapper ${wrapperClassName}`} >
      <img className={`glow-image-glow ${glowClassName}`} src={imageSrc} style={{
        filter: `blur(${blurRadiusPx}px) saturate(5)`
      }} />
    <img className={`glow-image-image ${imageClassName}`} src={imageSrc} />
    </div>
  )
