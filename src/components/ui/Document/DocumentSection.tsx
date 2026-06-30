import { Heading } from "./Heading"
import { Divider } from "./Divider"

type DocumentSectionProps = {
  title: string;
  children: React.ReactNode;
}

export function DocumentSection({ title, children }: DocumentSectionProps) {
  return (
    <section className="space-y-4">
      <Heading level={2}>{title}</Heading>
      <Divider />
      {children}
    </section>
  )
}