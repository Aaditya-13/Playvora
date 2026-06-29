import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { profileSchema } from "../validation/profile.schema";

import useAuthStore from "../../../store/authStore";

import useUpdateProfile from "./useUpdateProfile";
import useUpdateFavouriteSports from "./useUpdateFavouriteSports";
import useUpdateAvatar from "./useUpdateAvatar";

export default function useEditProfileForm() {
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const [avatarFile, setAvatarFile] = useState(null);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName ?? "",
      username: user?.username ?? "",
      bio: user?.bio ?? "",
      favouriteSports: user?.favouriteSports ?? [],
    },
  });

  const {
    mutateAsync: updateProfile,
    isPending: isUpdatingProfile,
  } = useUpdateProfile();

  const {
    mutateAsync: updateFavouriteSports,
    isPending: isUpdatingSports,
  } = useUpdateFavouriteSports();

  const {
    mutateAsync: updateAvatar,
    isPending: isUpdatingAvatar,
  } = useUpdateAvatar();

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await updateProfile({
        fullName: values.fullName,
        username: values.username,
        bio: values.bio,
      });

      await updateFavouriteSports({
        favouriteSports: values.favouriteSports,
      });

      if (avatarFile) {
        const formData = new FormData();

        formData.append("avatar", avatarFile);

        await updateAvatar(formData);
      }

      toast.success("Profile updated successfully.");

      navigate(-1);

    } catch (error) {
      console.error(error);
    }
  });

  return {
    user,
    
    form,

    avatarFile,
    setAvatarFile,

    onSubmit,

    isPending:
      isUpdatingProfile ||
      isUpdatingSports ||
      isUpdatingAvatar,
  };
}