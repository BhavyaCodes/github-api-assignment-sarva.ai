import Image from "next/image";
import { Inter } from "next/font/google";
import { useUserSearchText } from "@/context/userProfile.context";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Repository, UserProfile } from "@/types";
import loader from "@/assets/mona-loading-default.gif";
import PopularLanguagesChart from "@/components/PopularLanguagesChart";
import { PopularRepos } from "@/components/PopularRepos";

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

  const reposQuery = useQuery<Repository[]>({
    queryKey: ["users", userSearchText, "repo"],
    enabled: !!data?.login,
    queryFn: () =>
      axios
        .get(`https://api.github.com/users/${data?.login}/repos?per_page=999`)
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

  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto pt-8">
      <main className={` ${inter.className}`}>
        <div className="flex">
          <div className="basis-3/12 shrink-0 flex-col flex px-4   ">
            <div className="flex items-center">
              <img
                src={data.avatar_url}
                alt="avatar"
                className="w-full rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl text-slate-50 font-semibold">
                {data?.name}
              </h1>
              {data.html_url && (
                <h2 className="text-xl">
                  {
                    data.html_url.split("/")[
                      data.html_url.split("/").length - 1
                    ]
                  }
                </h2>
              )}
              {data.bio && <p className="mt-2">{data.bio}</p>}
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg>
                <span className="text-white ml-1">{data.followers}</span>
                <span className="ml-1">followers</span>
                <span className="ml-1">|</span>
                <span className="text-white ml-1">{data.following}</span>
                <span className="ml-1">following</span>
              </div>
              {data.blog && (
                <div className="flex items-center mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                  <a className="ml-1" href={data.blog}>
                    {data.blog}
                  </a>
                </div>
              )}
              {data.twitter_username && (
                <div className="flex items-center mt-4">
                  <svg
                    fill="#A6ADBA"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 -ml-1"
                    viewBox="0 0 1668.56 1221.19"
                  >
                    <g id="layer1" transform="translate(52.390088,-25.058597)">
                      <path
                        id="path1009"
                        d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99
		h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
                      />
                    </g>
                  </svg>
                  <a
                    className="ml-1"
                    target="_blank"
                    href={`https://twitter.com/${data.twitter_username}`}
                  >
                    @{data.twitter_username}
                  </a>
                </div>
              )}

              {data.email && (
                <div className="flex items-center mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>

                  <a className="ml-1" href={`mailto:${data.email}`}>
                    {data.email}
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="basis-9/12 grow">
            {reposQuery.data && (
              <>
                <PopularRepos
                  repoData={reposQuery.data}
                  username={data.login}
                />
                <PopularLanguagesChart
                  repoData={reposQuery.data}
                  username={data.login}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
