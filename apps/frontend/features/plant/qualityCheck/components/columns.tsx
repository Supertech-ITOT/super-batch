"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";

import { toDisplayText } from "@/common/lib/format-enum";
import { Badge } from "@/common/components/ui/badge";

import {
  CheckParameterResponse,
  CheckParameterTypeBadgeStyles,
} from "../types/checkParameter.types";
import { CheckParameterDialogState } from "./qualityCheck-view";

export const columns = (
  setDialog: React.Dispatch<React.SetStateAction<CheckParameterDialogState>>,
): ColumnDef<CheckParameterResponse>[] => [
  {
    id: "srNo",
    header: "Sr. No.",
    cell: ({ row }) => row.index + 1,
    meta: {
      align: "center",
    },
  },

  {
    accessorKey: "id",
    header: "Id",
    meta: {
      align: "center",
    },
  },

  {
    accessorKey: "name",
    header: "Name",
    meta: {
      align: "center",
    },
  },

  {
    accessorKey: "product",
    header: "Product",
    meta: {
      align: "center",
    },
  },

  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;

      return (
        <Badge
          variant="outline"
          className={
            CheckParameterTypeBadgeStyles[
              type as keyof typeof CheckParameterTypeBadgeStyles
            ]
          }
        >
          {toDisplayText(type)}
        </Badge>
      );
    },
    meta: {
      align: "center",
    },
  },

  {
    id: "rangeOptions",
    header: "Range / Options",
    cell: ({ row }) => {
      const checkParameter = row.original;

      if (checkParameter.type === "QUANTITIVE") {
        return (
          <span>
            {checkParameter.min} - {checkParameter.max}
          </span>
        );
      }

      const allowedOptions = checkParameter.options
        ?.filter((option) => option.isAllowed)
        .map((option) => option.value)
        .join(", ");

      const notAllowedOptions = checkParameter.options
        ?.filter((option) => !option.isAllowed)
        .map((option) => option.value)
        .join(", ");

      return (
        <div className="text-sm">
          <div>
            <span className="font-medium">Allowed:</span>{" "}
            {allowedOptions || "-"}
          </div>

          <div>
            <span className="font-medium">Not Allowed:</span>{" "}
            {notAllowedOptions || "-"}
          </div>
        </div>
      );
    },
    meta: {
      align: "center",
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const checkParameter = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();

                setDialog({
                  open: true,
                  action: "edit",
                  checkParameterId: checkParameter.id,
                });
              }}
            >
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation();

                setDialog({
                  open: true,
                  action: "delete",
                  checkParameterId: checkParameter.id,
                });
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    meta: {
      align: "center",
    },
  },
];
