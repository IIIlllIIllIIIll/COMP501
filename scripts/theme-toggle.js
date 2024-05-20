const light = "light-theme";
const dark = "dark-theme";

const getColorPreference = () => {
    const query = new URLSearchParams(window.location.search);
    if (query.has("theme")) {
        return query.get("theme");
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? dark : light;
};

const setPreference = (preference) => {
    document.body.classList.replace(preference === light ? dark : light, preference);

    const element = document.querySelectorAll(".local-url");
    for (let i = 0; i < element.length; i++) {
        const url = new URL(element[i].href);
        url.searchParams.set("theme", preference);
        element[i].href = url;
    }

    const url = new URL(window.location.href);
    url.searchParams.set("theme", preference);
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
};

const onClick = () => {
    const preference = getColorPreference() === dark ? light : dark;
    setPreference(preference);
};

window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add(light);
    setPreference(getColorPreference());
    // now this script can find and listen for clicks on the control
    document.querySelector(".theme-toggle")?.addEventListener("click", onClick);
});
