import { Search } from "lucide-react"
import { Input } from "./ui/input"

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <div className="relative flex w-full min-w-0 flex-col p-2 py-0">
        <div className="w-full text-sm relative">
          <Input
            id="search"
            placeholder="Search the docs..."
            className="bg-background h-8 w-full shadow-none pl-8"
          />
          <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </div>
      </div>
    </form>
  )
}
