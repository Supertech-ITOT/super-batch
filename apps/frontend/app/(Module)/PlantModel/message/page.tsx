import PlantTab from "@/features/plant/common/components/plant-tab";
import MessageView from "@/features/plant/message/components/message-view";


export default function MessagePage() {
    return (
        <div className="flex flex-col p-1 h-full w-full min-h-0 flex-1 overflow-hidden sm:p-2 gap-1">
            <PlantTab />
            <MessageView />
        </div>
    );
}