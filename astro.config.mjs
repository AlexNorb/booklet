import { defineConfig } from 'astro/config';

// Read package.json to get the version
// Note: This is a simplified way to get the version for build time.
// For more robust solutions, especially if deploying, consider environment variables.
// However, for local dev and build, this can work.
// We need a way to read the file content here. Since this is configuration code executed
// by Node.js when Astro starts, we can use Node's `fs` module.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let packageVersion = 'unknown';
try {
  const packageJsonContent = fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8');
  const packageJson = JSON.parse(packageJsonContent);
  packageVersion = packageJson.version || 'unknown';
} catch (error) {
  console.error("Could not read package.json for version:", error);
}

// https://astro.build/config
export default defineConfig({
  // Set a base URL if your site is deployed to a subpath
  // For example, if your site is at `https://example.com/my-app/`, set base to '/my-app'
  base: '/',
  vite: {
    define: {
      // Make environment variables available to client-side code (and layout)
      // Note: Astro automatically makes `import.meta.env.BASE_URL` available.
      // For other variables like PACKAGE_VERSION, this is how you can expose them.
      'import.meta.env.PACKAGE_VERSION': JSON.stringify(packageVersion),
    }
  }
});
