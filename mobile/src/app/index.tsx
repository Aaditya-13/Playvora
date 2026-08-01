import { Redirect } from "expo-router";

export default function Index() {
  // For prototyping, redirect straight to the main feed. 
  // Later, we will add auth state logic to redirect to /(auth)/landing if not logged in.
  return <Redirect href={"/(tabs)" as any} />;
}
