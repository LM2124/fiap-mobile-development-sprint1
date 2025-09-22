import { FC, useState } from "react"
import { Image, View } from "react-native"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/contexts/AuthContext"
import type { HomeTabScreenProps } from "@/navigators/HomeNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"

import { LogoutModal } from "./components/LogoutModal"
import { OptionButton } from "./components/OptionButton"
import {
  $nameText,
  $profileDisplay,
  $profilePicture,
  $profilePictureContainer,
  $root,
  $rootContentContainer,
  $userInfo,
} from "./styles"
import { $loginStyles } from "../../Login/styles"
import { HomeBottomBarSpacer } from "../components/HomeBottomBarSpacer"

const placeholder = require("@assets/images/welcome-face.png")

interface ProfileScreenProps extends HomeTabScreenProps<"Profile"> {}

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
        <View style={themed($profilePictureContainer)}>
          <Image style={themed($profilePicture)} source={placeholder} resizeMode="contain" />
        </View>
        <View style={themed($userInfo)}>
          <Text preset="subheading" style={$nameText} text={user?.name} />
          <Text>
            <Text size="xs" preset="bold" text="ID: " />
            <Text size="xs" preset="default" text={user?.id} />
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={themed($loginStyles.$formContent)}>
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
