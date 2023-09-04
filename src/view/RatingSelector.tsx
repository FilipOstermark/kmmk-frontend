import { useState } from "react"
import './css/RatingSelector.css'

export interface RatingStarProps {
  value: number
  selectedValue: number | undefined
  setValue: (value: number) => void
  setHoveredValue: (value: number | undefined) => void
}

export const RatingStar: (props: RatingStarProps) => JSX.Element = (
  { value, selectedValue, setValue, setHoveredValue }: RatingStarProps
) => {

  let starColor = (selectedValue && (selectedValue >= value)) ? 
    "orange" : "whitesmoke"

  return (
    <span 
    className="material-symbols-rounded rating-selector-star" 
    style={{ color: starColor }}
    onClick={() => setValue(value)}
    onMouseOver={() => setHoveredValue(value)}
    onMouseLeave={() => setHoveredValue(undefined)}>star</span>
  )
}

interface RatingSelectorProps {
  ratingUserName: string
  onValueChange: (value: number) => void
}

export const RatingSelector: (
  props: RatingSelectorProps
) => JSX.Element = (
  { ratingUserName, onValueChange }: RatingSelectorProps
) => {
  const [hoveredValue, setHoveredValue] = useState<number>()
  const [selectedValue, setSelectedValue] = useState<number>()

  

  const stars = []
  for (let i = 1; i < 11; i++) {
    stars.push((
      <RatingStar 
        key={i}
        value={i}
        selectedValue={hoveredValue ?? selectedValue}
        setValue={value => {
          setSelectedValue(value)
          onValueChange(value)
        }}
        setHoveredValue={setHoveredValue}
      />
    ))
  }

  return (
    <div className="rating-selector-wrapper">
      <h3>{ratingUserName} ({selectedValue ?? "-"}/10)</h3>
      <div className="rating-selector-stars">
        {stars}
      </div>
    </div>
  )
}