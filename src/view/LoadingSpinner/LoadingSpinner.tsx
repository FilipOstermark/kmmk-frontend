import "src/view/LoadingSpinner/LoadingSpinner.css"

export const LoadingSpinner: () => JSX.Element = () => {
  return (
    <div className="lds-circle">
      <div>
        <div className="lds-inner"></div>
      </div>
    </div>
    )
}