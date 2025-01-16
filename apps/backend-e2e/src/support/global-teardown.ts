module.exports = async function () {
  if (globalThis.__SERVER_PROCESS__) {
    globalThis.__SERVER_PROCESS__.kill();
  }
};
