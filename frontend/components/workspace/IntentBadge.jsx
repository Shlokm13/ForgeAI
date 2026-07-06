import { getIntentLabel } from "@/utils/intentLabels";

export default function IntentBadge({ intent }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-forge-purple/10 border border-forge-purple/25 text-forge-purpleLight text-[11px] font-medium tracking-wide">
      {getIntentLabel(intent)}
    </span>
  );
}
