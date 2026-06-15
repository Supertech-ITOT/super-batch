import { Input } from "@/common/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Search } from "lucide-react";

const status = ["All Status", "Published", "Draft", "Review", "Closed"];

export default function RecipeFilter() {
    return (
        <div className="my-4 flex gap-2">
            <div className="relative w-80">
                <Search className="size-4 absolute top-1/2 -translate-y-1/2 right-3" />
                <Input placeholder="Search recipes..." className="pr-8" />
            </div>
            <Select defaultValue="All Status">
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {status?.map((e) => (
                            <SelectItem key={e} value={e}>{e}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}