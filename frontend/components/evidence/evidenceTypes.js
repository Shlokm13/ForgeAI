// Exact backend evidence_type values mapped to display labels and
// semantic accent classes. Cards themselves stay neutral graphite;
// only small accents (dot, label) use these colors.
export const EVIDENCE_TYPE_LABELS = {
  source_code: "SOURCE CODE",
  documented: "DOCUMENTED",
  repository_context: "REPOSITORY CONTEXT",
};

export const EVIDENCE_TYPE_ACCENT = {
  source_code: {
    text: "text-evidence-source",
    dot: "bg-evidence-source",
    border: "border-evidence-source/25",
    bg: "bg-evidence-source/10",
  },
  documented: {
    text: "text-evidence-documented",
    dot: "bg-evidence-documented",
    border: "border-evidence-documented/25",
    bg: "bg-evidence-documented/10",
  },
  repository_context: {
    text: "text-evidence-context",
    dot: "bg-evidence-context",
    border: "border-evidence-context/25",
    bg: "bg-evidence-context/10",
  },
};

export function getEvidenceTypeLabel(evidenceType) {
  return EVIDENCE_TYPE_LABELS[evidenceType] || evidenceType?.toUpperCase();
}

export function getEvidenceAccent(evidenceType) {
  return (
    EVIDENCE_TYPE_ACCENT[evidenceType] || EVIDENCE_TYPE_ACCENT.repository_context
  );
}
