import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, LoaderCircle, Save } from "lucide-react";
import { toast } from "sonner";

import { useGetCheckParameters } from "@/features/plant/check-parameter/hooks/use-qualityCheck";
import { CheckParameterType } from "@/features/plant/check-parameter/types/checkParameter.types";
import { useCreateBatchCheck } from "../hooks/use-check";
import { batchCheckDefaultValues, type BatchCheckFormValues, batchCheckSchema } from "../schemas/check.schemas";
import { showApiError } from "@/common/lib/show-api-error";
import { showFormError } from "@/common/lib/show-form-error";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { Badge } from "@/common/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/common/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/common/components/ui/table";

export default function QualityCheck() {
  const { mutateAsync: createBatchCheck, isPending: isCreating } = useCreateBatchCheck();
  const { data: parameters, isLoading: parameterIsLoading } = useGetCheckParameters();
  const {
    handleSubmit,
    reset,
    control,
    register,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<BatchCheckFormValues>({
    resolver: zodResolver(batchCheckSchema),
    defaultValues: batchCheckDefaultValues,
  });

  const { fields, replace, remove } = useFieldArray({ control, name: "results" });
  const results = useWatch({ control, name: "results" });

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
      reset({ ...batchCheckDefaultValues, batchNo: formData.batchNo, stepNo: formData.stepNo, results: [] });
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
      <Card className="overflow-hidden rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b px-4 py-3">
          <div className="space-y-1">
            <CardTitle className="text-sm font-semibold">Quality Check</CardTitle>
            <CardDescription className="text-xs">Enter results for the required check parameters.</CardDescription>
          </div>

          <Badge variant="secondary" className="rounded-full">
            {fields.length} Parameters
          </Badge>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="w-16 text-center">Sr. No.</TableHead>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Specifications</TableHead>
                  <TableHead className="min-w-48">Result</TableHead>
                  <TableHead className="w-20 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {fields.map((field, index) => {
                  const item = parameters?.find((parameter) => parameter.id === field.checkParameterId);

                  if (!item) return null;

                  const quantitative = item.type === CheckParameterType.QUANTITATIVE;

                  const allowedOptions = item.options?.filter((option) => option.isAllowed) ?? [];

                  const notAllowedOptions = item.options?.filter((option) => !option.isAllowed) ?? [];

                  return (
                    <TableRow key={field.id} className="align-top">
                      <TableCell className="py-4 text-center font-medium tabular-nums text-muted-foreground">{index + 1}</TableCell>
                      <TableCell className="py-4 font-medium">{item.name}</TableCell>
                      <TableCell className="py-4">
                        <Badge
                          variant="outline"
                          className={
                            quantitative
                              ? "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300"
                              : "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300"
                          }
                        >
                          {quantitative ? "Quantitative" : "Qualitative"}
                        </Badge>
                      </TableCell>

                      {/* Specifications */}
                      <TableCell className="py-4">
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
                          <div className="min-w-40 space-y-3">
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Allowed</p>

                              <div className="flex flex-wrap gap-1">
                                {allowedOptions.map((option, i) => (
                                  <Badge key={i} variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                                    {option.value}
                                  </Badge>
                                ))}

                                {allowedOptions.length === 0 && <span className="text-xs text-muted-foreground">—</span>}
                              </div>
                            </div>

                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">Not allowed</p>

                              <div className="flex flex-wrap gap-1">
                                {notAllowedOptions.map((option, i) => (
                                  <Badge key={i} variant="secondary" className="bg-destructive/10 text-destructive">
                                    {option.value}
                                  </Badge>
                                ))}

                                {notAllowedOptions.length === 0 && <span className="text-xs text-muted-foreground">—</span>}
                              </div>
                            </div>
                          </div>
                        )}
                      </TableCell>

                      {/* Result input */}
                      <TableCell className="py-4">
                        <input type="hidden" {...register(`results.${index}.checkParameterId`, { valueAsNumber: true })} />

                        {quantitative ? (
                          <Input
                            type="number"
                            step="any"
                            min={item.min}
                            max={item.max}
                            placeholder={`${item.min} – ${item.max}`}
                            className="h-9 rounded-xl"
                            {...register(`results.${index}.value`)}
                          />
                        ) : (
                          <Select
                            value={results?.[index]?.value ?? ""}
                            onValueChange={(value) =>
                              setValue(`results.${index}.value`, value, {
                                shouldValidate: true,
                                shouldDirty: true,
                              })
                            }
                          >
                            <SelectTrigger className="h-9 rounded-xl">
                              <SelectValue placeholder="Select result" />
                            </SelectTrigger>

                            <SelectContent>
                              {item.options?.map((option, i) => (
                                <SelectItem key={i} value={option.value}>
                                  {option.value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}

                        {errors.results?.[index]?.value && <p className="mt-1 text-xs text-destructive">{errors.results[index]?.value?.message}</p>}
                      </TableCell>

                      {/* Delete row */}
                      <TableCell className="py-4 text-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => remove(index)}
                          title="Remove parameter"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {fields.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-sm text-muted-foreground">
                      No check parameters added.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {errors.results?.root?.message && <p className="text-sm text-destructive">{errors.results.root.message}</p>}

      <div className="flex justify-end">
        <Button type="submit" disabled={loading || fields.length === 0} className="rounded-xl">
          {loading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Results
        </Button>
      </div>
    </form>
  );
}
