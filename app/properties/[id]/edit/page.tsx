import PropertyEditForm from "@/components/property-edit-form";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToObject } from "@/utils/convertToObject";
type EditPageProps = {
  params: {
    id: string;
  };
};
const EditPage = async ({ params }: EditPageProps) => {
  await connectDB();

  const propertyDocs = await Property.findById(params.id).lean();
  const property = convertToObject(propertyDocs);

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default EditPage;
