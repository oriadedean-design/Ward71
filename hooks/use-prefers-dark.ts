import * as React from "react"

// Follows the device's light/dark setting, for things CSS can't reach
// (e.g. Stripe's payment iframe).
export function usePrefersDark() {
  const [prefersDark, setPrefersDark] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => setPrefersDark(mql.matches)
    mql.addEventListener("change", onChange)
    onChange()
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return prefersDark
}
