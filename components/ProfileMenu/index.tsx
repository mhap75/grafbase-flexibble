"use client";

import { SessionInterface } from "@/common.type";
import { profileMenuLinks } from "@/constants";
import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flexCenter relative z-10 flex-col">
      <Menu as="div">
        <Menu.Button
          className="flexCenter"
          onMouseEnter={() => setOpenModal(true)}
        >
          {session?.user?.image && (
            <Image
              src={session.user.image}
              width={40}
              height={40}
              className="rounded-full"
              alt="user profile image"
            />
          )}
        </Menu.Button>

        <Transition
          show={openModal}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="flexStart profile_menu-items"
            onMouseLeave={() => setOpenModal(false)}
          >
            <div className="flex flex-col items-center gap-y-4">
              {session?.user?.image && (
                <Image
                  src={session?.user?.image}
                  className="rounded-full"
                  width={80}
                  height={80}
                  alt="profile Image"
                />
              )}
              <p className="text-center font-semibold">{session?.user?.name}</p>
            </div>

            <div className="flex w-full flex-col items-start gap-3 pt-10">
              {profileMenuLinks.map((link) => (
                <Menu.Item key={link.key}>
                  <Link
                    href={`/profile/${session?.user?.id}/${link.href}`}
                    as={`/profile/${session?.user?.email.split("@")[0]}/${
                      link.href
                    }`}
                    className="text-sm hover:text-primary-purple"
                  >
                    {link.text}
                  </Link>
                </Menu.Item>
              ))}
            </div>
            <div className="flexStart mt-5 w-full border-t border-nav-border pt-5">
              <Menu.Item>
                <button
                  type="button"
                  className="w-full rounded-lg p-2 text-sm text-red-600 hover:bg-red-100"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
