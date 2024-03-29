import path from "path"
import del from "rollup-plugin-delete"
import postcss from "rollup-plugin-postcss"
import postcssImport from "postcss-import"
import { terser } from "rollup-plugin-terser"
import copy from "rollup-plugin-copy-watch"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import rootImport from "rollup-plugin-root-import"
import alias from "@rollup/plugin-alias"

export default {
	input: "./src/renderer/renderer.js",
	output: {
			file: "./dist/renderer/prod/public/bundle.js",
			format: "iife",
	},
	plugins: [
		del({ targets: "dist/renderer/prod" }),
		postcss({
			extract: true,
			minimize: true,
			extract: path.resolve("dist/renderer/prod/public/bundle.css"),
			plugins: [postcssImport()]
		}),
		copy({
			targets: [{ src: "public/renderer/*", dest: "dist/renderer/prod/public" }, { src: "LICENSE", dest: "dist/renderer/prod/public" }, { src: "README.md", dest: "dist/renderer/prod/public" }],
			flatten: true
		}),
		nodeResolve(),
		alias({
			entries: [
				{ find:/^lib\/(.*)/, replacement: "./lib/$1" },
				{ find:/^assets\/(.*)/, replacement: "./assets/$1" },
				{ find:/^data\/(.*)/, replacement: "./data/$1" },
				{ find:/^\.env\.js$/, replacement: "./.env.js" }
			]
		}),
		rootImport({
			root: `${__dirname}/src`,
			useInput: "prepend",
			extensions: ".js",
		}),
		terser()
	]
}
