import QualityCheck from "./quality-check-dialog";

export default function QualityCheckView() {
  return (
    <div>
      <div>
        <QualityCheck />
      </div>
      <div>
        <QualityCheckView />
      </div>
    </div>
  );
}
