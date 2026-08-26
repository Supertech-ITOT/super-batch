import Image from "next/image";

export default function SetupHeader() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-center">
                <Image
                    src="/icon.png"
                    alt="SuperBatch Icon"
                    priority
                    width={102}
                    height={102}
                    draggable={false}
                    className="object-contain"
                />
            </div>

            <div className="space-y-2 text-center">
                <h1 className="text-xl font-bold">
                    Welcome to SuperBatch
                </h1>

                <p className="text-sm leading-5 font-semibold text-primary">
                    Complete the initial setup by creating your organization
                    and the primary administrator account.
                </p>
            </div>
        </div>
    );
}