import { proxy } from './proxy.js';
const _proxy = proxy;

const passRequestThroughTLSFingerprintAPI = ({ url }) => {
    try {
        if (url.startsWith('http://127.0.0.1:8082'))
        return;
        const username = _proxy.user();
        const password = _proxy.password();
        const host = _proxy.host;
        let port;
        if (typeof _proxy.port === 'object') {
            port = Math.floor(Math.random() * (_proxy.port.max - _proxy.port.min + 1) + _proxy.port.min);
        } else {
            port = _proxy.port;
        }
        const proxy = `http://${username}:${password}@${host}:${port}`;
        
        return {
            redirectUrl: 'http://127.0.0.1:8082?poptls-url=' + encodeURIComponent(url) + '&poptls-proxy=' + encodeURIComponent(proxy)
        };
    } catch (error) {
        console.error('error', error);
    }
}

browser.webRequest.onBeforeSendHeaders.addListener(
    passRequestThroughTLSFingerprintAPI,
    { urls: ['<all_urls>'] },
    ['blocking', 'requestHeaders']
);
