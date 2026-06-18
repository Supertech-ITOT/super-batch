"use client";
import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";
import { MessageSquareQuote, Plus } from "lucide-react";
import { useState } from "react";
import CreateMessageDialog from "../../menu-dialog/message/create-message-dialog";
import DataTable from "./data-table";
import { useGetMessages } from "@/features/plant/hooks/use-messages";
import { columns } from "./columns";
import UpdateMessageDialog from "../../menu-dialog/message/update-message-dialog";
import { Skeleton } from "@/common/components/ui/skeleton";
import DeleteMessageDialog from "../../menu-dialog/message/delete-message-dialog";

type MessageAction = "create" | "edit" | "delete";
export type MessageDialogState = {
    open: boolean;
    action: MessageAction | null;
    messageId: number | null;
};
export default function MessageView() {
    const [dialog, setDialog] = useState<MessageDialogState>({ open: false, action: null, messageId: null, });
    const { data: messages, isLoading: messagesLoading } = useGetMessages();
    const loading = messagesLoading || !messages;
    const closeDialog = () =>
        setDialog({ open: false, action: null, messageId: null, });

    if (loading) {
        return (
            <Skeleton className="h-full" />
        );
    }
    return (
        <div className="flex-1 rounded-lg border shadow h-full bg-card p-4 overflow-y-auto scrollbar-none flex-col">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <div className="size-28 flex items-center justify-center border rounded-md shadow shrink-0">
                        <MessageSquareQuote className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Messages</h1>
                        <p className="text-sm text-muted-foreground"> Create and manage predefined messages for batch recipes, improving consistency and reducing manual entry.</p>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <Button className="text-white" onClick={() => setDialog({ open: true, action: "create", messageId: null })}>
                        <Plus className="size-5!" />
                        Add Messages
                    </Button>
                    {
                        <>
                            {dialog.action === "create" && (
                                <CreateMessageDialog open onClose={closeDialog} />)}
                            {dialog.action === "edit" && dialog.messageId !== null && (
                                <UpdateMessageDialog open={dialog.open} messageId={dialog.messageId} onClose={closeDialog} />)}
                            {dialog.action === "delete" && dialog.messageId !== null && (
                                <DeleteMessageDialog open={dialog.open} messageId={dialog.messageId} onClose={closeDialog} />)}
                        </>
                    }
                </div>
            </div>
            <Separator className="my-4" />
            <div className="flex-1 min-h-0 my-4">
                <DataTable
                    columns={columns(setDialog)}
                    data={messages}
                />
            </div>
        </div>
    );
}