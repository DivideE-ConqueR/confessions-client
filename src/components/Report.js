import { useState } from "react";
import { ClickAwayListener } from "@mui/material";
import { EllipsisHorizontalIcon, FlagIcon } from "@heroicons/react/24/outline";

export default function Report() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="relative">
        <button
          type="button"
          className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 rounded-full transition ease-in-out duration-150"
          onClick={handleClick}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <EllipsisHorizontalIcon className="w-6 text-gray-500" />
        </button>
        <div
          className={`${
            open ? "block" : "hidden"
          } absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <button
              type="submit"
              className="w-full px-4 py-2 flex space-x-3 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
            >
              <FlagIcon className="w-5 text-red-500" />
              <span>Report</span>
            </button>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
}
