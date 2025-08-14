import React from "react";
import Link from "next/link";
import { useSession } from "@/app/context/session";
import Registerdialog from "./Registerdialog";

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", current: true },
  { name: "View Listings", href: "/listings", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Data = () => {
  const { session, logout } = useSession();
  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {session?.email && (
              <div className="flex gap-3 py-1 mb-2 overflow-hidden rounded-xl items-center">
                <span className="w-9 text-white flex items-center justify-center h-9 bg-Blueviolet rounded-xl font-bold text-lg">
                  {session.email[0]}
                </span>
                <span className="text-ellipsis opacity-25 overflow-hidden">
                  {session.email}
                </span>
              </div>
            )}
            <div>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "text-black hover:opacity-100"
                      : "hover:text-black hover:opacity-100",
                    "py-1 text-lg font-normal opacity-75 block"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {session?.email && (
              <button
                onClick={logout}
                className="bg-red/10 w-full mt-9 px-7 py-2 font-bold hover:scale-95 duration-300 text-red rounded-xl"
              >
                Sign out
              </button>
            )}

            {!session?.email && (
              <Registerdialog btnClass="bg-semiblueviolet w-full hover:bg-Blueviolet hover:text-white text-Blueviolet font-medium my-2 py-2 px-4 rounded" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
