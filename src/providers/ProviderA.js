class ProviderA {
  async send(to, subject, body) {
    if (Math.random() < 0.7) return true;
    throw new Error('ProviderA failed');
  }
}
module.exports = { ProviderA };