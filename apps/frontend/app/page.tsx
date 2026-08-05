import FeatureCard from "@/common/components/featurecard";
import FooterCard from "@/common/components/footercard";
import LoginCard from "@/features/manager/auth/components/login-form";
import SetupView from "@/features/manager/setup/component/setup-view";

import { Activity, BadgeCheck, FileText, Layers3, ShieldCheck } from "lucide-react";
import Image from "next/image";
const finfo = [
  { icon: Layers3, title: "ISA-88", subtitle: "Compliant" },
  { icon: Activity, title: "Real-time", subtitle: "Monitoring" },
  { icon: FileText, title: "Recipe", subtitle: "Management" },
  { icon: ShieldCheck, title: "Audit", subtitle: "Compliance" },
  { icon: BadgeCheck, title: "Scalable", subtitle: "Secure" },
]

export default function Home() {
  return (
    <div className="h-full min-h-0 w-full flex flex-row overflow-hidden relative">
      <div className="absolute inset-0">
        <Image
          src="/light-bg.png"
          alt="Background"
          fill
          priority
          draggable={false}
          className="object-cover dark:hidden"
        />

        <Image
          src="/dark-bg.png"
          alt="Background"
          fill
          priority
          draggable={false}
          className="hidden object-cover dark:block"
        />
      </div>
      <div className="xl:flex hidden flex-1 flex-col ">
        <div className="relative z-10 flex flex-col h-full px-10 pt-10">
          <div className="flex z-10 select-none">
            <Image
              src="/superbatch-light.png"
              alt="SuperBatch Light Logo"
              priority
              width={640}
              height={100}
              draggable={false}
              sizes="(max-width: 768px) 320px, 640px"
              className="h-auto w-auto object-contain dark:hidden"
            />
            <Image
              src="/superbatch-dark.png"
              alt="SuperBatch Dark Logo"
              priority
              width={640}
              height={100}
              draggable={false}
              sizes="(max-width: 768px) 320px, 640px"
              className="h-auto w-auto object-contain hidden dark:block"
            />
          </div>
          <div className="mt-8">
            <h2 className="text-3xl font-bold">
              Enterprise Batch Management Solution
            </h2>
            <p className="text-md font-semibold leading-5 text-muted-foreground  max-w-xl text-justify mt-3">
              SuperBatch is an advanced ISA-88 based batch management system
              designed for process industries to achieve operational
              excellence, product quality and regulatory compliance.
            </p>
          </div>
          {/* Features */}
          <div className="mt-12 flex flex-wrap gap-6">
            {finfo.map((item) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 justify-center items-center p-2">
        <SetupView />
      </div>
      <FooterCard />
    </div >
  )
}


