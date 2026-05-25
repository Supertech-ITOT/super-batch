import FeatureCard from "@/features/login/components/featurecard";
import FooterCard from "@/features/login/components/footercard";
import LoginCard from "@/features/login/components/logincard";
import { Activity, BadgeCheck, FileText, Layers3, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-row overflow-hidden relative">
      <div className="absolute inset-0">
        <Image
          src="/light-bg.png"
          alt="Background"
          fill
          priority
          className="object-cover dark:hidden"
        />

        <Image
          src="/dark-bg.png"
          alt="Background"
          fill
          priority
          className="hidden object-cover dark:block"
        />
      </div>
      <div className="xl:flex hidden flex-1 flex-col gap-4">
        <div className="relative z-10 flex flex-col h-full px-10 pt-10">
          <div className="flex justify-start z-10 mt-10">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 shadow-lg backdrop-blur-md">
                <h1 className="text-6xl font-extrabold tracking-tight text-primary">
                  S
                </h1>
              </div>
              {/* Title */}
              <div className="flex flex-col">
                <h1 className="text-5xl font-extrabold">
                  SUPER
                  <span className="ml-1 text-primary">BATCH</span>
                </h1>

                <p className="mt-1 text-sm font-medium tracking-wide text-muted-foreground">
                  Batch Control | Manufacturing Excellence
                </p>
              </div>
            </div>
          </div>
          <div className="mt-20">
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
            <FeatureCard
              icon={Layers3}
              title="ISA-88"
              subtitle="Compliant"
            />

            <FeatureCard
              icon={Activity}
              title="Real-time"
              subtitle="Monitoring"
            />

            <FeatureCard
              icon={FileText}
              title="Recipe"
              subtitle="Management"
            />

            <FeatureCard
              icon={ShieldCheck}
              title="Audit"
              subtitle="Compliance"
            />

            <FeatureCard
              icon={BadgeCheck}
              title="Scalable"
              subtitle="Secure"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 justify-center items-center p-2">
        <LoginCard />
      </div>
      <FooterCard />
    </div >
  )
}


