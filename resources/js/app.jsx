import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import Layout from "./Layouts/Layout";
import "../css/app.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const appName = import.meta.env.VITE_APP_NAME || "LENDMARK";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,

    resolve: async (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");
        const page = await resolvePageComponent(`./Pages/${name}.jsx`, pages);

        page.default.layout =
            page.default.layout || ((page) => <Layout>{page}</Layout>);
        return page;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },

    progress: {
        color: "#4B5563",
    },
});
