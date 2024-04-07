import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { twMerge } from "tailwind-merge";

export function Button({
  className,
  children,
  textClassName,
  isLoading = false,
  disabled,
  activeOpacity = 0.7,
  ...props
}: Omit<TouchableOpacityProps, "children"> & {
  children: string;
  textClassName?: string;
  isLoading?: boolean;
}) {
  return (
    <TouchableOpacity
      {...props}
      className={twMerge(
        "w-full h-14 bg-orange-500 items-center justify-center rounded-lg disabled:opacity-60",
        className,
      )}
      disabled={isLoading || disabled}
      activeOpacity={activeOpacity}
    >
      {isLoading ? (
        <ActivityIndicator className="text-green-500" />
      ) : (
        <Text
          className={twMerge(
            "text-green-500 text-base font-bold",
            textClassName,
          )}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}
