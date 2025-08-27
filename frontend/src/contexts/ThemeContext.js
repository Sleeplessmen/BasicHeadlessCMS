import { createContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {
    console.warn(
      "ThemeContext: toggleTheme được gọi nhưng không có ThemeProvider. " +
        "Hãy đảm bảo App được bao bọc bởi <ThemeProvider>."
    );
  },
});
