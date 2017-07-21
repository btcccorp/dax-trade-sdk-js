class Trader {
  static get signAxios() {
    return require('./sign-axios')
  }

  /**
   * @param {Object} credential
   * @param {string} credential.accessKeyId
   * @param {string} credential.secretAccessKey
   */
  constructor(credential) {
    this.axios = Trader.signAxios(credential)
  }

  getAccountInfo() {
    return this.axios.get('/balance')
  }

  /**
   * @param {'ETC_BTC'|'ETH_BTC'} symbol
   */
  getOrders(symbol) {
    return this.axios.get(`/orders/${symbol}/open`)
  }

  /**
   * @param {Object} data
   * @param {'ETC_BTC'|'ETH_BTC'} data.symbol
   * @param {string} data.price
   * @param {string} data.quantity
   * @param {'LIMIT'} data.type
   * @param {'BUY'|'SELL'} data.side
   */
  placeOrder(data) {
    return this.axios.post('/orders', data)
  }

  /**
   * @param {'ETC_BTC'|'ETH_BTC'} symbol
   * @param {string} oid
   */
  cancelOrder(symbol, oid) {
    return this.axios.delete(`/orders/${symbol}/${oid}`)
  }

  /**
   * @param {'ETC_BTC'|'ETH_BTC'} symbol
   */
  getMarket(symbol) {
    const Market = require('./market.js')
    return new Market(this, symbol)
  }
}

module.exports = Trader
