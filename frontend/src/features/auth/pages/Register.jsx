import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import AuthContainer from "../../../components/shared/AuthContainer";
import ColdStartNotice from "../../../components/shared/ColdStartNotice";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Logo from "../../../components/ui/Logo";

import ROUTES from "../../../constants/routes";

import registerSchema from "../validation/register.schema";
import useRegister from "../hooks/useRegister";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegister();

  const onSubmit = async (values) => {
    try {
      await registerMutation.mutateAsync(values);

      toast.success("Account created successfully");

      navigate(ROUTES.LOGIN);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ??
          "Registration failed"
      );
    }
  };

  return (
    <AuthContainer>
      <Logo />

      <h1 className="mt-6 text-3xl font-bold">
        Create Account
      </h1>

      <p className="mt-2 text-sm text-zinc-600">
        Join Playvora today.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
      >
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          {...register("fullName")}
          error={errors.fullName?.message}
        />

        <Input
          label="Username"
          placeholder="Choose a username"
          {...register("username")}
          error={errors.username?.message}
        />

        <Input
          label="Email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          {...register("password")}
          error={errors.password?.message}
        />

        <Button
          loading={registerMutation.isPending}
          type="submit"
        >
          Create Account
        </Button>
      </form>

      <ColdStartNotice />

      <p className="mt-8 text-center text-sm text-zinc-600">
        Already have an account?{" "}
        <Link
          to={ROUTES.LOGIN}
          className="font-semibold text-green-600"
        >
          Sign In
        </Link>
      </p>
    </AuthContainer>
  );
}