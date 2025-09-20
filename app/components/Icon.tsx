import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"

import { useAppTheme } from "@/theme/context"

export type IconTypes = keyof typeof iconRegistry

type BaseIconProps = {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>
}

type PressableIconProps = Omit<TouchableOpacityProps, "style"> & BaseIconProps
type IconProps = Omit<ViewProps, "style"> & BaseIconProps

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity />
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Icon/}
 * @param {PressableIconProps} props - The props for the `PressableIcon` component.
 * @returns {JSX.Element} The rendered `PressableIcon` component.
 */
export function PressableIcon(props: PressableIconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...pressableProps
  } = props

  const { theme } = useAppTheme()

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    // Comentado para fora por causa do aviso de deprecação do react-native.
    // { tintColor: color ?? theme.colors.text },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ]

  return (
    <TouchableOpacity {...pressableProps} style={$containerStyleOverride}>
      <Image
        style={$imageStyle}
        source={iconRegistry[icon]}
        tintColor={color ?? theme.colors.text}
        resizeMode="contain"
      />
    </TouchableOpacity>
  )
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <View />, use `PressableIcon` if you want to react to input
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Icon/}
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...viewProps
  } = props

  const { theme } = useAppTheme()

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    // Comentado para fora por causa do aviso de deprecação do react-native.
    // { tintColor: color ?? theme.colors.text },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ]

  return (
    <View {...viewProps} style={$containerStyleOverride}>
      <Image
        style={$imageStyle}
        source={iconRegistry[icon]}
        tintColor={color ?? theme.colors.text}
        resizeMode="contain"
      />
    </View>
  )
}

/* eslint sort-keys: "error" */
export const iconRegistry = {
  analysis: require("@assets/icons/Analysis.png"),
  back: require("@assets/icons/back.png"),
  bell: require("@assets/icons/bell.png"),
  caretLeft: require("@assets/icons/caretLeft.png"),
  caretRight: require("@assets/icons/caretRight.png"),
  category: require("@assets/icons/Category.png"),
  check: require("@assets/icons/check.png"),
  hidden: require("@assets/icons/hidden.png"),
  home: require("@assets/icons/Home.png"),
  ladybug: require("@assets/icons/ladybug.png"),
  lock: require("@assets/icons/lock.png"),
  menu: require("@assets/icons/menu.png"),
  more: require("@assets/icons/more.png"),
  profile: require("@assets/icons/Profile.png"),
  settings: require("@assets/icons/settings.png"),
  transactions: require("@assets/icons/Transactions.png"),
  view: require("@assets/icons/view.png"),
  x: require("@assets/icons/x.png"),
}
/* eslint sort-keys: "off" */

const $imageStyleBase: ImageStyle = {
  // Comentado para fora por causa do aviso de deprecação do react-native.
  // mantido vazio caso o template do ignite atualize.
  // resizeMode: "contain",
}
