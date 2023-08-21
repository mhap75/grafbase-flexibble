"use client";

import { Menu } from "@headlessui/react";
import Image from "next/image";
import { memo, useId } from "react";

type CustomMenuProps = {
  title: string;
  filters: string[];
  value: string;
  name: string;
  onChange: (e: string) => void;
};

const CustomMenu: React.FC<CustomMenuProps> = ({
  title,
  filters,
  name,
  onChange,
  value,
}) => {
  const idPrefix = useId();
  const id = idPrefix + name;

  return (
    <div className="flexStart relative w-full flex-col gap-2">
      <label htmlFor={id} className="w-full text-gray-100">
        {title}
      </label>
      <Menu as="div" className="relative self-start">
        <div>
          <Menu.Button className="flexCenter custom_menu-btn">
            {value || "Select a category"}
            <Image
              src="/assets/images/arrow-down.svg"
              width={10}
              height={5}
              alt="Options"
            />
          </Menu.Button>
        </div>
        <Menu.Items className="flexStart custom_menu-items">
          {filters.map((tag) => (
            <Menu.Item key={tag}>
              <button
                value={tag}
                onClick={({ currentTarget }) => onChange(currentTarget.value)}
                className="custom_menu-item"
              >
                {tag}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default memo(CustomMenu);
