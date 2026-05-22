"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";

type Props = {
    onSearch: (value: string) => void;
};
export default function TreeSearch({ onSearch, }: Props) {
    const [value, setValue] = useState("");
    const [debouncedValue] = useDebounce(value, 300);
    useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);
    return (
        <div className="sticky top-0 z-10 pb-2">
            <div className="relative p-0.5">
                <Input
                    type="search"
                    value={value}
                    placeholder="Search plant hierarchy..."
                    className="pl-9"
                    onChange={(e) =>
                        setValue(e.target.value)
                    }
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
        </div>
    );
}