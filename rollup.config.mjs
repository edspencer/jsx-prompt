import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const sharedConfig = {
  external: ['react', 'react-dom', 'react-dom/server'],
  plugins: [
    peerDepsExternal(),
    typescript({ 
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          module: "ESNext",
          target: "es2022",
          jsx: "react"
        }
      }
    }), 
    commonjs()
  ],
  watch: {
    include: "src/**",
  }
};

/** @type {import('rollup').RollupOptions[]} */
export default [
  {
    ...sharedConfig,
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "esm",
      sourcemap: true,
    }
  },
  {
    ...sharedConfig,
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
      exports: 'named'
    }
  }
];
