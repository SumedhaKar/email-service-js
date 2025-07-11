async function retryWithBackoff(fn, retries = 3, delay = 1000) {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (e) {
      if (attempt === retries - 1) throw e;
      await new Promise((res) => setTimeout(res, delay * 2 ** attempt));
      attempt++;
    }
  }
  throw new Error('All retries failed');
}
module.exports = { retryWithBackoff };