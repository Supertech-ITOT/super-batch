import PlantTab from "@/features/plant/common/components/plant-tab";
import MessageView from "@/features/plant/message/components/message-view";


export default function MessagePage() {
    return (
        <div className="flex h-full flex-col overflow-hidden p-4 space-y-2">
            <PlantTab />
            <MessageView />
        </div>
    );
}