import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { Alert, Image, View } from "react-native";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { getAttendeeBadge } from "@/services/get-attendee-badge";
import { useBadgeStore } from "@/store/badge-store";
import { colors } from "@/styles/colors";

export default function Home() {
  const { saveBadge, badge } = useBadgeStore((state) => ({
    saveBadge: state.saveBadge,
    badge: state.badge,
  }));
  const [code, setCode] = useState("");
  const [isValidatingCredentials, setIsValidatingCredentials] = useState(false);

  async function handleAccessCredential() {
    if (!code.trim()) {
      return;
    }

    try {
      setIsValidatingCredentials(true);

      const response = await getAttendeeBadge(code);

      if (!response.success) {
        throw new Error(response.error);
      }

      saveBadge({
        ...response.data.badge,
        code: Number(code),
      });

      Alert.alert("Validação", "Credencial validada com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Validação", error.message);
      }
    } finally {
      setIsValidatingCredentials(false);
    }
  }

  if (badge?.checkInUrl) {
    return <Redirect href="/ticket" />;
  }

  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />

      <View className="w-full mt-12 gap-3">
        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="Código do ingresso (somente números)"
            onChangeText={(value) => {
              // verify it is a integer number
              if (!isNaN(Number(value)) && Number.isInteger(Number(value))) {
                setCode(value.trim());
              }
            }}
            onSubmitEditing={handleAccessCredential}
            value={code}
            accessibilityHint="Digite o código do ingresso. Somente números."
          />
        </Input>

        <Button
          onPress={handleAccessCredential}
          isLoading={isValidatingCredentials}
        >
          ACESSAR CREDENCIAL
        </Button>

        <Link
          href="/register"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  );
}
