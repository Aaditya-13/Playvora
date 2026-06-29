import useAuthStore from "../../../store/authStore.js";

export default function useProfile() {
  const { user } = useAuthStore();

  return {
    user,
    isLoading: false,
    isError: false,
  };
}