"use client";

import { useState } from "react";
import { ListChecks, Trash2 } from "lucide-react";

import { TextInput } from "@/common/components/form/text-input";
import { Button } from "@/common/components/ui/button";
import { CheckParameterSchemaLimit } from "../schemas/checkParameter.schema";

type Props = {
  loading: boolean;
  allowedOptions: string[];
  notAllowedOptions: string[];
  setAllowedOptions: (
    options: string[],
    shouldValidate?: boolean,
    shouldDirty?: boolean,
  ) => void;
  setNotAllowedOptions: (
    options: string[],
    shouldValidate?: boolean,
    shouldDirty?: boolean,
  ) => void;
};

export default function QualitativeOptions({
  loading,
  allowedOptions,
  notAllowedOptions,
  setAllowedOptions,
  setNotAllowedOptions,
}: Props) {
  const [allowedInput, setAllowedInput] = useState("");
  const [notAllowedInput, setNotAllowedInput] = useState("");

  const addAllowedOption = () => {
    const value = allowedInput.trim();

    if (!value) {
      return;
    }

    setAllowedOptions([...allowedOptions, value], true, true);
    setAllowedInput("");
  };

  const addNotAllowedOption = () => {
    const value = notAllowedInput.trim();

    if (!value) {
      return;
    }

    setNotAllowedOptions([...notAllowedOptions, value], true, true);
    setNotAllowedInput("");
  };

  const removeAllowedOption = (index: number) => {
    setAllowedOptions(
      allowedOptions.filter((_, i) => i !== index),
      true,
      true,
    );
  };

  const removeNotAllowedOption = (index: number) => {
    setNotAllowedOptions(
      notAllowedOptions.filter((_, i) => i !== index),
      true,
      true,
    );
  };

  return (
    <div className="space-y-3">
      {/* Allowed Options */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          Allowed Options
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <TextInput
              label=""
              icon={ListChecks}
              placeholder="Enter allowed option"
              maxLength={CheckParameterSchemaLimit.option.max}
              disabled={loading}
              value={allowedInput}
              onChange={(e) => setAllowedInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addAllowedOption();
                }
              }}
            />
          </div>

          <Button
            type="button"
            className="h-10 px-3"
            onClick={addAllowedOption}
            disabled={loading || !allowedInput.trim()}
          >
            Add
          </Button>
        </div>

        {allowedOptions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allowedOptions.map((option, index) => (
              <div
                key={`${option}-${index}`}
                className="flex items-center gap-1 rounded-md border bg-muted px-2 py-1 text-sm"
              >
                <span>{option}</span>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAllowedOption(index)}
                  disabled={loading}
                  className="size-6 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Not Allowed Options */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          Not Allowed Options
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <TextInput
              label=""
              icon={ListChecks}
              placeholder="Enter not allowed option"
              maxLength={CheckParameterSchemaLimit.option.max}
              disabled={loading}
              value={notAllowedInput}
              onChange={(e) => setNotAllowedInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addNotAllowedOption();
                }
              }}
            />
          </div>

          <Button
            type="button"
            className="h-10 px-3"
            onClick={addNotAllowedOption}
            disabled={loading || !notAllowedInput.trim()}
          >
            Add
          </Button>
        </div>

        {notAllowedOptions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {notAllowedOptions.map((option, index) => (
              <div
                key={`${option}-${index}`}
                className="flex items-center gap-1 rounded-md border bg-muted px-2 py-1 text-sm"
              >
                <span>{option}</span>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeNotAllowedOption(index)}
                  disabled={loading}
                  className="size-6 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
