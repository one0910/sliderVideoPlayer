export const getDeviceType = () => {
    const userAgent = navigator.userAgent;

    if (/Android/i.test(userAgent)) {
        return "Android";
    }

    if (/iPhone/i.test(userAgent)) {
        return "iPhone";
    }

    if (/Windows/i.test(userAgent)) {
        return "Windows";
    }

    return "Unknown";
}
