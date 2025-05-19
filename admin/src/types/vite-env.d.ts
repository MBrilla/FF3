/// <reference types="vite/client" />

declare module '@supabase/supabase-js'

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_SERVICE_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace NodeJS {
  interface ProcessEnv extends ImportMetaEnv {}
} 