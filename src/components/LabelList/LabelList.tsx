import { useLabels } from "../../hooks/useLabels"
import type { ILabel } from "../../types/types";

function LabelList() {
  const {data: labels, isLoading, error} = useLabels();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {labels?.map((label : ILabel) => (
        <div key={label.id}>
          <h3>{label.caption}</h3>
          <p>{label.color}</p>
        </div>
      ))}
    </div>
  )
}

export default LabelList