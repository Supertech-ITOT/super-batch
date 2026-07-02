import React, { memo, useCallback, useEffect, useMemo, useRef, useState, } from "react";
import { SparklesIcon } from "lucide-react";
import { Textarea } from "@/common/components/ui/textarea";
import { cn } from "@/common/lib/utils";

export interface TextareaAutocompleteOption {
    id: number | string;
    label: string;
}

interface TextareaAutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    options: TextareaAutocompleteOption[];
    placeholder?: string;
    disabled?: boolean;
    maxLength?: number;
    className?: string;
    emptyMessage?: string;
    maxSuggestions?: number;
}

function TextareaAutocomplete({ value, onChange, options, placeholder, disabled, maxLength, className, emptyMessage = "No matching suggestions", maxSuggestions = 8, }: TextareaAutocompleteProps) {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const search = value?.trim().toLowerCase();

    const filteredOptions = useMemo(() => {
        if (!search) return [];
        const result: TextareaAutocompleteOption[] = [];
        for (const option of options) {
            if (option.label.toLowerCase().includes(search)) {
                result.push(option);
                if (result.length >= maxSuggestions) break;
            }
        }
        return result;
    }, [options, search, maxSuggestions]);

    useEffect(() => { setSelectedIndex(0); }, [search]);
    useEffect(() => {
        requestAnimationFrame(() => {
            itemRefs.current[selectedIndex]?.scrollIntoView({
                block: "nearest",
            });
        });
    }, [selectedIndex]);

    const selectOption = useCallback(
        (option: TextareaAutocompleteOption) => { onChange(option.label); setOpen(false); },
        [onChange]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const value = e.target.value;
            onChange(value);
            setOpen(value.trim().length > 0);
        },
        [onChange]
    );

    const handleFocus = useCallback(() => {
        if (search) { setOpen(true); }
    }, [search]);

    const handleBlur = useCallback(() => {
        setTimeout(() => setOpen(false), 150);
    }, []);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (!open) return;
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setSelectedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setSelectedIndex((i) => Math.max(i - 1, 0));
                    break;
                case "Enter":
                    if (filteredOptions[selectedIndex]) {
                        e.preventDefault();
                        selectOption(filteredOptions[selectedIndex]);
                    }
                    break;
                case "Escape":
                    setOpen(false);
                    break;
            }
        },
        [filteredOptions, open, selectedIndex, selectOption]
    );

    const highlight = useCallback(
        (text: string) => {
            if (!search) return text;
            const lower = text.toLowerCase();
            const index = lower.indexOf(search);
            if (index === -1) return text;
            return (
                <>
                    {text.slice(0, index)}
                    <span className="font-semibold text-primary">
                        {text.slice(index, index + search.length)}
                    </span>
                    {text.slice(index + search.length)}
                </>
            );
        },
        [search]
    );

    return (
        <div className="relative">
            <Textarea
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={maxLength}
                className={cn(className)}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />

            {open && (
                <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-lg border bg-background shadow-lg">
                    <div className="flex items-center gap-2 border-b px-3 py-3 text-xs font-medium text-white bg-primary">
                        <SparklesIcon className="size-4" />
                        Predefined Message Suggestions
                    </div>

                    <div className="max-h-56 overflow-y-auto scrollbar-none">
                        {filteredOptions.length ? (
                            filteredOptions.map((option, index) => (
                                <button
                                    key={option.id}
                                    ref={(el) => { itemRefs.current[index] = el; }}
                                    type="button"
                                    onMouseDown={() => selectOption(option)}
                                    className={cn(
                                        "block w-full border-b px-4 py-3 text-left text-sm transition-colors last:border-b-0",
                                        index === selectedIndex
                                            ? "bg-primary/10"
                                            : "hover:bg-muted"
                                    )}
                                >
                                    {highlight(option.label)}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                                {emptyMessage}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(TextareaAutocomplete);