const limit = 5;
let tokens = limit;
setInterval(() => { tokens = limit; }, 60000);

function consumeToken() {
  if (tokens > 0) {
    tokens--;
    return true;
  }
  return false;
}
module.exports = { consumeToken };