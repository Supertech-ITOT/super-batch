import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, LoaderCircle, Save } from "lucide-react";
import { toast } from "sonner";

import { useGetCheckParameters } from "@/features/plant/check-parameter/hooks/use-qualityCheck";
import { useCreateBatchCheck } from "../hooks/use-check";
import { batchCheckDefaultValues, type BatchCheckFormValues, batchCheckSchema } from "../schemas/check.schemas";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import { CheckParameterType } from "@/features/plant/check-parameter/types/checkParameter.types";

export default function QualityCheck() {
  const { mutateAsync: createBatchCheck, isPending: isCreating } = useCreateBatchCheck();

  const { data: parameters, isLoading: parameterIsLoading } = useGetCheckParameters();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm<BatchCheckFormValues>({
    resolver: zodResolver(batchCheckSchema),
    defaultValues: batchCheckDefaultValues,
  });

  const { fields, replace, remove } = useFieldArray({
    control,
    name: "results",
  });

  // Initialize one result row per check parameter.
  useEffect(() => {
    if (!parameters) return;

    replace(
      parameters.map((item) => ({
        checkParameterId: item.id,
        value: "",
      })),
    );
  }, [parameters, replace]);

  const loading = isCreating || isSubmitting;

  const onSubmit = async (formData: BatchCheckFormValues) => {
    try {
      const res = await createBatchCheck(formData);

      toast.success(res.message ?? "Batch check saved successfully");
      reset({
        ...batchCheckDefaultValues,
        batchNo: formData.batchNo,
        stepNo: formData.stepNo,
        results: [],
      });
    } catch (error) {
      showApiError(error);
    }
  };

  const onInvalid = (formErrors: typeof errors) => {
    toast.error(showFormError(formErrors));
  };

  if (parameterIsLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-10 text-sm text-muted-foreground">
        <LoaderCircle className="h-4 w-4 animate-spin" />
        Loading check parameters...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4">
      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <h3 className="text-sm font-semibold">Quality Check</h3>
            <p className="text-xs text-muted-foreground">Enter results for the required check parameters.</p>
          </div>

          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{fields.length} Parameters</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-sm">
            <thead className="bg-muted/40 text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Parameter</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Specifications</th>
                <th className="px-4 py-3 font-medium">Result</th>
                <th className="w-20 px-4 py-3 text-center font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {fields.map((field, index) => {
                const item = parameters?.find((parameter) => parameter.id === field.checkParameterId);

                if (!item) return null;

                const quantitative = item.type === CheckParameterType.QUANTITATIVE;

                const allowedOptions = item.options?.filter((option) => option.isAllowed) ?? [];

                const notAllowedOptions = item.options?.filter((option) => !option.isAllowed) ?? [];

                return (
                  <tr key={field.id} className="align-top hover:bg-muted/20">
                    <td className="px-4 py-4">
                      <div className="font-medium">{item.name}</div>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          quantitative ? "bg-blue-500/10 text-blue-700 dark:text-blue-300" : "bg-violet-500/10 text-violet-700 dark:text-violet-300"
                        }`}
                      >
                        {quantitative ? "Quantitative" : "Qualitative"}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      {quantitative ? (
                        <div className="space-y-1 text-xs">
                          <div>
                            <span className="text-muted-foreground">Min: </span>
                            <span className="font-medium">{item.min}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Max: </span>
                            <span className="font-medium">{item.max}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 text-xs">
                          <div>
                            <div className="mb-1 text-muted-foreground">Allowed</div>
                            <div className="flex flex-wrap gap-1">
                              {allowedOptions.map((option, i) => (
                                <span key={i} className="rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-700 dark:text-emerald-300">
                                  {option.value}
                                </span>
                              ))}
                              {allowedOptions.length === 0 && "—"}
                            </div>
                          </div>

                          <div>
                            <div className="mb-1 text-muted-foreground">Not allowed</div>
                            <div className="flex flex-wrap gap-1">
                              {notAllowedOptions.map((option, i) => (
                                <span key={i} className="rounded-md bg-red-500/10 px-2 py-1 text-red-700 dark:text-red-300">
                                  {option.value}
                                </span>
                              ))}
                              {notAllowedOptions.length === 0 && "—"}
                            </div>
                          </div>
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <input
                        type="hidden"
                        {...register(`results.${index}.checkParameterId`, {
                          valueAsNumber: true,
                        })}
                      />

                      {quantitative ? (
                        <input
                          type="number"
                          step="any"
                          placeholder={`${item.min} – ${item.max}`}
                          {...register(`results.${index}.value`)}
                          className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                        />
                      ) : (
                        <select
                          {...register(`results.${index}.value`)}
                          className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                        >
                          <option value="">Select result</option>
                          {item.options?.map((option, i) => (
                            <option key={i} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                      )}

                      {errors.results?.[index]?.value && <p className="mt-1 text-xs text-destructive">{errors.results[index]?.value?.message}</p>}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        title="Remove parameter"
                        aria-label={`Remove ${item.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {fields.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-muted-foreground">
                    No check parameters added.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {errors.results?.root?.message && <p className="text-sm text-destructive">{errors.results.root.message}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || fields.length === 0}
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Results
        </button>
      </div>
    </form>
  );
}
