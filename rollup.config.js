import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { visualizer } from "rollup-plugin-visualizer";
import dts from "rollup-plugin-dts";
import autoprefixer from "autoprefixer";

const packageJson = require("./package.json");

export default [
	{
		input: "src/index.ts",
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: true,
				name: packageJson.name,
			},
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
			external(),
			resolve(),
			commonjs(),
			typescript({ tsconfig: "./tsconfig.json" }),
			postcss({
				plugins: [autoprefixer()],
				minimize: true,
				sourceMap: true,
				extract: "styles.css",
			}),
			terser({ compress: true }),
			// visualizer(),
		],
	},
	// {
	// 	input: "dist/esm/types/index.d.ts",
	// 	output: [{ file: "dist/index.d.ts", format: "esm" }],
	// 	external: [/\.css$/],
	// 	plugins: [dts()],
	// },
];
