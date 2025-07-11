class ProviderB {
  async send(to, subject, body) {
    if (Math.random() < 0.5) return true;
    throw new Error('ProviderB failed');
  }
}
module.exports = { ProviderB };