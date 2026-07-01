import { AlertTriangle } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ScreenContainer from "../../../components/ui/ScreenContainer";
import PageHeader from "../../../components/ui/PageHeader";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import BackButton from "../../../components/ui/BackButton";

import { deleteAccountSchema } from "../validation/deleteAccount.schema";

import useDeleteAccount from "../hooks/useDeleteAccount";

export default function DeleteAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(deleteAccountSchema),
  });

  const {
    mutate,
    isPending,
  } = useDeleteAccount();

  return (
    <ScreenContainer className="bg-zinc-50 pb-20">

      <PageHeader 
        title="Delete Account"
        leftNode={
          <BackButton />
        } 
      />

      <form
        onSubmit={handleSubmit(mutate)}
        className="mx-auto mt-6 flex max-w-xl flex-col gap-6 px-4"
      >

        <section className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3 text-red-600">

            <AlertTriangle size={24} />

            <h2 className="text-lg font-bold">
              Danger Zone
            </h2>

          </div>

          <p className="mt-5 text-sm leading-7 text-zinc-600">
            Deleting your account permanently removes your profile,
            hosted activities, joined activities and account data.
            This action cannot be undone.
          </p>

          <div className="mt-6">

            <Input
              label="Confirm Password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />

          </div>

        </section>

        <Button
          type="submit"
          disabled={isPending}
          className="bg-red-600 hover:bg-red-700"
        >
          {isPending
            ? "Deleting..."
            : "Delete Account"}
        </Button>

      </form>

    </ScreenContainer>
  );
}