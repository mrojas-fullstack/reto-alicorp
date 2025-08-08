"use client"

import { Plus, Paperclip } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function UploadFile() {
  return (
    <Popover>
      <PopoverTrigger><Plus/></PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex items-center gap-2">
          <Paperclip/>
          <span>Añadir fotos y archivos</span>
        </div>
      </PopoverContent>
    </Popover>
  )
}
