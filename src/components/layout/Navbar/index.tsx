import { useQuery } from "@tanstack/react-query";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUserSearchText } from "@/context/userProfile.context";

const Navbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setSearchText] = useUserSearchText();

  const handleSubmit: FormEventHandler = (e) => {
    const text = inputRef.current?.value;

    if (text) {
      setSearchText(text);
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
        <div className="w-10 rounded-full">
          <img src="/github-icon.svg" alt="logo" className="invert" />
        </div>
      </div>
      <div className="flex-none gap-2">
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
