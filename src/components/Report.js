import { useState } from "react";
import { usePost } from "../hooks/usePost";
import { ClickAwayListener } from "@mui/material";
import { EllipsisHorizontalIcon, FlagIcon } from "@heroicons/react/24/outline";

export default function Report({ id, postReported, setPostReported }) {
  const { addPostReport, isPostReported } = usePost();

  const [open, setOpen] = useState(false);

  const handlePostReport = () => {
    if (isPostReported(id) !== true) {
      addPostReport(id);
      setPostReported({ reported: true, synced: false });
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="relative">
        <button
          type="button"
          className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 rounded-full transition ease-in-out duration-150"
          onClick={() => setOpen((prev) => !prev)}
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
              onClick={handlePostReport}
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
