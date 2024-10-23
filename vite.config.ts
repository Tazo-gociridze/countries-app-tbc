import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {

  // const rootPath = path.resolve(process.cwd())
  // const srcPath = `${rootPath}/src/components`
 
return{
  plugins: [react()],
  resolve: {
    // alias: {
    //   '@' : rootPath,
    //   '~' : srcPath,
    // },

    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "~": path.resolve(__dirname, "./src"),
    },
  },
}
});
