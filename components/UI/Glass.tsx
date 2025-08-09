// React import not needed with the new JSX transform
import { View, ViewProps } from "react-native";
import { BlurView } from "expo-blur";

type Props = ViewProps & {
  children: any;
  intensity?: number;
};

export default function Glass({
  children,
  intensity = 30,
  style,
  ...rest
}: Props) {
  return (
    <BlurView
      intensity={intensity}
      tint="light"
      style={[{ borderRadius: 16, overflow: "hidden" }, style]}
    >
      <View style={{ padding: 16 }} {...rest}>
        {children}
      </View>
    </BlurView>
  );
}
