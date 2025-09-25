import OffPlanClient from "@/components/off-plan/OffPlanClient";

export const metadata = {
  title: "Off-Plan Properties UAE | Earlybirds",
  description: "Invest in off-plan projects in UAE with Earlybirds Properties. Secure homes & high ROI in upcoming residential projects.",
};

export default async function OffPlanPropertiesPage({ searchParams }) {
  return (
    <>
      <OffPlanClient searchParams={searchParams} />
    </>
  );
}
