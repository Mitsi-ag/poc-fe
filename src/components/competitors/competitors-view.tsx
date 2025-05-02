import { CompetitorIntelligence } from "@/components/competitor-intelligence";

export function CompetitorsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-50 dark:to-gray-400">
          Competitor Intelligence
        </h1>
        <p className="text-muted-foreground mt-1">
          Track and analyze competitor activity in your target markets
        </p>
      </div>

      <CompetitorIntelligence />
    </div>
  );
}
