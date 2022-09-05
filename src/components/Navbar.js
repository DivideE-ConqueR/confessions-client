import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  return (
    <div className="sticky top-0 p-4 flex justify-between items-center bg-white">
      <p className="text-2xl font-dynaPuff font-medium">Confessions</p>
      <div className="flex items-center space-x-6">
        <PlusIcon className="w-6 h-6 cursor-pointer" />
        <div className="bg-slate-400/20 hover:bg-slate-400/30 p-2 rounded-full cursor-pointer">
          <MagnifyingGlassIcon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
