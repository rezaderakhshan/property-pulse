"use server";
import cloudinary from "@/config/cloudinary";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { ObjectId } from "mongoose";
import { revalidatePath } from "next/cache";

export const deleteProperty = async (propertyId: ObjectId) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required!");
  }
  const { userId } = sessionUser;
  const property = await Property?.findById(propertyId);
  if (!property) throw new Error("Property Not Found");

  if (property?.owner.toString() !== userId) throw new Error("Unauthorized");
  const publicIds = property?.images.map((imageUrl: string) => {
    const parts = imageUrl.split("/");
    return parts.at(-1)?.split(".").at(0);
  });
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("PropertyPulse/" + publicId);
    }
  }
  await property.deleteOne();
  revalidatePath("/", "layout");
};
