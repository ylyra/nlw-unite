import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Redirect } from "expo-router";
import { MotiView } from "moti";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Button } from "@/components/button";
import { Credetial } from "@/components/credential";
import { Header } from "@/components/header";
import { QrCode } from "@/components/qrcode";
import { useBadgeStore } from "@/store/badge-store";
import { colors } from "@/styles/colors";

export default function Ticket() {
  const [isQrCodeExpanded, setIsQrCodeExpanded] = useState(false);
  const { badge, removeBadge, addBadgeImage } = useBadgeStore((state) => ({
    badge: state.badge,
    removeBadge: state.removeBadge,
    addBadgeImage: state.addBadgeImage,
  }));

  async function handleShare() {
    try {
      if (badge?.checkInUrl) {
        await Share.share({
          message: `Estou participando do evento ${badge.eventTitle}! Confira a minha credencial: ${badge.checkInUrl}`,
        });
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Compartilhar",
        "Não foi possível compartilhar a credencial.",
      );
    }
  }

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (result.assets && result.assets.length > 0) {
        addBadgeImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Avatar", "Não foi possível carregar a imagem.");
    }
  }

  if (!badge?.checkInUrl) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 bg-green-500 ">
      <Header title="Minha Credencial" />

      <ScrollView
        className="-mt-28"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credetial
          /* `{...badge}` is a spread operator in JavaScript that is used to pass
          all the key-value pairs of the `badge` object as individual props to
          the `Credetial` component. This allows you to easily pass all the
          properties of the `badge` object to the `Credetial` component without
          explicitly specifying each prop. */
          {...badge}
          checkInUrl={badge.checkInUrl}
          onChangeAvatar={handleSelectImage}
          onExpandQrCode={() => setIsQrCodeExpanded(!isQrCodeExpanded)}
        />

        <MotiView
          from={{ opacity: 0.8, translateY: 0 }}
          animate={{ opacity: 1, translateY: 10 }}
          transition={{ type: "timing", duration: 700, loop: true }}
        >
          <FontAwesome
            name="angle-double-down"
            size={24}
            color={colors.gray[300]}
            className="self-center my-6"
          />
        </MotiView>

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credential
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do evento {badge.eventTitle}!
        </Text>

        <Button onPress={handleShare}>COMPARTILHAR</Button>

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-10"
          onPress={removeBadge}
        >
          <Text className="text-base text-white font-bold text-center">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={isQrCodeExpanded}
        animationType="slide"
        onRequestClose={() => setIsQrCodeExpanded(false)}
        statusBarTranslucent
      >
        <View className="bg-green-500 flex-1 items-center justify-center">
          <QrCode size={300} value={badge.checkInUrl} />

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setIsQrCodeExpanded(false)}
            className="mt-10"
          >
            <Text className="text-orange-500 text-sm font-regular text-center">
              Fechar QRCode
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
