export default function FormError({ msg }: { msg?: string }) {
    if (!msg) return null;

    return (
        <div className="bg-destructive/20 border border-destructive rounded-md px-2 py-1 text-destructive text-sm">
            {msg}
        </div>
    );
}