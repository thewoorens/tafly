function getServerStatus(req, res) {
    console.log("✅ Server status endpoint called");
    res.send({ server: true });
}

function getVersion(req, res) {
    console.log("✅ Version endpoint called");
    res.send({ version: '1.0.0', time: new Date() });
}

module.exports = { getServerStatus, getVersion };