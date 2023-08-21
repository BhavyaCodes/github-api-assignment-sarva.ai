import { useQuery } from "@tanstack/react-query";
import { FormEventHandler, useEffect, useRef } from "react";
import axios from "axios";

import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  console.log(session);
  // const [, setSearchText] = useUserSearchText();

  const handleSubmit: FormEventHandler = (e) => {
    const text = inputRef.current?.value;

    if (text) {
      // setSearchText(text);
      router.push(`/user/${text}`);
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    const listener = function (this: Window, e: KeyboardEvent) {
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault();
        handleOpenModal();
      }
    };

    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  }, []);

  function handleOpenModal() {
    //@ts-ignore
    window.search_modal.showModal();
  }

  return (
    <div className="navbar bg-base-300 max-h-16 px-4">
      <div className="flex-1">
        {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
        <Link href={"/"}>
          <div className="w-10 rounded-full">
            <img src="/github-icon.svg" alt="logo" className="invert" />
          </div>
        </Link>
      </div>
      <div className="flex gap-2 items-end">
        <div className="form-control">
          <div
            onClick={(e) => {
              e.preventDefault();
              // @ts-ignore
              // window.search_modal.showModal();
              handleOpenModal();
            }}
            className="input input-bordered w-24 md:w-auto flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>

            <p className="ml-2">Search </p>
            <code className="text-xs ml-2 bg-base-300 p-1 rounded">
              ctrl + k
            </code>
          </div>
        </div>
        {session ? (
          <div className="dropdown dropdown-end mb-1">
            <div tabIndex={0} className="avatar ml-2 cursor-pointer">
              <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ">
                {session.user?.image && <img src={session.user?.image} />}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
            >
              <button
                onClick={() => signOut()}
                className="btn btn-sm btn-error"
              >
                logout
              </button>
              <span className="p-2">{session.user?.name}</span>
            </ul>
          </div>
        ) : (
          <button onClick={() => signIn()} className="btn btn-accent">
            Sign in
          </button>
        )}
        <dialog id="search_modal" className="modal items-start">
          <form
            method="dialog"
            className="modal-box mt-4"
            onSubmit={handleSubmit}
          >
            <div className="join">
              <input
                type="text"
                className="input input-bordered join-item w-24 md:w-auto"
                ref={inputRef}
                placeholder="Search username"
              />

              {/* <button className="btn" type="submit">
                Search
              </button> */}
              <div className="indicator">
                <button type="submit" className="btn join-item">
                  Search
                </button>
              </div>
            </div>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        {/* @ts-ignore */}
        {/* <button onClick={() => window.search_modal.showModal()}>
          view modal
        </button> */}
        {/* <div className="dropdown dropdown-end"> */}
        {/* <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/github-icon.svg" alt="logo" className="invert" />
            </div>
          </label> */}
        {/* <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Navbar;
