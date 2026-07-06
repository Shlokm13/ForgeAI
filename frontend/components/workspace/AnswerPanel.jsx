import ReactMarkdown from "react-markdown";

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="text-lg font-semibold text-text-primary mt-6 mb-2.5 first:mt-0">
      {children}
    </h1>
  ),

  h2: ({ children }) => (
    <h2 className="text-[13px] font-semibold tracking-wide uppercase text-forge-purpleLight mt-7 mb-2.5 first:mt-0 pb-1.5 border-b border-border-subtle">
      {children}
    </h2>
  ),

  h3: ({ children }) => (
    <h3 className="text-sm font-semibold text-text-primary mt-5 mb-2">
      {children}
    </h3>
  ),

  p: ({ children }) => (
    <p className="text-[13.5px] leading-relaxed text-text-secondary mb-3">
      {children}
    </p>
  ),

  ul: ({ children }) => (
    <ul className="mb-3 space-y-1.5 list-none pl-0">
      {children}
    </ul>
  ),

  ol: ({ children }) => (
    <ol className="mb-3 space-y-1.5 list-decimal list-inside marker:text-forge-purpleLight marker:font-mono marker:text-xs">
      {children}
    </ol>
  ),

  li: ({ children }) => (
    <li className="text-[13.5px] leading-relaxed text-text-secondary pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-text-muted only:before:content-none [ol_&]:before:content-none [ol_&]:pl-0">
      {children}
    </li>
  ),

  strong: ({ children }) => (
    <strong className="text-text-primary font-semibold">
      {children}
    </strong>
  ),

  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-forge-purple/40 pl-3 py-0.5 my-3 text-text-muted italic text-[13px]">
      {children}
    </blockquote>
  ),

  hr: () => (
    <hr className="border-border-subtle my-5" />
  ),

  code: ({ children, ...props }) => (
    <code
      className="px-1.5 py-0.5 rounded bg-panel-code border border-border-subtle text-evidence-source font-mono text-[12.5px]"
      {...props}
    >
      {children}
    </code>
  ),

  pre: ({ children }) => (
    <pre className="my-3 bg-panel-code border border-border-subtle rounded-lg px-3.5 py-2.5 overflow-x-auto text-[12.5px] leading-relaxed [&_code]:block [&_code]:p-0 [&_code]:border-0 [&_code]:rounded-none [&_code]:bg-transparent [&_code]:text-text-secondary">
      {children}
    </pre>
  ),
};

export default function AnswerPanel({ answer }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown components={markdownComponents}>
        {answer}
      </ReactMarkdown>
    </div>
  );
}