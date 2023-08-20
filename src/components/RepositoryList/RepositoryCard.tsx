import { Repository } from "@/types";
import React, { FC } from "react";
import { languageColors } from "@/assets/language-colors";

export const RepositoryCard: FC<Repository> = ({
  id,
  language,
  name,
  stargazers_count,
  html_url,
  forks,
  description,
}) => {
  return (
    <div className="rounded border-2 border-base-200 m-2 p-2">
      <a
        target="_blank"
        className="link link-accent font-semibold"
        href={html_url}
      >
        {name}
      </a>
      <p>{description}</p>
      <div className="flex items-center mt-2">
        {language && (
          <>
            <div
              className="rounded-full w-3 h-3"
              style={{
                backgroundColor: languageColors[language].color || undefined,
              }}
            />
            <p className="ml-1 text-xs">{language}</p>
          </>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
        <p className="ml-1 text-xs">{stargazers_count}</p>
        <svg
          aria-label="forks"
          role="img"
          // height="16"
          viewBox="0 0 16 16"
          version="1.1"
          // width="16"
          data-view-component="true"
          stroke="currentColor"
          className="h-3 w-3 ml-2"
          // className="octicon octicon-repo-forked"
        >
          <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
        </svg>
        <p className="ml-1 text-xs">{forks}</p>
      </div>
    </div>
  );
};
