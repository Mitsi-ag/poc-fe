import { PropertyDescriptionGeneratorModal } from "@/components/ai-assistant/property-description-generator/modal";
import { useToolsQuery } from "@/modules/tools/hooks/queries";

export function ToolsBar() {
  const { data } = useToolsQuery();

  return (
    <div className="flex w-64 flex-col border-l bg-gray-50 dark:bg-gray-900">
      <div className="border-b p-3">
        <h3 className="font-medium">Quick Tools</h3>
      </div>

      <div className="overflow-auto p-3">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <h4 className="text-muted-foreground text-xs font-medium">
              Bookmarked
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              <PropertyDescriptionGeneratorModal />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <h4 className="text-muted-foreground text-xs font-medium">
              All tools
            </h4>
            <div className="space-y-1.5">
              {data?.map((tool) => <div key={tool.id}>{tool.name}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
