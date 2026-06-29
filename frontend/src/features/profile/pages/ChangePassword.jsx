import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

import { changePasswordSchema } from "../validation/changePassword.schema";

import useChangePassword from "../hooks/useChangePassword";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const {
    mutate,
    isPending,
  } = useChangePassword();

  return (
    <ScreenContainer className="bg-zinc-50 pb-20">

      <PageHeader title="Change Password" />

      <form
        onSubmit={handleSubmit(mutate)}
        className="mx-auto mt-6 flex max-w-xl flex-col gap-6 px-4"
      >

        <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">

          <div className="space-y-5">

            <Input
              label="Current Password"
              type="password"
              {...register("oldPassword")}
              error={errors.oldPassword?.message}
            />

            <Input
              label="New Password"
              type="password"
              {...register("newPassword")}
              error={errors.newPassword?.message}
            />

            <Input
              label="Confirm Password"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

          </div>

        </section>

        <Button
          type="submit"
          disabled={isPending}
        >
          {isPending
            ? "Updating..."
            : "Update Password"}
        </Button>

      </form>

    </ScreenContainer>
  );
}