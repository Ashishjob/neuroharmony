import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { Menu } from "@headlessui/react";

const Register = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { user, error, isLoading } = useUser();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {user ? (
        <div>
          <Menu>
            <Menu.Button className="bg-purple hover:bg-purple text-white text-15px font-medium ml-8 py-4 px-5 rounded">
              {user.name}
            </Menu.Button>
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/profile"
                    className={`${
                      active ? 'bg-purple text-white w-full h-full' : 'text-black w-full'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/api/auth/logout"
                    className={`${
                      active ? 'bg-purple text-white w-full h-full' : 'text-black w-full'
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Logout
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      ) : (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  sm:pr-0">
          <div className="hidden md:block">
            <button
              className="bg-purple hover:bg-purple hover:text-white text-white text-15px font-medium ml-8 py-4 px-5 rounded"
              onClick={openModal}
            >
              <a href="/api/auth/login">Log In / Sign Up</a>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;