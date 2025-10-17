import OffPlanClient from "@/components/off-plan/OffPlanClient";

export const metadata = {
  title: "Off-Plan Properties UAE | Earlybirds",
  description: "Invest in off-plan projects in UAE with Earlybirds Properties. Secure homes & high ROI in upcoming residential projects.",
};

export default async function OffPlanPropertiesPage({ searchParams }) {
  // Await searchParams for Next.js 15 compatibility
  const params = await searchParams;
  const propertyType = params?.propertyType || "";
  const emirate = params?.emirate || "";
  
  return <OffPlanClient propertyType={propertyType} emirate={emirate} />;
}
