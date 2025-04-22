"use client";
import { useSession } from "next-auth/react";
import { PropertyCardProps } from "./property-card";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { bookmarkProperty } from "@/app/actions/bookmark-property";
import { useEffect, useState } from "react";
import { CheckBookMarkStatus } from "@/app/actions/check-bookmark-status";
const BookmarkButton = ({ property }: PropertyCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to be signed in to bookmark a listing");
      return;
    }
    // @ts-ignore
    const res = await bookmarkProperty(property._id);
    // @ts-ignore
    if (res.error) return toast.error(res.error);
    setIsBookmarked(res.isBookmarked);
    toast.success(res.message);
  };

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    const check = async () => {
      // @ts-ignore
      const res = await CheckBookMarkStatus(property._id);
      // @ts-ignore
      if (res.error) return toast.error(res.error);
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setIsLoading(false);
    };
    check();
  }, [userId, property._id]);
  if (loading) return <p className="text-center">Loading...</p>;
  return isBookmarked ? (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className=" mr-2"></FaBookmark>Remove Bookmark
    </button>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className=" mr-2"></FaBookmark> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
