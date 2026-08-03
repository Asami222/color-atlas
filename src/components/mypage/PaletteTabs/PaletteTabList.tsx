import * as Tabs from "@radix-ui/react-tabs";

export function PaletteTabList() {
  return (
    <Tabs.List className="w-full flex justify-between items-center ">

      <Tabs.Trigger
        value="large"
        aria-label="large"
        className="w-6 h-6 bg-background-secondary hover:bg-primary-hover border border-border-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary data-[state=active]:bg-neutral-500"
      />
      
      <Tabs.Trigger
        value="middle"
        aria-label="middle"
        className="w-12 h-6 bg-background-secondary hover:bg-primary-hover border border-border-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary data-[state=active]:bg-neutral-500"
      />

      <Tabs.Trigger
        value="small"
        aria-label="small"
        className="w-18 h-6 bg-background-secondary hover:bg-primary-hover border border-border-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary data-[state=active]:bg-neutral-500"
      />
    
    </Tabs.List>
  );
}