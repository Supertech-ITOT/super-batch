import { Dialog } from "@/common/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema, RecipeSchema } from "../schemas/recipe-schema";
import { useCreateRecipe } from "../hooks/use-recipe";



type Props = { open: boolean; onClose: () => void; };
export default function CreateRecipeDialog({ open, onClose }: Props) {
    const { mutateAsync: createRecipe, isPending: isCreating } = useCreateRecipe();
    const { register, handleSubmit, reset, watch, control, formState: { isSubmitting, isDirty } } = useForm<RecipeSchema>({
        resolver: zodResolver(recipeSchema),
        defaultValues: { name: "", description: "", batchSize: 0, batchSizeUom: "", }
    });
    const loading = isSubmitting || isCreating

    const handleClose = () => {
        reset({ name: "", description: "", batchSize: 0, batchSizeUom: "", });
        onClose();
    };
    return (
        <Dialog open={open} onOpenChange={(value) => { if (!value) handleClose() }}>

        </Dialog>
    )
}