import RentClient from "@/components/rent/RentClient";

export const metadata = {
  title: "Rent Properties in UAE | Earlybirds",
  description: "Find apartments, villas & commercial spaces for rent in UAE with Earlybirds Properties. Flexible rental options available.",
};

export default async function RentPage({ searchParams }) {
  return <RentClient searchParams={searchParams}/>;
}
