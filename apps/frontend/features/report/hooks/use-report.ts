import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/features/common/hooks/query-keys";

import {
  getBatches,
  getBatchInfoById,
  getBatchSopByBatchId,
  getMaterialQuantityByBatchId,
  getParameterValueByBatchId,
  getQualityCheckByBatchId,
} from "../service/report.service";

import { ReportFilterRequest } from "../types/report.types";

export const useGetBatches = (request: ReportFilterRequest) => {
  return useQuery({
    queryKey: queryKeys.reports.batches.list(request),
    queryFn: async () => {
      const res = await getBatches(request);
      return res.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetBatchInfoById = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.reports.batches.detail(id ?? 0),
    queryFn: async () => {
      const res = await getBatchInfoById(id!);
      return res.data;
    },
    enabled: !!id,
    staleTime: 0,
  });
};

export const useGetBatchSopByBatchId = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.reports.batches.sops(id ?? 0),
    queryFn: async () => {
      const res = await getBatchSopByBatchId(id!);
      return res.data;
    },
    enabled: !!id,
    staleTime: 0,
  });
};

export const useGetMaterialQuantityByBatchId = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.reports.batches.materialQuantity(id ?? 0),
    queryFn: async () => {
      const res = await getMaterialQuantityByBatchId(id!);
      return res.data;
    },
    enabled: !!id,
    staleTime: 0,
  });
};

export const useGetParameterValueByBatchId = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.reports.batches.parameterValue(id ?? 0),
    queryFn: async () => {
      const res = await getParameterValueByBatchId(id!);
      return res.data;
    },
    enabled: !!id,
    staleTime: 0,
  });
};

export const useGetQualityCheckByBatchId = (id?: number) => {
  return useQuery({
    queryKey: queryKeys.reports.batches.qualityCheck(id ?? 0),
    queryFn: async () => {
      const res = await getQualityCheckByBatchId(id!);
      return res.data;
    },
    enabled: !!id,
    staleTime: 0,
  });
};