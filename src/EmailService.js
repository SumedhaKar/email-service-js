const { ProviderA } = require('./providers/ProviderA');
const { ProviderB } = require('./providers/ProviderB');
const { retryWithBackoff } = require('./utils/retry');
const { consumeToken } = require('./utils/rateLimiter');
const { isDuplicate, markAsSent } = require('./utils/idempotency');
const { updateStatus } = require('./statusTracker');

class EmailService {
  constructor() {
    this.providerA = new ProviderA();
    this.providerB = new ProviderB();
  }

  async sendEmail(to, subject, body, requestId) {
    if (!consumeToken()) {
      updateStatus(requestId, 'rate_limited');
      return { success: false, message: 'Rate limit exceeded' };
    }

    if (isDuplicate(requestId)) {
      updateStatus(requestId, 'duplicate');
      return { success: false, message: 'Duplicate request' };
    }

    try {
      await retryWithBackoff(() => this.providerA.send(to, subject, body), 3);
      markAsSent(requestId);
      updateStatus(requestId, 'sent_by_provider_a');
      return { success: true, provider: 'A' };
    } catch (e) {
      try {
        await retryWithBackoff(() => this.providerB.send(to, subject, body), 3);
        markAsSent(requestId);
        updateStatus(requestId, 'sent_by_provider_b');
        return { success: true, provider: 'B' };
      } catch (e) {
        updateStatus(requestId, 'failed');
        throw new Error('Both providers failed');
      }
    }
  }
}

module.exports = { EmailService };