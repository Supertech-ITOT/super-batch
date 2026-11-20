import { subDays } from "date-fns";
import { ReportFilterRequest } from "../types/report.types";


const today = new Date();
const sevenDaysAgo = subDays(today, 7);
export const INITIAL_REPORT_FILTER: ReportFilterRequest = {
    search: "",
    fromDate: sevenDaysAgo,
    toDate: today,
    page: 0,
    size: 10
};