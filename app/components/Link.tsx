import { $styles } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text, TextProps } from "./Text"


export interface LinkProps extends TextProps {
  href?: string;
}

/**
 * An <a> tag wrapped inside a `Text`.
 */
export const Link = (props: LinkProps) => {
  const { href, children, style, ...rest } = props
  const { themed } = useAppTheme()

  return (
    <Text style={[style, themed($styles.$link)]} {...rest}>
      <a href={href}>{children}</a>
    </Text>
  )
}
