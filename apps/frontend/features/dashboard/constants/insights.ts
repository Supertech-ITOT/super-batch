import { InsightCardProps, InsightExplanation, InsightStatus } from "@/common/components/insight-card";
import { CheckCircle2, Clock3, Gauge, Scale } from "lucide-react";
import { ProductionInsightsResponse } from "../type/dashboard.types";
import { minutesToADuration } from "@/common/utils/duration.util";

export function mapProductionInsights(data: ProductionInsightsResponse): InsightCardProps[] {
    const { insights } = data;
    return [
        {
            title: "Average Batch Cycle Time",
            value: minutesToADuration(
                insights.averageBatchCycleTime.valueMinutes
            ),
            change: Math.abs(
                insights.averageBatchCycleTime.changePercent
            ),
            description: "vs previous period",
            icon: Clock3,
            status: getStatus(
                insights.averageBatchCycleTime.changePercent,
                true
            ),
            chart: insights.averageBatchCycleTime.trend,
            chartType: "line",
            explanation:
                INSIGHT_EXPLANATIONS["Average Batch Cycle Time"],
        },

        {
            title: "Batch Success Rate",
            value: `${insights.batchSuccessRate.valuePercent}%`,
            change: Math.abs(
                insights.batchSuccessRate.changePercent
            ),
            description: "vs previous period",
            icon: CheckCircle2,
            status: getStatus(
                insights.batchSuccessRate.changePercent
            ),
            chart: insights.batchSuccessRate.trend,
            chartType: "line",
            explanation:
                INSIGHT_EXPLANATIONS["Batch Success Rate"],
        },

        {
            title: "Process Time Efficiency",
            value: `${insights.processTimeEfficiency.valuePercent}%`,
            change: Math.abs(
                insights.processTimeEfficiency.changePercent
            ),
            description: "vs previous period",
            icon: Gauge,
            status: getStatus(
                insights.processTimeEfficiency.changePercent
            ),
            chart: insights.processTimeEfficiency.trend,
            chartType: "bar",
            explanation:
                INSIGHT_EXPLANATIONS["Process Time Efficiency"],
        },

        {
            title: "Material Consumption Accuracy",
            value: `${insights.materialConsumptionAccuracy.valuePercent}%`,
            change: Math.abs(
                insights.materialConsumptionAccuracy.changePercent
            ),
            description: "vs previous period",
            icon: Scale,
            status: getStatus(
                insights.materialConsumptionAccuracy.changePercent
            ),
            chart: insights.materialConsumptionAccuracy.trend,
            chartType: "line",
            explanation:
                INSIGHT_EXPLANATIONS["Material Consumption Accuracy"],
        },
    ];
}

const INSIGHT_EXPLANATIONS: Record<string, InsightExplanation> = {
    "Average Batch Cycle Time": {
        title: "Average Batch Cycle Time",
        calculation:
            "Average of completed batch duration: End Date/Time - Start Date/Time.",
        description:
            "Measures how long batches typically take from start to completion.",
        improve: [
            "Identify SOP steps with the highest actual execution time.",
            "Investigate equipment waiting, transfer, and process delays.",
            "Remove unnecessary waiting or handoff time where possible.",
            "If actual process time consistently differs from the recipe standard, validate and update the standard time.",
        ],
        benefits: [
            "Shorter production cycles",
            "Higher batch throughput",
            "Better production planning",
        ],
    },

    "Batch Success Rate": {
        title: "Batch Success Rate",
        calculation:
            "Completed batches ÷ (Completed batches + Aborted batches) x 100.",
        description:
            "Shows the percentage of finished batches that completed successfully.",
        improve: [
            "Review aborted batches and identify recurring failure reasons.",
            "Identify the SOP, equipment, or transition associated with failures.",
            "Investigate recurring operator or process deviations.",
            "Address root causes instead of repeatedly restarting or aborting batches.",
        ],
        benefits: [
            "Fewer aborted batches",
            "Less material waste",
            "More reliable production",
        ],
    },

    "Process Time Efficiency": {
        title: "Process Time Efficiency",
        calculation:
            "Total Standard SOP Time ÷ Total Actual SOP Time x 100.",
        description:
            "Compares the time defined by the recipe with the actual time used to execute the process.",
        improve: [
            "Execute each process step according to the recipe standard time.",
            "Investigate SOPs where actual time is consistently higher than standard time.",
            "Check equipment, material transfer, waiting, and operator delays.",
            "If the process consistently requires less or more time, validate the process and update the recipe standard time.",
        ],
        benefits: [
            "More predictable batch duration",
            "Better production scheduling",
            "More accurate recipe standards",
        ],
    },

    "Material Consumption Accuracy": {
        title: "Material Consumption Accuracy",
        calculation:
            "100 - (|Actual Quantity - Standard Quantity| ÷ Standard Quantity x 100).",
        description:
            "Measures how closely actual material consumption matches the quantity defined by the recipe.",
        improve: [
            "Follow the recipe's standard material quantities.",
            "Investigate repeated over-consumption or under-consumption.",
            "Verify weighing and dosing equipment calibration.",
            "Check whether material losses, transfers, or process conditions explain the variance.",
            "Update the recipe quantity only after validating that the process standard has changed.",
        ],
        benefits: [
            "Lower material waste",
            "More consistent batches",
            "Better material cost control",
        ],
    },
};

function getStatus(change: number, lowerIsBetter = false): InsightStatus {
    if (change === 0) return "mid";

    const isPositive = lowerIsBetter ? change < 0 : change > 0;

    return isPositive ? "up" : "down";
}
