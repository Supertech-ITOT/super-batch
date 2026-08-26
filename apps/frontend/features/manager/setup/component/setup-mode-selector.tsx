"use client";

import { Cloud, HardDrive } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/common/components/ui/tabs";
import OnlineSetup from "./online-setup";
import OfflineSetup from "./offline-setup";


export default function SetupModeSelector() {
    return (
        <Tabs defaultValue="online" className="w-full gap-0!">
            <TabsList className="grid w-full grid-cols-2 bg-card">
                <TabsTrigger value="online">
                    <Cloud className="mr-2 size-4" />
                    Online
                </TabsTrigger>

                <TabsTrigger value="offline">
                    <HardDrive className="mr-2 size-4" />
                    Offline
                </TabsTrigger>
            </TabsList>

            <TabsContent value="online" className="mt-4">
                <OnlineSetup />
            </TabsContent>

            <TabsContent value="offline" className="mt-4">
                <OfflineSetup />
            </TabsContent>
        </Tabs>
    );
}