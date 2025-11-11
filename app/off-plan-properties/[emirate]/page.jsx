import OffPlanClient from "@/components/off-plan/OffPlanClient";

// Map URL emirate slugs to proper emirate names for API
const emirateMap = {
  "dubai": "Dubai",
  "abu-dhabi": "Abu Dhabi",
  "sharjah": "Sharjah",
  "ajman": "Ajman",
  "ras-al-khaimah": "Ras Al Khaimah",
  "umm-al-quwain": "Umm Al Quwain",
  "fujairah": "Fujairah"
};

export async function generateMetadata({ params }) {
  const { emirate } = await params;
  const mappedEmirate = emirateMap[emirate.toLowerCase()] || emirate;
  
  return {
    title: `Off-Plan Properties in ${mappedEmirate} | Earlybirds`,
    description: `Invest in off-plan projects in ${mappedEmirate} with Earlybirds Properties. Secure homes & high ROI in upcoming residential projects.`,
  };
}

export default async function OffPlanEmiratePage({ params }) {
  // Await params for Next.js 15 compatibility
  const { emirate } = await params;
  
  // Map URL emirate slug to proper emirate name for API
  const mappedEmirate = emirateMap[emirate.toLowerCase()] || emirate;
  
  return <OffPlanClient propertyType="" emirate={mappedEmirate} />;
}

