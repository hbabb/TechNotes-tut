import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwindcss from "eslint-plugin-tailwindcss";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
	{
		plugins: {
			tailwindcss,
		},
		rules: {
			"tailwindcss/classnames-order": "off",
			"tailwindcss/no-custom-classname": "off",
			"tailwindcss/no-contradicting-classname": "warn",
		},
		settings: {
			tailwindcss: {
				config: "./tailwind.config.js",
				groupByResponsive: true,
			},
		},
	},
];

export default eslintConfig;
