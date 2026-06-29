import { useNavigate } from "react-router";

import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";

import EditProfileHero from "../components/EditProfileHero";
import BasicInfoCard from "../components/BasicInfoCard";
import FavouriteSportsCard from "../components/FavouriteSportsCard";
import SaveProfileBar from "../components/SaveProfileBar";

import useEditProfileForm from "../hooks/useEditProfileForm";

export default function EditProfile() {
  const navigate = useNavigate();

  const {
    form,

    avatarFile,
    setAvatarFile,

    onSubmit,

    isPending,

    user,
  } = useEditProfileForm();

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  return (
    <ScreenContainer className="bg-zinc-50 pb-28">

      <PageHeader title="Edit Profile" />

      <form
        id="edit-profile-form"
        onSubmit={onSubmit}
        className="mx-auto mt-6 flex max-w-3xl flex-col gap-6 px-4"
      >

        <EditProfileHero
          user={user}
          avatarFile={avatarFile}
          setAvatarFile={setAvatarFile}
        />

        <BasicInfoCard
          register={register}
          errors={errors}
        />

        <FavouriteSportsCard
          watch={watch}
          setValue={setValue}
        />

      </form>

      <SaveProfileBar
        isPending={isPending}
        onCancel={() => navigate(-1)}
      />

    </ScreenContainer>
  );
}