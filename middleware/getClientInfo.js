// middleware/userDetails.js
import useragent from "express-useragent"
import requestIp from "request-ip"

// Middleware to capture user details
const getClientDetails = (req, res, next) => {
    // Get IP address
    const ip = requestIp.getClientIp(req) || "Unkown";

    // Parse user agent
    const ua = useragent.parse(req.headers['user-agent']);

    // Attach to request object
    req.clientDetails = {
        ip: ip,
        browser: ua.browser,
        browserVersion: ua.version,
        os: ua.os,
        platform: ua.platform,
        isMobile: ua.isMobile,
        isDesktop: ua.isDesktop,
        isBot: ua.isBot,
        timestamp: new Date()
    };

    next();
};

export default getClientDetails;