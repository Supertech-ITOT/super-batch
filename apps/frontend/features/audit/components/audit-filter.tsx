"use client";

import { Activity, Boxes, RotateCcw, Search, User, } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import SearchableSelect from "@/common/components/form/searchable-select";
import { useGetUser } from "@/features/manager/user/hooks/use-user";
import { useGetModules } from "@/features/manager/module/hooks/use-module";
import { useGetBatchAuditAction } from "@/features/common/hooks/useMetadata";
import { toDisplayText } from "@/common/lib/format-enum";
import { TextInput } from "@/common/components/form/text-input";
import { DateRangeInput } from "@/common/components/form/date-range-input";
import UserSelect from "@/common/components/form/user-select";

export type AuditFilterValue = {
  search: string;
  module?: number;
  action?: string;
  user?: number;
  fromDate?: Date;
  toDate?: Date;
};

type AuditFilterProps = {
  filter: AuditFilterValue;
  onFilterChange: (filter: AuditFilterValue) => void;
  onReset: () => void;
};

export default function AuditFilter({ filter, onFilterChange, onReset, }: AuditFilterProps) {
  const { data: users } = useGetUser();
  const { data: modules } = useGetModules();
  const { data: actions } = useGetBatchAuditAction();
  const updateFilter = <K extends keyof AuditFilterValue>(key: K, value: AuditFilterValue[K],) => {
    onFilterChange({ ...filter, [key]: value, });
  };

  return (
    <div className="grid w-full grid-cols-2 gap-2 rounded-lg border bg-card p-2 sm:grid-cols-3 lg:grid-cols-6 items-end shadow-xs">
      {/* Search */}
      <TextInput
        label="Search"
        icon={Search}
        value={filter.search}
        placeholder="Search..."
        onChange={(e) => updateFilter("search", e.target.value)}
      />

      {/* Range Date */}
      <DateRangeInput
        label="Date Range"
        placeholder="Date Range"
        value={{ fromDate: filter.fromDate, toDate: filter.toDate, }}
        onChange={({ fromDate, toDate }) => {
          onFilterChange({ ...filter, fromDate, toDate, });
        }}
      />

      {/* Module */}
      <SearchableSelect
        label="Module"
        value={filter.module}
        icon={Boxes}
        onChange={(value) => updateFilter("module", value)}
        placeholder="All Modules"
        options={modules?.map((m) => ({
          label: toDisplayText(m.name),
          value: m.id,
        })) ?? []}
      />


      {/* Action */}
      <SearchableSelect
        label="Action"
        icon={Activity}
        value={filter.action}
        onChange={(value) => updateFilter("action", value)}
        placeholder="All Actions"
        options={actions?.map((a) => ({
          label: a.label,
          value: a.value,
        })) ?? []}
      />

      {/* User */}
      <UserSelect
        label="Performed By"
        icon={User}
        value={filter.user}
        onChange={(value) => updateFilter("user", value)}
        placeholder="All Users"
        options={users?.map((u) => ({
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.roleName,
        })) ?? []}
      />



      {/* Reset */}
      <Button
        variant="outline"
        onClick={onReset}
        type="button"
        className="bg-card hover:bg-card"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
    </div >
  );
}
