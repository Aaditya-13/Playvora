import { Link } from "react-router-dom";

import Button from "../../../components/ui/Button";
import Logo from "../../../components/ui/Logo";
import ScreenContainer from "../../../components/ui/ScreenContainer";

import ROUTES from "../../../constants/routes";

export default function Landing() {
  return (
    <ScreenContainer className="justify-center">
      <div className="mx-auto w-full max-w-sm text-center">
        <Logo />

        <h1 className="mt-8 text-3xl font-bold text-zinc-900">
          Find your next game.
        </h1>

        <p className="mt-3 text-zinc-600">
          Discover nearby sports activities, join games instantly,
          or organize your own.
        </p>

        <div className="mt-12 space-y-4">
          <Link to={ROUTES.LOGIN} className="block">
            <Button>Sign In</Button>
          </Link>

          <Link to={ROUTES.REGISTER} className="block">
            <Button variant="outline">Create Account</Button>
          </Link>

          <Button variant="secondary">
            Continue as Guest
          </Button>
        </div>
      </div>
    </ScreenContainer>
  );
}