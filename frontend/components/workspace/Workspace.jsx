import QuestionHeader from "./QuestionHeader";
import AnswerPanel from "./AnswerPanel";
import EvidencePanel from "../evidence/EvidencePanel";

export default function Workspace({ analysis, onClear }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <QuestionHeader
        question={analysis.question}
        intent={analysis.intent}
        onClear={onClear}
      />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <section className="lg:w-[58%] overflow-y-auto px-5 py-5 border-b lg:border-b-0 lg:border-r border-border-subtle">
          <p className="text-[10px] font-medium tracking-widest text-forge-purpleLight uppercase mb-4">
            Technical Analysis
          </p>
          <AnswerPanel answer={analysis.answer} />
        </section>

        <section className="lg:w-[42%] overflow-y-auto px-5 py-5">
          <p className="text-[10px] font-medium tracking-widest text-evidence-source uppercase mb-1">
            Repository Evidence
          </p>
          <p className="text-[12px] text-text-muted mb-4">
            Ranked repository context used to support this analysis.
          </p>
          <EvidencePanel evidence={analysis.evidence} />
        </section>
      </div>
    </div>
  );
}
