import PropertiesClient from "@/components/properties/PropertiesClient";

export const metadata = {
  title: "All Properties in UAE | Earlybirds",
  description: "Browse all available properties in UAE. Find your perfect home or investment opportunity with Earlybirds Properties.",
};

export default async function PropertiesPage({ searchParams }) {
  return (
    <>
      <PropertiesClient searchParams={searchParams} />
    </>
  );
}
