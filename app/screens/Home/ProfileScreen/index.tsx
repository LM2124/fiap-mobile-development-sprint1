/* eslint-disable react-native/no-inline-styles */
import { FC, useState } from "react"
import { Image, Modal, View, ViewStyle, type ImageStyle, type TextStyle } from "react-native"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/contexts/AuthContext"
import type { HomeTabScreenProps } from "@/navigators/HomeNavigator"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

import { OptionButton } from "./components/OptionButton"
import { $loginStyles } from "../../Login/styles"

interface ProfileScreenProps extends HomeTabScreenProps<"Profile"> {}

const placeholder = require("@assets/images/xpLogo.png")

//FIXME: is offset by a couple pixels down
const profileImageSize = 120

export const ProfileScreen: FC<ProfileScreenProps> = () => {
  const { theme, themed } = useAppTheme()
  const { user, signOut } = useAuth()

  const [logoutModalVisible, setLogoutModalVisible] = useState(false)

  return (
    <Screen
      style={themed($root)}
      contentContainerStyle={themed([
        $loginStyles.$formContainer,
        $rootContentContainer,
        { paddingBottom: useBottomTabBarHeight() },
      ])}
      preset="scroll"
    >
      {/* Logout Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={[$styles.toggleInner, { backgroundColor: "#000A" }]}>
          <View
            style={{
              margin: "auto",
              backgroundColor: theme.colors.background,
              borderRadius: theme.spacing.md,
              justifyContent: "center",
              alignItems: "center",
              padding: theme.spacing.xl,
              borderWidth: 1,
              borderColor: theme.colors.separator,
              gap: theme.spacing.lg,
            }}
          >
            <Text preset="heading" size="lg" text="Deslogar Da Conta" />
            <Text text="Tem Certeza De Que Deseja Sair?" />
            <View style={{ width: "80%", gap: theme.spacing.sm }}>
              <Button
                style={themed($styles.$buttonPrimary)}
                textStyle={[themed($styles.$buttonText), { fontWeight: "normal" }]}
                text="Deslogar"
                onPress={() => signOut()}
              />
              <Button
                style={themed([$styles.$buttonPrimary, $styles.$buttonDisabled])}
                textStyle={[themed($styles.$buttonText), { fontWeight: "normal" }]}
                text="Cancelar"
                onPress={() => setLogoutModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Profile Picture and User Name */}
      <View style={themed($profileDisplay)}>
        <Image style={themed($profilePicture)} src={placeholder} resizeMode="contain" />
        <View style={themed($userInfo)}>
          <Text preset="subheading" style={$nameText} text={user?.name} />
          <Text>
            <Text size="xs" preset="bold" text="ID: " />
            <Text size="xs" preset="default" text={user?.id} />
          </Text>
        </View>
      </View>
      <View style={themed([$loginStyles.$formContent, $bodyButtonsContainer])}>
        <OptionButton icon="profile" title="Editar Perfil" />
        <OptionButton icon="security" title="Segurança" />
        <OptionButton icon="settings" title="Configurações" />
        <OptionButton icon="help" title="Suporte" />
        <OptionButton icon="exit" title="Deslogar" action={() => setLogoutModalVisible(true)} />
      </View>
    </Screen>
  )
}

const $root: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.tint,
  paddingTop: profileImageSize / 2,
})

const $rootContentContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  alignSelf: "center",
})

const $profileDisplay: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: 10,
  top: -profileImageSize / 2,
  marginBottom: -profileImageSize / 2,
  alignItems: "center",
  gap: spacing.lg,
})

const $profilePicture: ThemedStyle<ImageStyle> = () => ({
  height: profileImageSize,
  width: profileImageSize,
  borderRadius: 999,
  backgroundColor: "red",
})

const $userInfo: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  // alignSelf: "center",
})

const $nameText: TextStyle = {
  fontSize: 20,
  lineHeight: 20,
}

const $bodyButtonsContainer: ThemedStyle<ViewStyle> = () => ({
  // paddingInline: spacing.xl,
  flex: 1,
})
