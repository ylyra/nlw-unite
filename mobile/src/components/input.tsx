import { forwardRef, ForwardRefRenderFunction } from "react";
import { TextInput, TextInputProps, View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

function Input({ className, ...props }: ViewProps) {
  return (
    <View
      {...props}
      className={twMerge(
        "w-full h-14 flex-row items-center gap-3 p-3 border border-green-400 rounded-lg",
        className,
      )}
    />
  );
}

const Field: ForwardRefRenderFunction<TextInput, TextInputProps> = (
  { className, ...props },
  ref,
) => {
  return (
    <TextInput
      {...props}
      className={twMerge(
        "flex-1 text-white text-base font-regular placeholder:text-gray-200",
        className,
      )}
      ref={ref}
    />
  );
};

Input.Field = forwardRef(Field);

export { Input };
