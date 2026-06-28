import { format } from "date-fns";

export const formatDate = (date) =>
  format(new Date(date), "dd MMM");

export const formatTime = (date) =>
  format(new Date(date), "hh:mm a");

export const capitalize = (text = "") =>
  text.charAt(0).toUpperCase() + text.slice(1);