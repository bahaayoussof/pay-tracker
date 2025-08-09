declare module "expo-blur" {
  import { ComponentType } from "react";
  import { ViewProps } from "react-native";
  export type BlurViewProps = ViewProps & {
    intensity?: number;
    tint?: "light" | "dark" | "default";
  };
  export const BlurView: ComponentType<BlurViewProps>;
}
