"use client";

import { Input } from "@/common/components/ui/input";
import { cn } from "@/common/lib/utils";
import { LucideIcon } from "lucide-react";
import CharacterProgress from "./character-progress";
import { Label } from "../ui/label";

interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  counter?: boolean;
  maxCharacters?: number;
  label?: string;
}

export function TextInput({ icon: Icon, className, counter, maxCharacters, value, label, ...props }: TextInputProps) {
  const text = typeof value === "string" ? value : "";
  return (
    <div className="space-y-1">
      {(label || counter) && (
        <div className="flex items-center justify-between">
          {label
            ? (<Label htmlFor={props.id} className="text-sm font-medium"> {label}</Label>)
            : (<div />)
          }
          {counter && maxCharacters && (<CharacterProgress value={text} max={maxCharacters} />)}
        </div>
      )}

      <div className="relative">
        {Icon && (<Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />)}
        <Input
          className={cn("bg-background border-input", "text-sm font-medium",
            "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input",
            "focus:outline-none", Icon && "pl-10", className)}
          value={value}
          {...props}
        />
      </div>
    </div>
  );
}