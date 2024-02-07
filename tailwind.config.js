/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("tailwindcss/plugin")(({ addUtilities }) => {
      const newUtilities = {
        ".flex-r-center": {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        ".flex-r-start": {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
        },
        ".flex-r-end": {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "end",
        },
        ".flex-c-center": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        },
        ".flex-c-start": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
        },
        ".flex-c-end": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "end",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
