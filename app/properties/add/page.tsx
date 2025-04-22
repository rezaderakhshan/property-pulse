import PropertyAddForm from "@/components/property-add-form";

const AddPropertyPage = () => {
  return (
    <section className="bg-blue-500">
      <div className="container m-auto max-w-2xl py-24">
        <div className="container px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default AddPropertyPage;
