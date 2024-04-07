import { View } from "react-native";
import QrCodeSvg from "react-native-qrcode-svg";

import { colors } from "@/styles/colors";

type Props = {
  value: string;
  size: number;
};

export function QrCode({ size, value }: Props) {
  return (
    <View className="rounded-lg overflow-hidden">
      <QrCodeSvg
        value={value}
        size={size}
        color={colors.white}
        backgroundColor="transparent"
      />
    </View>
  );
}
