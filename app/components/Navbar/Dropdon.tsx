"use client";

import { Fragment, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { toast } from "sonner";
import { filterError } from "@/lib/helpers";
import { useRouter } from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ children }: { children: ReactNode }) {
  const router = useRouter();

  const signout = async () => {
    try {
      await axios.post("/api/auth/signout");
      toast.success("Signout successful");
      router.refresh();
    } catch (error) {
      toast.error(filterError(error));
    }
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex">{children}</Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-indigo-100 text-indigo-700" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm rounded-lg"
                  )}
                >
                  Transaction History
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-red-100 text-red-700" : "text-gray-700",
                    "block w-full px-4 text-red py-2 text-left text-sm rounded-lg"
                  )}
                  onClick={signout}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
