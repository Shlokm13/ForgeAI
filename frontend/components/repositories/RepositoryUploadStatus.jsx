import {
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function RepositoryUploadStatus({
  uploading,
  error,
  result,
}) {
  if (uploading) {
    return (
      <StatusContainer>
        <LoaderCircle
          size={18}
          className="animate-spin text-forge-purpleLight"
        />

        <div>
          <p className="text-sm font-medium text-text-primary">
            Building Repository Intelligence
          </p>

          <p className="mt-1 text-xs leading-relaxed text-text-muted">
            ForgeAI is cloning the repository,
            processing supported files, and
            generating a semantic search index.
            Larger repositories may take a few
            moments.
          </p>
        </div>
      </StatusContainer>
    );
  }

  if (error) {
    return (
      <StatusContainer>
        <AlertCircle
          size={18}
          className="text-red-400"
        />

        <div>
          <p className="text-sm font-medium text-red-400">
            Repository Index Failed
          </p>

          <p className="mt-1 text-xs leading-relaxed text-text-secondary">
            {error}
          </p>
        </div>
      </StatusContainer>
    );
  }

  if (result) {
    return (
      <StatusContainer>
        <CheckCircle2
          size={18}
          className="text-green-400"
        />

        <div className="w-full">
          <p className="text-sm font-medium text-green-400">
            Repository Indexed Successfully
          </p>

          <div className="grid grid-cols-2 mt-3 text-xs gap-y-2">
            <Metric
              label="Repository"
              value={
                result.data.repository_name
              }
            />

            <Metric
              label="Files"
              value={
                result.data.supported_files
              }
            />

            <Metric
              label="Chunks"
              value={
                result.data.chunks_created
              }
            />

            <Metric
              label="Vector DB"
              value={
                result.data.vector_database
              }
            />
          </div>
        </div>
      </StatusContainer>
    );
  }

  return null;
}

function StatusContainer({
  children,
}) {
  return (
    <div className="flex gap-3 px-5 py-4 border-t border-border-subtle">
      {children}
    </div>
  );
}

function Metric({
  label,
  value,
}) {
  return (
    <>
      <span className="text-text-muted">
        {label}
      </span>

      <span className="font-mono text-text-primary">
        {value}
      </span>
    </>
  );
}