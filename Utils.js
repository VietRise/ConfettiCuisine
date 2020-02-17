function getJSONString(obj) {
    return JSON.stringify(obj, null, 2);
}

module.exports = {
    getJSONString: getJSONString
};