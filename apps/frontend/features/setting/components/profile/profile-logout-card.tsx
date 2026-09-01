"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { useLogout } from "@/features/manager/auth/hooks/use-auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { showApiError } from "@/common/lib/show-api-error";

export default function ProfileLogoutCard() {
  const { mutateAsync: logout, isPending } = useLogout();
  const router = useRouter();
  const onLogout = async () => {
    try {
      const res = await logout();
      toast.success(res.message ?? "LogOut Success");
      router.replace("/");
    } catch (error) {
      showApiError(error);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
          <LogOut className="size-4" />
        </div>

        <div>
          <h3 className="text-sm font-semibold">Logout</h3>

          <p className="text-xs text-muted-foreground">
            Sign out from your account
          </p>
        </div>
      </div>

      <Button
        size="sm"
        variant="destructive"
        onClick={onLogout}
        disabled={isPending}
        className="text-white"
      >
        {isPending ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
}
