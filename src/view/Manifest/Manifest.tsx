import ManifestPdf from "src/assets/MoHU.pdf";
import "src/view/Manifest/Manifest.css";

export const Manifest: () => JSX.Element = () => {
  return (
    <div className="manifest-container">
      <iframe 
        allowFullScreen
        width="100%"
        height="100%"
        src={ManifestPdf} />
    </div>
  );
}