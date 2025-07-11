const sentRequests = new Set();

function isDuplicate(requestId) {
  return sentRequests.has(requestId);
}

function markAsSent(requestId) {
  sentRequests.add(requestId);
}

module.exports = { isDuplicate, markAsSent };