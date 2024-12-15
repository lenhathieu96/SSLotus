/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALGOLIA_INDEX_NAME: string;
  readonly VITE_ALGOLIA_PROJECT_ID: string;
  readonly VITE_ALGOLIA_SEARCH_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
