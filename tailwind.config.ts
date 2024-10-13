import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "main-with-corner-gradients": `
          radial-gradient(farthest-side at bottom left, #151515, transparent 600px),
          radial-gradient(farthest-side at bottom left, #0a0b08, transparent 300px),
          radial-gradient(farthest-side at top right, #3EFFA2, transparent 300px);`,
        'sended-message-gradient': 'linear-gradient(32deg, rgba(65,65,65,1) 0%, rgba(21,21,21,1) 46%)',
        'custom-button-resalt': 'linear-gradient(180deg, hsla(152, 100%, 50%, 1) 0%, hsla(154, 100%, 5%, 1) 100%)',
      },
      colors: {
        "custom-main-color": "#0d0d0d",
        "custom-secondary-color": "#101010",
        "custom-tertiary-color": "#151515",
        "custom-border-color": "#292c2a",
        "custom-resalt-color": "#0cfdc6",
        "custom-text-color": "#ffffff",
        "custom-text-secondary-color": "#474747"
      },
    },
  },
  plugins: [],
};
export default config;
