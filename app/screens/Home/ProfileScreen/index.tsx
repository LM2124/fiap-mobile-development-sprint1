/* eslint-disable react-native/no-inline-styles */
import { FC, useState } from "react"
import { View, ViewStyle, type TextStyle } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/contexts/AuthContext"
import type { HomeTabScreenProps } from "@/navigators/HomeNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

import { LogoutModal } from "./components/LogoutModal"
import { OptionButton } from "./components/OptionButton"
import { $loginStyles } from "../../Login/styles"
import { HomeBottomBarSpacer } from "../components/HomeBottomBarSpacer"

interface ProfileScreenProps extends HomeTabScreenProps<"Profile"> {}

// FIXME: isso crasha a tela do mobile (mas pq não na welcomescreen??)
// const placeholder = require("@assets/images/xpLogo.png")

// const profileImageSize = 120

export const ProfileScreen: FC<ProfileScreenProps> = () => {
  const { themed } = useAppTheme()
  const { user, signOut } = useAuth()

  const [logoutModalVisible, setLogoutModalVisible] = useState(false)

  return (
    <Screen
      style={themed($root)}
      contentContainerStyle={themed([$loginStyles.$formContainer, $rootContentContainer])}
      preset="scroll"
    >
      {/* Logout Modal */}
      <LogoutModal
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
        cancelAction={() => setLogoutModalVisible(false)}
        signOutAction={() => signOut()}
      />

      {/* Profile Picture and User Name */}
      <View style={themed($profileDisplay)}>
        {/* FIXME: Profile Picture */}
        {/* <Image style={themed($profilePicture)} src={placeholder} resizeMode="contain" /> */}
        <View style={themed($userInfo)}>
          <Text preset="subheading" style={$nameText} text={user?.name} />
          <Text>
            <Text size="xs" preset="bold" text="ID: " />
            <Text size="xs" preset="default" text={user?.id} />
          </Text>
        </View>
      </View>
      <View style={themed([$loginStyles.$formContent, $bodyButtonsContainer])}>
        <OptionButton
          icon="profile"
          title="Editar Perfil"
          iconStyle={themed($styles.$buttonDisabled)}
        />
        <OptionButton
          icon="security"
          title="Segurança"
          iconStyle={themed($styles.$buttonDisabled)}
        />
        <OptionButton
          icon="settings"
          title="Configurações"
          iconStyle={themed($styles.$buttonDisabled)}
        />
        <OptionButton icon="help" title="Suporte" iconStyle={themed($styles.$buttonDisabled)} />
        <OptionButton icon="exit" title="Deslogar" action={() => setLogoutModalVisible(true)} />
        <HomeBottomBarSpacer />
      </View>
    </Screen>
  )
}

const $root: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.tint,
})

const $rootContentContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  alignSelf: "center",
})

const $profileDisplay: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  gap: spacing.lg,
})

// const $profilePicture: ThemedStyle<ImageStyle> = () => ({
//   height: profileImageSize,
//   width: profileImageSize,
//   borderRadius: 999,
//   backgroundColor: "red",
// })

const $userInfo: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
})

const $nameText: TextStyle = {
  fontSize: 20,
  lineHeight: 20,
}

const $bodyButtonsContainer: ThemedStyle<ViewStyle> = () => ({})
