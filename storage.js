/**
 * ============================================
 * BAYARKITA - LOCAL STORAGE MANAGEMENT
 * ============================================
 */

const STORAGE_KEYS = {
  TRANSACTIONS: "bayarkita_transactions",
  SALDO: "bayarkita_saldo",
  THEME: "bayarkita_theme",
  SPP_STATE: "bayarkita_spp_state",
};

/**
 * Ambil saldo dari localStorage
 * @returns {number}
 */
function getSaldo() {
  const saved = localStorage.getItem(STORAGE_KEYS.SALDO);
  return saved ? parseInt(saved, 10) : 500000; // Default saldo awal
}

/**
 * Simpan saldo ke localStorage
 * @param {number} amount
 */
function setSaldo(amount) {
  localStorage.setItem(STORAGE_KEYS.SALDO, amount.toString());
}

/**
 * Tambah saldo (top up)
 * @param {number} amount - Nominal yang ditambahkan
 * @returns {number} Saldo baru
 */
function addSaldo(amount) {
  const current = getSaldo();
  const newSaldo = current + amount;
  setSaldo(newSaldo);
  return newSaldo;
}

/**
 * Kurangi saldo (pembayaran)
 * @param {number} amount - Nominal yang dikurangkan
 * @returns {boolean} true jika berhasil, false jika saldo tidak cukup
 */
function deductSaldo(amount) {
  const current = getSaldo();
  if (current < amount) return false;
  setSaldo(current - amount);
  return true;
}

/**
 * Update tampilan saldo di dashboard
 */
function updateSaldoDisplay() {
  const el = document.getElementById("saldoDisplay");
  if (el) {
    el.textContent = formatCurrency(getSaldo());
  }
}

/**
 * Ambil semua transaksi dari localStorage
 * @returns {Array}
 */
function getTransactions() {
  const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  return saved ? JSON.parse(saved) : [];
}

/**
 * Simpan transaksi baru
 * @param {Object} transaction - Data transaksi
 * @returns {Object} Transaksi yang disimpan
 */
function saveTransaction(transaction) {
  const transactions = getTransactions();
  transaction.id = transaction.id || generateTransactionId();
  transaction.createdAt = transaction.createdAt || getNowISO();
  transactions.unshift(transaction); // Tambah di awal array
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  return transaction;
}

/**
 * Ambil transaksi terakhir (n item)
 * @param {number} count - Jumlah transaksi
 * @returns {Array}
 */
function getRecentTransactions(count) {
  return getTransactions().slice(0, count);
}

/**
 * Ambil tema dari localStorage
 * @returns {string} 'light' atau 'dark'
 */
function getTheme() {
  return localStorage.getItem(STORAGE_KEYS.THEME) || "light";
}

/**
 * Simpan tema ke localStorage
 * @param {string} theme
 */
function setTheme(theme) {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

/**
 * Hapus semua data (untuk debug/reset)
 */
function clearAllData() {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
