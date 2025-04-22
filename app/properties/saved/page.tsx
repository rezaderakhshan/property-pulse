import PropertyCard from "@/components/property-card";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

const SavedPage = async () => {
  const user = await getSessionUser();

  const { bookmarks } = await User.findById(user?.userId).populate("bookmarks");
  console.log(bookmarks);
  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p>No Properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* @ts-ignore */}
            {bookmarks.map((property) => (
              <PropertyCard property={property} key={property._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPage;
