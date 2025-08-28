import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
    site: 'https://metroui.org.ua',
    compressHTML: true,
    integrations: [
        expressiveCode({
            themes: ['dracula']
        }),
        mdx(),
    ]
});