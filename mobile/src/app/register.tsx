import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { isAxiosError } from "axios";
import { Link, Redirect } from "expo-router";
import React, { useRef, useState } from "react";
import { Alert, Image, TextInput, View } from "react-native";
import {
  flatten,
  minLength,
  object,
  parse,
  string,
  toTrimmed,
  email as valibotEmail,
  ValiError,
} from "valibot";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { api } from "@/server/api";
import { getAttendeeBadge } from "@/services/get-attendee-badge";
import { useBadgeStore } from "@/store/badge-store";
import { colors } from "@/styles/colors";

const FAKE_EVENT_ID = "ehqe1a2y8egeumw0pkkkc171";

export default function Register() {
  const emailRef = useRef<TextInput>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { saveBadge, badge } = useBadgeStore((state) => ({
    saveBadge: state.saveBadge,
    badge: state.badge,
  }));

  const [isValidatingCredentials, setIsValidatingCredentials] = useState(false);

  async function handleRegister() {
    if (isValidatingCredentials) {
      return;
    }

    const schema = object({
      name: string([
        toTrimmed(),
        minLength(4, "O nome deve ter no mínimo 4 caracteres"),
      ]),
      email: string([toTrimmed(), valibotEmail("Digite um e-mail válido")]),
    });

    try {
      parse(schema, {
        name,
        email,
      });

      setIsValidatingCredentials(true);
      const response = await api.post<{
        attendeeId: number;
      }>(`/events/${FAKE_EVENT_ID}/attendees`, {
        name,
        email,
      });

      const data = await getAttendeeBadge(String(response.data.attendeeId));

      if (!data.success) {
        throw new Error(data.error);
      }

      saveBadge({
        ...data.data.badge,
        code: response.data.attendeeId,
      });

      Alert.alert("Inscrição", "Inscrição realizada com sucesso!", [
        {
          text: "OK",
        },
      ]);
    } catch (error) {
      if (isAxiosError(error)) {
        // if (error.status === 409) {
        //   return Alert.alert(
        //     "Inscrição",
        //     "Você já está inscrito neste evento.",
        //   );
        // }
        switch (error.response?.status) {
          case 409:
            return Alert.alert(
              "Inscrição",
              "Você já está inscrito neste evento.",
            );
          case 400:
            return Alert.alert(
              "Inscrição",
              "Não existem mais ingressos disponíveis para este evento.",
            );
          default:
            return Alert.alert(
              "Inscrição",
              "Ocorreu um erro inesperado, tente novamente mais tarde.",
            );
        }
      }

      if (error instanceof ValiError) {
        const errors = flatten<typeof schema>(error);

        if (errors.nested.email) {
          return Alert.alert("E-mail", errors.nested.email[0]);
        }

        if (errors.nested.name) {
          return Alert.alert("Nome", errors.nested.name[0]);
        }
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
          <FontAwesome6
            name="user-circle"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="Nome Completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            onChangeText={setName}
            value={name}
          />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            accessibilityHint="Digite seu e-mail"
            ref={emailRef}
            onChangeText={(value) => setEmail(value.trim())}
            value={email}
            onSubmitEditing={handleRegister}
          />
        </Input>

        <Button onPress={handleRegister} isLoading={isValidatingCredentials}>
          REALIZAR INSRIÇÃO
        </Button>

        <Link
          href="/"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Já possui ingresso?
        </Link>
      </View>
    </View>
  );
}
