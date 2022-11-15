import { useContext } from "react";
import { AlertContext } from "../context/alertContext";

export function useAlert() {
  return useContext(AlertContext);
}
