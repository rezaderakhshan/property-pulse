import Pagination from "@/components/pagination";
import PropertyCard, { PropertyCardProps } from "@/components/property-card";
import connectDB from "@/config/database";
import Property from "@/models/Property";

type PropertiesPageProps = {
  searchParams: {
    page: string;
    pageSize: string;
  };
};

const PropertiesPage = async ({
  searchParams: { page = "1", pageSize = "9" },
}: PropertiesPageProps) => {
  const skip = (+page - 1) * +pageSize;
  const total = await Property.countDocuments({});
  await connectDB();
  const properties = await Property.find<PropertyCardProps[]>({})
    .skip(skip)
    .limit(+pageSize);

  const showPagination = total > +pageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container mx-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                // @ts-ignore
                key={property._id?.toString()}
                // @ts-ignore
                property={property}
              />
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination page={+page} pageSize={+pageSize} totalItems={total} />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
