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
            "Σ (End Time − Start Time) ÷ Completed Batches",

        description:
            "Shows how long a batch takes from start to completion.",

        improve: [
            "Find SOP steps causing the most delay.",
            "Reduce equipment, transfer, and waiting time.",
            "Validate and update standard time when actual time consistently differs.",
        ],

        benefits: [
            "Shorter batch cycles",
            "Higher production capacity",
            "Better production planning",
        ],
    },

    "Batch Success Rate": {
        title: "Batch Success Rate",

        calculation:
            "Completed ÷ (Completed + Aborted) x 100",

        description:
            "Shows how many finished batches complete successfully.",

        improve: [
            "Review aborted batches and failure reasons.",
            "Identify recurring SOP or equipment issues.",
            "Fix root causes instead of repeatedly aborting batches.",
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
            "Σ Standard Time ÷ Σ Actual Time x 100",

        description:
            "Compares recipe process time with actual execution time. Values above 100% indicate the process was completed faster than the standard time.",

        improve: [
            "Follow the recipe's standard process time.",
            "Find steps where actual time consistently differs.",
            "Validate the process before updating the recipe standard time.",
        ],

        benefits: [
            "Predictable batch duration",
            "Better production scheduling",
            "More accurate recipe standards",
        ],
    },

    "Material Consumption Accuracy": {
        title: "Material Consumption Accuracy",

        calculation:
            "100 − (|Actual − Standard| ÷ Standard x 100)",

        description:
            "Shows how closely actual material usage matches the recipe.",

        improve: [
            "Follow the recipe's standard quantities.",
            "Investigate repeated over- or under-consumption.",
            "Check dosing, weighing, and material loss causes.",
        ],

        benefits: [
            "Lower material waste",
            "Consistent batch quality",
            "Better material cost control",
        ],
    },
};

function getStatus(change: number, lowerIsBetter = false): InsightStatus {
    if (change === 0) return "mid";

    const isPositive = lowerIsBetter ? change < 0 : change > 0;

    return isPositive ? "up" : "down";
}
