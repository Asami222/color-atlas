import * as Tabs from "@radix-ui/react-tabs";

function PaletteTabIcon({ columns }: { columns: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: columns }).map((_, index) => (
        <div
          key={index}
          className="w-6 h-6 bg-background-secondary group-hover:bg-primary-hover border border-border-secondary transition-colors group-data-[state=active]:bg-neutral-500"
        />
      ))}
    </div>
  );
}

export function PaletteTabList() {
  return (
    
    <Tabs.List className="h-12.5 w-full px-4 py-1 flex justify-between items-end border-b border-neutral-300">

      <Tabs.Trigger
        value="large"
        aria-label="large"
        className="w-6 h-6 bg-background-secondary hover:bg-primary-hover border border-border-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary data-[state=active]:bg-neutral-500"
      />
      
      <Tabs.Trigger
        value="middle"
        aria-label="middle"
        className="group flex gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <PaletteTabIcon columns={2} />
      </Tabs.Trigger>


      <Tabs.Trigger
        value="small"
        aria-label="small"
        className="group flex gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <PaletteTabIcon columns={3} />
      </Tabs.Trigger>
    </Tabs.List>
  );
}