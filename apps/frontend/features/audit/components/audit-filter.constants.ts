import { format, subDays } from "date-fns";
import { BatchAuditSearchRequest } from "../types/audit.types";
import { AuditFilterValue } from "./audit-filter";

const today = new Date();
const sevenDaysAgo = subDays(today, 7);

export const INITIAL_AUDIT_FILTER: AuditFilterValue = {
    search: "",
    module: undefined,
    action: undefined,
    user: undefined,
    fromDate: sevenDaysAgo,
    toDate: today,
};

export function toBatchAuditSearchRequest(filter: AuditFilterValue, page: number, size: number,): BatchAuditSearchRequest {
    return {
        search: filter.search || null,
        moduleId: filter.module ?? null,
        action: filter.action ?? null,
        userId: filter.user ?? null,
        fromDate: filter.fromDate ? format(filter.fromDate, "yyyy-MM-dd") : null,
        toDate: filter.toDate ? format(filter.toDate, "yyyy-MM-dd") : null,
        page,
        size,
    };
}