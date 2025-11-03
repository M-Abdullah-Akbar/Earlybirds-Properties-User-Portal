import HomeClient from "@/components/home/HomeClient";

export const metadata = {
  title: "Buy, Sell & Rent Properties in Dubai | Earlybird",
  description: "Find luxury villas, apartments & commercial spaces in Dubai. Buy, sell or rent properties easily with Earlybird Properties.",
  verification: {
    google: "0OhWG1sDYTWm5afG1TBmeIeVq0U-5tt8KYxZh6HiUps",
  },
};

export default function Home() {
  return <HomeClient />;
}
