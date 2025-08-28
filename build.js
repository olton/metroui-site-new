import { build, context } from 'esbuild';
import { lessLoader } from "esbuild-plugin-less";
import progress from "@olton/esbuild-plugin-progress";
import autoprefixer from "@olton/esbuild-plugin-autoprefixer";
import { replace } from "esbuild-plugin-replace";
import pkg from "./node_modules/@olton/metroui/package.json" with {type: "json"};

const production = process.env.MODE === "production"
const version = pkg.version

const banner = `
/*!
 ███╗   ███╗███████╗████████╗██████╗  ██████╗     ██╗   ██╗██╗
 ████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗    ██║   ██║██║
 ██╔████╔██║█████╗     ██║   ██████╔╝██║   ██║    ██║   ██║██║
 ██║╚██╔╝██║██╔══╝     ██║   ██╔══██╗██║   ██║    ██║   ██║██║
 ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝    ╚██████╔╝██║
 ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝      ╚═════╝ ╚═╝                                                             

 * Metro UI v${version} Components Library  (https://metroui.org.ua)
 * Build: ${new Date().toLocaleString()}
 * Copyright 2012-${new Date().getFullYear()} by Serhii Pimenov
 * Licensed under MIT
 */
`

const options = {
    entryPoints: ['./src/js/metro.js'],
    outfile: './public/metro.js',
    bundle: true,
    minify: production,
    sourcemap: false,
    banner: {
        js: banner
    },
    plugins: [
        progress({
            text: 'Building Metro UI...',
            succeedText: `Metro UI built successfully in %s ms!`
        }),
        lessLoader(),
        autoprefixer(),
        replace({
            '__BUILD_TIME__': new Date().toLocaleString(),
            '__VERSION__': version,
        })
    ],
}
const drop = []

if (production) {
    drop.push("console")    
}

if (production) {
    await build({
        ...options,
        drop,
    })
} else {
    let ctxLib = await context({
        ...options,
    })

    await Promise.all([
        await ctxLib.watch(),
    ])
}
