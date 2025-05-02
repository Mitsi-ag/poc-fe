"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface TrialStatusProps {
  startDate: Date;
  endDate: Date;
  onUpgrade: () => void;
  variant?: "sidebar" | "banner" | "compact";
  showDismiss?: boolean;
}

export function TrialStatus({
  startDate,
  endDate,
  onUpgrade,
  variant = "sidebar",
  showDismiss = true,
}: TrialStatusProps) {
  // Calculate days remaining
  const now = new Date();
  const daysRemaining = Math.max(
    0,
    Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
  );
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const progress = ((totalDays - daysRemaining) / totalDays) * 100;
  const isEnding = daysRemaining <= 1;

  if (variant === "compact") {
    return (
      <Button
        size="sm"
        variant="outline"
        className="flex items-center gap-1.5 h-8 border-blue-200 bg-blue-50 hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-900/30 dark:hover:bg-blue-900/50"
        onClick={onUpgrade}
      >
        <Clock className="h-3.5 w-3.5 text-blue-600" />
        <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
          {daysRemaining}d left
        </span>
      </Button>
    );
  }

  if (variant === "banner") {
    return (
      <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 px-4 py-2.5 border-b border-blue-100 dark:border-blue-900/50">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
            Your Pro trial{" "}
            {isEnding ? "ends today" : `ends in ${daysRemaining} days`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs"
            onClick={onUpgrade}
          >
            Upgrade Now
          </Button>
          {showDismiss && (
            <Button size="sm" variant="ghost" className="h-8 text-xs">
              Dismiss
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Default sidebar variant
  return (
    <div className="rounded-lg border border-border p-3 bg-background">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Trial Status</span>
        </div>
        {isEnding && (
          <Badge variant="destructive" className="text-[10px] h-5 px-1.5">
            Ending soon!
          </Badge>
        )}
      </div>
      <Progress value={progress} className="h-1.5 mb-2" />
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground">
          {daysRemaining} days remaining
        </span>
        <span className="text-xs font-medium">Pro Trial</span>
      </div>
      <Button size="sm" className="w-full text-xs" onClick={onUpgrade}>
        Upgrade Now
      </Button>
    </div>
  );
}
