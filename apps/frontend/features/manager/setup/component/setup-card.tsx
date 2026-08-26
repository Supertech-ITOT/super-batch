import { Card, CardContent, } from "@/common/components/ui/card";

import SetupHeader from "./setup-header";
import SetupModeSelector from "./setup-mode-selector";
import SecureSetup from "./secure-setup";

export default function SetupCard() {
    return (
        <Card className="w-full max-w-md rounded-2xl border bg-card/60 shadow-2xl backdrop-blur-xl">
            <CardContent className="p-4 sm:p-8">
                <div className="space-y-2">
                    <SetupHeader />
                    <SetupModeSelector />
                    <SecureSetup />
                </div>
            </CardContent>
        </Card>
    );
}