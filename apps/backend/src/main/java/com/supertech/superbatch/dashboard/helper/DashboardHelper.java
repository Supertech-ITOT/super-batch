package com.supertech.superbatch.dashboard.helper;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.supertech.superbatch.batch.batch_sop.entity.BatchSOP;

@Component
public class DashboardHelper {

    public Double calculateCycleTime(LocalDateTime startedAt) {
        if (startedAt == null) {
            return 0.0;
        }
        return (double) Duration.between(startedAt, LocalDateTime.now()).toMinutes();
    }

    public Double calculateStandardTime(Set<BatchSOP> sops) {
        if (sops == null || sops.isEmpty()) {
            return 0.0;
        }
        return sops.stream().filter(sop -> sop.getStdTime() != null).mapToDouble(BatchSOP::getStdTime).sum();
    }

    public Integer calculateProgress(LocalDateTime startDateTime, LocalDateTime endDateTime, Double stdTime) {
        if (startDateTime == null || stdTime == null || stdTime <= 0) {
            return 0;
        }
        LocalDateTime end = endDateTime != null ? endDateTime : LocalDateTime.now();
        long elapsedMinutes = Duration.between(startDateTime, end).toMinutes();
        return (int) Math.round((elapsedMinutes * 100.0) / stdTime);
    }

    public double calculateChangePercent(double current, double previous) {
        if (previous == 0) {
            return current == 0 ? 0 : 100;
        }
        return roundToTwoDecimals(((current - previous) / previous) * 100);
    }

    public double roundToTwoDecimals(double value) {
        return Math.round(value * 100.0) / 100.0;
    }

}