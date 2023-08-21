/* eslint-disable @next/next/no-img-element */
import loader from "@/assets/mona-loading-default.gif";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <img src={loader.src} className="w-12 my-6" alt="loading animation" />
    </div>
  );
};
