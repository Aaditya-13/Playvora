import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Logo from "../../../components/ui/Logo";
import PageHeader from "../../../components/ui/PageHeader";
import ScreenContainer from "../../../components/ui/ScreenContainer";

export default function Home() {
  return (
    <ScreenContainer>
      <Logo />

      <PageHeader
        title="Welcome"
        subtitle="Let's test our design system."
      />

      <Input
        label="Search"
        placeholder="Find football..."
      />

      <div className="mt-4">
        <Badge>Football</Badge>
      </div>

      <Card className="mt-6">
        <p>This is a card.</p>
      </Card>

      <Button className="mt-6">
        Join Activity
      </Button>

      <Button
        variant="secondary"
        className="mt-3"
      >
        Secondary
      </Button>

      <Button
        variant="outline"
        className="mt-3"
      >
        Outline
      </Button>

      <Button
        loading
        className="mt-3"
      >
        Loading
      </Button>
    </ScreenContainer>
  );
}