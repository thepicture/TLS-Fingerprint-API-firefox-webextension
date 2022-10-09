function passRequestThroughTLSFingerprintAPI({ url }) {
    if (url.startsWith('http://127.0.0.1:8082'))
        return;
    
    const username = 'USERNAME'
    const password = 'PASSWORD'
    const host = 'HOST'
    const port = -1;
    const proxy = `http://${username}:${password}@${host}:${port}`

    return {
        redirectUrl: 'http://127.0.0.1:8082?poptls-url=' + encodeURIComponent(url) + '&poptls-proxy=' + encodeURIComponent(proxy)
    };
}

browser.webRequest.onBeforeSendHeaders.addListener(
    passRequestThroughTLSFingerprintAPI,
    { urls: ['<all_urls>'] },
    ['blocking', 'requestHeaders']
);
