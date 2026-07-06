import EvidenceCard from "./EvidenceCard";

export default function EvidencePanel({ evidence }) {
  return (
    <div className="flex flex-col gap-2.5">
      {evidence.map((item, index) => (
        <EvidenceCard
          key={`${item.file_path}-${index}`}
          evidence={item}
          rank={index + 1}
        />
      ))}
    </div>
  );
}
