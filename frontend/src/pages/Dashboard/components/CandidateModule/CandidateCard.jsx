import { FileText, Trash2 } from "lucide-react";

const CandidateCard = ({ file, onRemove }) => {
  const formatFileSize = (size) => {
    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="candidate-card">
      <div className="candidate-card-left">
        <div className="candidate-file-icon">
          <FileText size={26} />
        </div>

        <div className="candidate-file-details">
          <h4>{file.name}</h4>

          <p>{formatFileSize(file.size)}</p>
        </div>
      </div>

      <button
        className="candidate-remove-btn"
        onClick={onRemove}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default CandidateCard;