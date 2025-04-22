import PropertyCard from "@/components/property-card";
import PropertySearchForm from "@/components/property-search-form";
import Property from "@/models/Property";
import { convertToObject } from "@/utils/convertToObject";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

type PropertySearchResultPageProps = {
  searchParams: {
    location: string;
    propertyType: string;
  };
};
const PropertySearchResultsPage = async ({
  searchParams,
}: PropertySearchResultPageProps) => {
  const { location, propertyType } = searchParams;
  const locationPattern = new RegExp(location, "i");
  let query: {
    $or: (
      | { name: RegExp }
      | { description: RegExp }
      | { "location.street": RegExp }
      | { "location.city": RegExp }
      | { "location.zipcode": RegExp }
      | { "location.state": RegExp }
    )[];
    type?: RegExp;
  } = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.zipcode": locationPattern },
      { "location.state": locationPattern },
    ],
  };
  if (propertyType && propertyType !== "All") {
    const queryPropertyType = new RegExp(propertyType, "i");
    query.type = queryPropertyType;
  }
  const propertyQueryResults = await Property.find(query).lean();
  const properties = convertToObject(propertyQueryResults);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto flex flex-col items-start sm:px-4 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container mx-auto px-4 py-6">
          <Link
            href={"/properties"}
            className="flex items-center mb-3 text-blue-500 hover:underline"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back To Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* @ts-ignore */}
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertySearchResultsPage;
