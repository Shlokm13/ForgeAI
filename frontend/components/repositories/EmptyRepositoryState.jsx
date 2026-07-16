import { FolderGit2 } from "lucide-react";

export default function EmptyRepositoryState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-border-subtle rounded-xl">
      <FolderGit2
        size={28}
        className="mb-3 text-text-muted"
      />

      <h3 className="text-sm font-semibold text-text-primary">
        No Indexed Repositories
      </h3>

      <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-text-secondary">
        Index your first GitHub repository to
        begin repository-grounded engineering
        analysis with ForgeAI.
      </p>
    </div>
  );
}