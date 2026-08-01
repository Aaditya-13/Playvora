import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Animated, {
  withRepeat,
  withTiming,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { useEffect } from "react";

// Create an animated component for expo-image
const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function Index() {
  const scale = useSharedValue(1);

  useEffect(() => {
    // Pulse animation: smooth scaling up and down indefinitely
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1 // infinite repeat
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <AnimatedImage
        source={require("@/assets/images/playvora-logo.png")}
        style={[styles.logo, animatedStyle]}
        contentFit="contain"
      />
      <Text style={styles.title}>Playvora</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 220,
    height: 220,
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: "bold",
    color: "#208AEF",
    letterSpacing: 1.5,
  },
});
