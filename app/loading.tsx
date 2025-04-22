"use client";

import { ClipLoader } from "react-spinners";
const override = {
  display: "block",
  margin: "100px auto",
};
const Loading = () => {
  return <ClipLoader color="#3b82f6" cssOverride={override} size={150} />;
};

export default Loading;
