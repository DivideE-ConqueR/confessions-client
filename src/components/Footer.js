import { HeartIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="p-4 text-center">
      &copy; {year} | Developed with{" "}
      <HeartIcon className="inline w-5 text-rose-500" /> by{" "}
      <a
        className="underline"
        href="https://github.com/dividee-conquer"
        target="_blank"
        rel="noreferrer"
      >
        Divide-Conquer
      </a>
    </footer>
  );
}
