import { useMessages } from "@/modules/messages/hooks/use-messages";
import { Button } from "@/components/ui/button";
import { FileText, Map, ImageIcon, Users, BarChart3 } from "lucide-react";

export function ToolsBar({
  handleSuggestionClick,
}: ReturnType<typeof useMessages>) {
  return (
    <div className="flex w-64 flex-col border-l bg-gray-50 dark:bg-gray-900">
      <div className="border-b p-3">
        <h3 className="font-medium">Quick Tools</h3>
      </div>

      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <h4 className="text-muted-foreground text-xs font-medium">
              Content
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {quickTools.slice(0, 3).map((tool) => (
                <Button
                  key={tool.title}
                  variant="outline"
                  className="h-9 justify-start px-2.5 text-xs"
                  onClick={() => handleSuggestionClick(tool.prompt)}
                >
                  <div className="bg-primary/10 text-primary mr-2 flex h-6 w-6 items-center justify-center rounded-md">
                    {tool.icon}
                  </div>
                  <span>{tool.title}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-muted-foreground text-xs font-medium">
              Analysis
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {quickTools.slice(3, 6).map((tool) => (
                <Button
                  key={tool.title}
                  variant="outline"
                  className="h-9 justify-start px-2.5 text-xs"
                  onClick={() => handleSuggestionClick(tool.prompt)}
                >
                  <div className="bg-primary/10 text-primary mr-2 flex h-6 w-6 items-center justify-center rounded-md">
                    {tool.icon}
                  </div>
                  <span>{tool.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick tools for the simplified sidebar
const quickTools = [
  {
    title: "Property Description",
    icon: <FileText className="h-4 w-4" />,
    prompt:
      "Generate a professional property description for a 3-bedroom waterfront home in Bondi Beach",
  },
  {
    title: "Email Templates",
    icon: <FileText className="h-4 w-4" />,
    prompt:
      "Write a follow-up email to a potential seller who attended my open house last week",
  },
  {
    title: "Social Media",
    icon: <ImageIcon className="h-4 w-4" />,
    prompt:
      "Create an Instagram post caption for a new luxury listing in Coogee",
  },
  {
    title: "Competitor Analysis",
    icon: <Users className="h-4 w-4" />,
    prompt:
      "Create a competitive analysis of Sarah Johnson from Ray White in Bondi Beach",
  },
  {
    title: "Market Report",
    icon: <BarChart3 className="h-4 w-4" />,
    prompt:
      "Create a market report for Randwick showing price trends for the last quarter",
  },
  {
    title: "Area Insights",
    icon: <Map className="h-4 w-4" />,
    prompt: "Show me market insights for Bondi Beach area",
  },
];
