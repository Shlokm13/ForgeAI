import "./globals.css";

import ForgeAIShell from "@/components/layout/ForgeAIShell";
import { AnalysisProvider } from "@/context/AnalysisContext";
import { ActiveRepositoryProvider } from "@/context/ActiveRepositoryContext";

export const metadata = {
  title: "ForgeAI | Repository Intelligence",
  description:
    "Repository intelligence workspace for inspecting implementation, architecture, code flow, and debugging behavior.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-bg-app text-text-primary font-sans antialiased">
        <ActiveRepositoryProvider>
          <AnalysisProvider>
            <ForgeAIShell>
              {children}
            </ForgeAIShell>
          </AnalysisProvider>
        </ActiveRepositoryProvider>
      </body>
    </html>
  );
}