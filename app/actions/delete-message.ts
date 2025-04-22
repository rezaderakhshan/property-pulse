"use server";
import cloudinary from "@/config/cloudinary";
import Message from "@/models/Message";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { ObjectId } from "mongoose";
import { revalidatePath } from "next/cache";

export const deleteMessage = async (messageId) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required!");
  }
  const { userId } = sessionUser;
  const message = await Message.findById(messageId);
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }
  await message.deleteOne();
  revalidatePath("/message", "page");
};
