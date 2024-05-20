const storageKey = "theme-preference";

const getColorPreference = () => {
    const preference = localStorage.getItem(storageKey);
    const query = new URLSearchParams(window.location.search);

    if (preference) {
        return preference;
    } else if (query.has("theme")) {
        return query.get("theme");
    } else {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark-theme" : "light-theme";
    }
};

const setPreference = () => {
    const preference = getColorPreference();
    localStorage.setItem(storageKey, preference);

    let element = document.body;
    element.classList.replace(preference === "light-theme" ? "dark-theme" : "light-theme", preference);

    element = document.querySelectorAll(".navbar>li>a");
    for (let i = 0; i < element.length; i++) {
        const url = new URL(element[i].href);
        url.searchParams.delete("theme");
        url.searchParams.append("theme", preference);
        element[i].href = url;
    }
};

window.onload = () => {
    document.body.classList.add("light-theme");
    localStorage.removeItem(storageKey);
    // set on load so screen readers can get the latest value on the button
    setPreference();
    // now this script can find and listen for clicks on the control
    document.querySelector(".theme-toggle").addEventListener("click", onClick);
};

const onClick = () => {
    const preference = getColorPreference();
    localStorage.setItem(storageKey, preference === "light-theme" ? "dark-theme" : "light-theme");
    setPreference();
};
