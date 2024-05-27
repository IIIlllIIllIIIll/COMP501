"use strict";
const light = "light-theme";
const dark = "dark-theme";

const getColorPreference = () => {
    const preference = new URLSearchParams(location.search).get("theme");
    if (preference && [light, dark].includes(preference)) {
        return preference;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? dark : light;
};

const setPreference = (preference) => {
    const replaced = document.body.classList.replace(preference === light ? dark : light, preference);

    {
        const url = new URL(location.href);
        url.searchParams.set("theme", preference);
        history.replaceState(null, "", url.pathname + url.search + url.hash);
    }

    if (replaced) {
        document.body.dispatchEvent(new CustomEvent("theme-changed"));
    }

    {
        const element = document.querySelectorAll(".local-url");
        for (let i = 0; i < element.length; i++) {
            const url = new URL(element[i].href);
            url.searchParams.set("theme", preference);
            element[i].href = url;
        }
    }

    if (preference === dark) {
        document.querySelector("#set-light-theme")?.classList.remove("active");
        document.querySelector("#set-dark-theme")?.classList.add("active");
    } else {
        document.querySelector("#set-dark-theme")?.classList.remove("active");
        document.querySelector("#set-light-theme")?.classList.add("active");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    setPreference(getColorPreference());
});

document.body.classList.add(getColorPreference());
