const storageKey = "theme-preference";
const light = "light-theme";
const dark = "dark-theme";

const getColorPreference = () => {
    const preference = localStorage.getItem(storageKey);
    if (preference) {
        return preference;
    }

    const query = new URLSearchParams(window.location.search);
    if (query.has("theme")) {
        return query.get("theme");
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? dark : light;
};

const setPreference = () => {
    const preference = getColorPreference();
    localStorage.setItem(storageKey, preference);

    const body = document.body;
    body.classList.replace(preference === light ? dark : light, preference);

    const element = document.querySelectorAll(".navbar>li>a");
    for (let i = 0; i < element.length; i++) {
        const url = new URL(element[i].href);
        url.searchParams.set("theme", preference);
        element[i].href = url;
    }
};

window.onload = () => {
    document.body.classList.add(light);
    localStorage.removeItem(storageKey);
    // set on load so screen readers can get the latest value on the button
    setPreference();
    // now this script can find and listen for clicks on the control
    document.querySelector(".theme-toggle")?.addEventListener("click", onClick);
};

const onClick = () => {
    const preference = getColorPreference();
    localStorage.setItem(storageKey, preference === light ? dark : light);
    setPreference();
};
