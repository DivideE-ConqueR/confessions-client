import { CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <div id="loader" className="grid h-[80vh] place-items-center sm:h-[83vh]">
      <CircularProgress />
    </div>
  );
}
