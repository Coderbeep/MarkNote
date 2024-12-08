if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}
