import ApplicationCard from "./application-card";

export default function ApplicationView() {
    return (
        <div className="flex flex-col rounded-2xl border shadow  bg-card p-2 sm:p-4 flex-1 gap-2">
            <ApplicationCard />
        </div>
    );
}