import { FormEventHandler, useEffect, useRef } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Lens = () => {
  return (
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
  );
};

const Navbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

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
      <div className="flex-1 hidden md:block">
        {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
        <Link href={"/"}>
          <div className="w-10 rounded-full">
            <img src="/github-icon.svg" alt="logo" className="invert" />
          </div>
        </Link>
      </div>
      <div className="grow md:grow-0 gap-2 items-center flex justify-between">
        <div className="form-control ">
          <div className="hidden md:block">
            <div
              onClick={() => {
                handleOpenModal();
              }}
              className="input input-bordered w-24 md:w-auto flex items-center"
            >
              <Lens />

              <p className="ml-2">Search </p>
              <code className="text-xs ml-2 bg-base-300 p-1 rounded">
                ctrl + k
              </code>
            </div>
          </div>

          <div
            className="flex items-center md:hidden"
            onClick={() => handleOpenModal()}
          >
            <Lens />
          </div>
        </div>
        <div className="flex items-center">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2 md:hidden stroke-emerald-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>

          {session ? (
            <div className="dropdown dropdown-end mt-1">
              <div tabIndex={0} className="avatar ml-2 cursor-pointer">
                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ">
                  {session.user?.image && <img src={session.user?.image} />}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40"
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
        </div>
        <dialog id="search_modal" className="modal items-start">
          <form
            method="dialog"
            className="modal-box mt-4 p-2 md:p-4"
            onSubmit={handleSubmit}
          >
            <div className="join w-full flex">
              <input
                type="text"
                className="input input-bordered join-item shrink grow w-auto"
                ref={inputRef}
                placeholder="Search username"
              />

              {/* <button className="btn" type="submit">
                Search
              </button> */}
              <div className="indicator">
                <button type="submit" className="btn join-item">
                  <Lens />
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
