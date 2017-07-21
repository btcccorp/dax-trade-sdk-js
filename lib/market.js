class Market {
  /**
   * @param {Object} trader
   * @param {'ETC_BTC'|'ETH_BTC'} symbol
   */
  constructor(trader, symbol) {
    this.trader = trader
    this.symbol = symbol
  }

  list() {
    return this.trader.getOrders(this.symbol)
  }

  /**
   * @param {string} amount
   * @param {string} price
   */
  buy(amount, price) {
    return this.placeOrder('BUY', amount, price)
  }

  /**
   * @param {string} amount
   * @param {string} price
   */
  sell(amount, price) {
    return this.placeOrder('SELL', amount, price)
  }

  /**
   * @param {'BUY'|'SELL'} side
   * @param {string} amount
   * @param {string} price
   */
  placeOrder(side, amount, price) {
    return this.trader.placeOrder({
      symbol: this.symbol,
      price: price,
      quantity: amount.toString(),
      type: 'LIMIT',
      side
    })
  }

  /**
   * @param {string} oid
   */
  cancel(oid) {
    return this.trader.cancelOrder(this.symbol, oid)
  }
}

module.exports = Market
