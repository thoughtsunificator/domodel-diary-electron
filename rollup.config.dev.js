import path from "path"
import postcss from "rollup-plugin-postcss"
import postcssImport from "postcss-import"
import copy from "rollup-plugin-copy-watch"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import alias from "@rollup/plugin-alias"
import rootImport from "rollup-plugin-root-import"
import livereload from "rollup-plugin-livereload"

export default {
	input: "./src/renderer/renderer.js",
	output: {
		file: "./dist/renderer/dev/public/bundle.js",
		format: "iife",
		sourcemap: true
	},
	plugins: [
		postcss({
			sourceMap: true,
			extract: path.resolve("dist/renderer/dev/public/bundle.css"),
			plugins: [postcssImport()]
		}),
		copy({
			watch: 'public',
			targets: [{ src: "public/renderer/*", dest: "dist/renderer/dev/public" }, { src: "LICENSE", dest: "dist/renderer/dev/public" }, { src: "README.md", dest: "dist/renderer/dev/public" }],
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
		})
	]
}
