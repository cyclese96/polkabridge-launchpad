const pools = require("./constants")

function getPoolObject(network, symbol) {
    const pool = pools.find(_pool => _pool.symbol === symbol && _pool.network === network);

    if (!pool) {
        return null;
    }
    return pool;

}

module.exports = getPoolObject;