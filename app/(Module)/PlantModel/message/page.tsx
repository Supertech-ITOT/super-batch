import PlantTab from "@/features/plant/components/plant-tab";
import MessageView from "@/features/plant/components/view/message/message-view";


export default function MessagePage() {
    return (
        <div className="flex h-full flex-col overflow-hidden p-4 space-y-2">
            <PlantTab />
            <MessageView />
        </div>
    );
}