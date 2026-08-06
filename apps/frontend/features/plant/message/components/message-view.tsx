"use client";
import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";
import { MessageSquareQuote, Plus } from "lucide-react";
import { useState } from "react";
import CreateMessageDialog from "./create-message-dialog";
import { useGetMessages } from "@/features/plant/message/hooks/use-messages";
import { columns } from "./columns";
import UpdateMessageDialog from "./update-message-dialog";
import DeleteMessageDialog from "./delete-message-dialog";
import FeedbackState from "@/common/components/feedback-state";
import MessageSkeleton from "./message-skeleton";
import DataTableSearch from "@/common/components/data-table/data-table-search";
import { DataTable } from "@/common/components/data-table/data-table";

type MessageAction = "create" | "edit" | "delete";
export type MessageDialogState = {
    open: boolean;
    action: MessageAction | null;
    messageId: number | null;
};
export default function MessageView() {
    const [dialog, setDialog] = useState<MessageDialogState>({ open: false, action: null, messageId: null, });
    const { data: messages, isLoading: messagesLoading, isError: messagesIsError } = useGetMessages();
    const loading = messagesLoading;
    const error = messagesIsError;
    const closeDialog = () =>
        setDialog({ open: false, action: null, messageId: null, });
    if (loading) {
        return (<MessageSkeleton />);
    }
    if (error) {
        return <FeedbackState variant="error" />;
    }
    if (!messages) {
        return <FeedbackState variant="empty" />;
    }

    return (
        <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1">
            <div className="flex justify-between flex-wrap gap-2">
                <div className="flex gap-3">
                    <div className="size-28 flex items-center justify-center border rounded-2xl shadow shrink-0">
                        <MessageSquareQuote className="size-16 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl uppercase tracking-wider text-primary">Messages</h1>
                        <p className="text-sm text-muted-foreground"> Create and manage predefined messages for batch recipes, improving consistency and reducing manual entry.</p>
                    </div>
                </div>
            </div>
            <Separator className="my-2" />
            <DataTable
                columns={columns(setDialog)}
                data={messages ?? []}
                pageSize={10}
                toolbar={(table) => (
                    <div className="flex items-center gap-2">
                        <DataTableSearch table={table} column="name" placeholder="Search messages..." />
                        <Button className="ml-auto text-white h-8 sm:h-10" onClick={() => setDialog({ open: true, action: "create", messageId: null })}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Messages
                        </Button>
                    </div>
                )}
            />
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
    );
}