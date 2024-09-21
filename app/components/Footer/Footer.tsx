import Link from "next/link";
import Image from "next/image";

// MIDDLE LINKS DATA
interface ProductType {
  id: number;
  section: string;
  link: string[];
}

const products: ProductType[] = [
  {
    id: 1,
    section: "Company",
    link: ["About us", "Blog", "Contact us", "Pricing", "Testimonials"],
  },
  {
    id: 2,
    section: "Support",
    link: [
      "Help center",
      "Terms of service",
      "Legal",
      "Privacy Policy",
      "Status",
    ],
  },
];

const footer = () => {
  return (
    <div className="bg-bgpurple" id="first-section">
      <div className="mx-auto max-w-2xl pt-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
          {/* COLUMN-1 */}

          <div className="col-span-4">
            <Image
              width={48}
              height={48}
              className="block w-12 lg:hidden"
              src={"/assets/logo/logo.svg"}
              alt="Courses-Logo"
            />
            <h3 className="text-white text-lg font-medium leading-9 mb-4 lg:mb-20">
              {" "}
                Neuroharmony is a platform that connects you with your community
            </h3>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default footer;
