import { Link } from "react-router-dom";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="sticky top-0 flex items-center justify-between bg-white/50 p-4 backdrop-blur">
      <Link to="/">
        <p className="select-none font-dynaPuff text-2xl font-medium">
          Confessions
        </p>
      </Link>
      <div className="flex items-center space-x-6">
        <Link to="/new">
          <PlusIcon className="h-6 w-6 cursor-pointer" />
        </Link>
        <div className="cursor-pointer rounded-full bg-slate-400/20 p-2 hover:bg-slate-400/30">
          <Link to="/search">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}
