"use client";

import { mainnet, polygon } from "@particle-network/authkit/chains";
import { AuthType } from "@particle-network/auth-core";
import {
  AuthCoreContextProvider,
  PromptSettingType,
} from "@particle-network/authkit";

export const ParticleAuthkit = ({ children }: React.PropsWithChildren) => {
  return (
    <AuthCoreContextProvider
      options={{
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
        clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
        appId: process.env.NEXT_PUBLIC_APP_ID!,
        authTypes: [
          AuthType.email,
          AuthType.google,
          AuthType.twitter,
          AuthType.github,
          AuthType.facebook,
        ],
        themeType: "dark",

        // 支援的區塊鏈
        chains: [mainnet, polygon],

        // 安全設定
        promptSettingConfig: {
          promptPaymentPasswordSettingWhenSign: PromptSettingType.first,
          promptMasterPasswordSettingWhenLogin: PromptSettingType.first,
        },

        // 錢包設定
        wallet: {
          themeType: "dark",
          visible: true,
          customStyle: {
            supportUIModeSwitch: true,
            supportLanguageSwitch: false,
          },
        },
      }}
    >
      {children}
    </AuthCoreContextProvider>
  );
};
