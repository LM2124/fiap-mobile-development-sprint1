import { $styles } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { Text, TextProps } from "./Text"


export interface LinkProps extends TextProps {
  href?: string;
  onClick?: () => void;
}

/**
 * A `Text`, with a link, and an onClick callback.
 */
export const Link = (props: LinkProps) => {
  const { href, onClick, children, style, ...rest } = props
  const { themed } = useAppTheme()

  return (
    <Text style={[themed($styles.$link), style]} {...rest}>
      <a href={href} onClick={onClick}>{children}</a>
    </Text>
  )
}
