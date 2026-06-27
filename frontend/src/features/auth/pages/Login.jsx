import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AuthContainer from "../../../components/shared/AuthContainer";
import ColdStartNotice from "../../../components/shared/ColdStartNotice";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Logo from "../../../components/ui/Logo";

import ROUTES from "../../../constants/routes";

import loginSchema from "../validation/login.schema";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const onSubmit = async (values) => {
    try {
      await loginMutation.mutateAsync(values);

      toast.success("Logged in successfully");

      console.log("TODO: Bootstrap + Navigate");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Login failed"
      );
    }
  };

  return (
    <AuthContainer>
      <Logo />

      <h1 className="mt-6 text-3xl font-bold">
        Welcome Back
      </h1>

      <p className="mt-2 text-sm text-zinc-600">
        Sign in to continue to PlayNear.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
      >
        <Input
          label="Email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button
          loading={loginMutation.isPending}
          type="submit"
        >
          Sign In
        </Button>
      </form>

      <ColdStartNotice />

      <p className="mt-8 text-center text-sm text-zinc-600">
        Don't have an account?{" "}
        <Link
          to={ROUTES.REGISTER}
          className="font-semibold text-green-600"
        >
          Register
        </Link>
      </p>
    </AuthContainer>
  );
}