import { PropertyDescriptionGeneratorModal } from "@/components/ai-assistant/property-description-generator/modal";

export function ToolsBar() {
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
              <PropertyDescriptionGeneratorModal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
