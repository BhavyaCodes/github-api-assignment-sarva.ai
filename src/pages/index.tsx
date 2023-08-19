import Image from "next/image";
import { Inter } from "next/font/google";
import { useUserSearchText } from "@/context/userProfile.context";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserProfile } from "@/types";
import loader from "@/assets/mona-loading-default.gif";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userSearchText] = useUserSearchText();

  const { data, error, isFetching, isLoading } = useQuery<UserProfile>({
    queryKey: ["users", userSearchText],
    enabled: !!userSearchText,
    queryFn: () =>
      axios
        .get(`https://api.github.com/users/${userSearchText}`, {
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_GITHUB_API_TOKEN,
          },
        })
        .then((res) => res.data),

    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <img src={loader.src} className="w-12 my-6" alt="loading animation" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        Error
      </div>
    );
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      dgdsfgdf
    </main>
  );
}
