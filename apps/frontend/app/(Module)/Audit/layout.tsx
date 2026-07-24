import AuditNav from "@/features/audit/components/audit-nav";

export default function AuditLayout({ children }: Readonly<{ children: React.ReactNode; }>){
    return(
        <div className="h-screen flex flex-col overflow-hidden">
            <AuditNav/>
                    <main className="flex-1 min-h-0 overflow-hidden">
                        {children}
                    </main>
                </div>
    )

}