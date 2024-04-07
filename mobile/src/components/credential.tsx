import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { QrCode } from "./qrcode";

import { EventBadgeWithImage } from "@/@types/badge";
import { colors } from "@/styles/colors";

type Props = EventBadgeWithImage & {
  onChangeAvatar?: () => void;
  onExpandQrCode?: () => void;
};

export function Credetial({
  checkInUrl,
  code,
  email,
  eventTitle,
  name,
  image,
  onChangeAvatar,
  onExpandQrCode,
}: Props) {
  const { height } = useWindowDimensions();

  return (
    <MotiView
      className="w-full self-stretch items-center"
      from={{
        opacity: 0,
        translateY: -height,
        rotateZ: "50deg",
        rotateY: "30deg",
        rotateX: "30deg",
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        rotateZ: "0deg",
        rotateY: "0deg",
        rotateX: "0deg",
      }}
      transition={{
        type: "spring",
        damping: 20,
        rotateZ: {
          damping: 15,
          mass: 3,
        },
      }}
    >
      <Image
        source={require("@/assets/ticket/band.png")}
        className="w-24 h-52 z-10"
      />
      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10  rounded-2xl -mt-5">
        <ImageBackground
          source={require("@/assets/ticket/header.png")}
          className="w-full px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">{eventTitle}</Text>
            <Text className="text-zinc-400 text-sm font-bold">#{code}</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        {image ? (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onChangeAvatar}
            className="rounded-full"
          >
            <Image
              source={{
                uri: image,
              }}
              className="w-36 h-36 rounded-full -mt-24"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.85}
            className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center"
            onPress={onChangeAvatar}
          >
            <Feather name="camera" color={colors.green[400]} size={32} />
          </TouchableOpacity>
        )}

        <Text className="font-bold text-2xl text-zinc-50 mt-4">{name}</Text>

        <Text className="font-regular text-basse text-zinc-300 mb-4">
          {email}
        </Text>

        <QrCode value={checkInUrl} size={120} />

        <TouchableOpacity
          activeOpacity={0.85}
          className="mt-6"
          onPress={onExpandQrCode}
        >
          <Text className="text-orange-500 text-sm font-regular">
            Ampliar QRCode
          </Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  );
}
