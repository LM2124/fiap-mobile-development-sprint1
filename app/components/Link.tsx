import { Linking } from "react-native"

import { $styles } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

import { Text, TextProps } from "./Text"

export interface LinkProps extends TextProps {
  href?: string
}

/**
 *  <Text> clivável emulando uma tag <a>.
 */
export const Link = (props: LinkProps) => {
  const { href, children, style, ...rest } = props
  const { themed } = useAppTheme()

  const handlePress = async () => {
    if (!href) return

    const supported = await Linking.canOpenURL(href)
    if (supported) {
      await Linking.openURL(href)
    } else {
      console.warn(`Unsupported URI: ${href}`)
    }
  }

  return (
    <Text onPress={handlePress} style={[style, themed($styles.$link)]} {...rest}>
      {children}
    </Text>
  )
}
