const statusMap = new Map();

function updateStatus(id, status) {
  statusMap.set(id, status);
}

function getStatus(id) {
  return statusMap.get(id);
}

module.exports = { updateStatus, getStatus };