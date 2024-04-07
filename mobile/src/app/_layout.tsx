import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

// Import your global CSS file
import { Loading } from "@/components/loading";
import "@/styles/global.css";

export default function Layout() {
  const [isFontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
  });

  if (!isFontsLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1">
      {isFontsLoaded ? <Slot /> : <Loading />}
      <StatusBar animated style="light" />
    </SafeAreaView>
  );
}
