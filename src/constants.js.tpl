exports.INITIAL_CENTER = { lat: ${INITIAL_CENTER_LAT}, lng: ${INITIAL_CENTER_LNG} };
exports.INITIAL_ZOOM = 8;
exports.POLLING_INTERVAL = 100;
exports.ANALYSIS_REST_HOST = "${REST_PORT_5000_TCP_ADDR}".replace(/['"]+/g, '');
exports.ANALYSIS_REST_PORT = ${REST_PORT_5000_TCP_PORT};
exports.DATA_MANAGEMENT_HOST = "${DATABASE_PORT_3000_TCP_ADDR}".replace(/['"]+/g, '');
exports.DATA_MANAGEMENT_PORT = ${DATABASE_PORT_3000_TCP_PORT};
