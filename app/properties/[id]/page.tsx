import BookmarkButton from "@/components/bookmark-button";
import { PropertyCardProps } from "@/components/property-card";
import PropertyContactForm from "@/components/property-contact-form";
import PropertyDetails from "@/components/property-details";
import PropertyHeaderImage from "@/components/property-header-image";
import PropertyImages from "@/components/property-images";
import ShareButton from "@/components/share-button";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToObject } from "@/utils/convertToObject";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
type PropetyePageProps = {
  params: { id: string };
};
const PropertyPage = async ({ params }: PropetyePageProps) => {
  await connectDB();
  const { id } = params;
  const propertyDoc = await Property.findById<PropertyCardProps>(id).lean();
  const property = convertToObject(propertyDoc);
  if (!property?.name)
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    );
  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>

      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* @ts-ignore */}
            <PropertyDetails property={property} />
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButton property={property} />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
