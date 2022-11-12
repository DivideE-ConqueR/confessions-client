import { CircularProgress } from "@mui/material";

export default function Loader() {
  return (
    <div id="loader" className="h-[80vh] sm:h-[83vh] grid place-items-center">
      <CircularProgress />
    </div>
  );
}
