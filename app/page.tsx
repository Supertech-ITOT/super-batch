import FeatureCard from "@/components/featurecard";
import FooterCard from "@/components/footercard";
import LoginCard from "@/components/logincard";
import { Activity, BadgeCheck, FileText, Layers3, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-row">
      <div className="absolute inset-0 bg-cover bg-center">
        <Image src="/light-bg.png"
          alt="Background"
          fill
          className="pointer-events-none select-none object-cover"
          priority
          draggable={false}
        />
        <div className="absolute inset-0 bg-background/20" />
      </div>
      <div className="xl:flex hidden flex-1 flex-col gap-4">
        <div className="relative h-full top-10 left-10 z-10 flex flex-col w-full">
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


