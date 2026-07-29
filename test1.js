// Function to get all cookies
function getCookies() {
    return document.cookie.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.trim().split('=');
        cookies[name] = decodeURIComponent(value || '');
        return cookies;
    }, {});
}

// Function to get all localStorage items
function getLocalStorage() {
    return Object.keys(localStorage).reduce((items, key) => {
        items[key] = localStorage.getItem(key);
        return items;
    }, {});
}

// Function to get all sessionStorage items
function getSessionStorage() {
    return Object.keys(sessionStorage).reduce((items, key) => {
        items[key] = sessionStorage.getItem(key);
        return items;
    }, {});
}

// Function to get all location properties
function getLocation() {
    return {
        href:     location.href,
        origin:   location.origin,
        protocol: location.protocol,
        host:     location.host,
        hostname: location.hostname,
        port:     location.port,
        pathname: location.pathname,
        search:   location.search,
        hash:     location.hash,
        // Parse search params into a readable object
        searchParams: Object.fromEntries(new URLSearchParams(location.search)),
        // Parse hash params into a readable object (covers implicit flow tokens)
        hashParams: Object.fromEntries(new URLSearchParams(location.hash.slice(1)))
    };
}

// Gather the data
const authData = {
    location:      getLocation(),
    cookies:       getCookies(),
    localStorage:  getLocalStorage(),
    sessionStorage: getSessionStorage()
};

// Convert data to JSON string
const jsonData = JSON.stringify(authData, null, 2);

// Create a Blob with the JSON data
const blob = new Blob([jsonData], { type: 'application/json' });

// Create a download link
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'browser_state.json';

// Append the link to the body, click it, and remove it
document.body.appendChild(link);
link.click();
document.body.removeChild(link);

// Revoke the URL to free up memory
URL.revokeObjectURL(url);

console.log('Authentication data has been saved to browser_state.json');
