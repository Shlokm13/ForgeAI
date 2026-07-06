// Maps backend `intent` values to display labels.
// Backend is the single source of truth for which values exist.
export const INTENT_LABELS = {
  implementation: "IMPLEMENTATION",
  architecture: "ARCHITECTURE",
  debugging: "DEBUGGING",
  code_flow: "CODE FLOW",
  general: "GENERAL",
};

export function getIntentLabel(intent) {
  return INTENT_LABELS[intent] || intent?.toUpperCase() || "GENERAL";
}
