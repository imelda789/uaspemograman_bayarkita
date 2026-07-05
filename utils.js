/**
 * ============================================
 * BAYARKITA - UTILITY FUNCTIONS
 * ============================================
 */

/**
 * Format angka menjadi format Rupiah
 * @param {number} amount - Nominal yang akan diformat
 * @returns {string} Format Rupiah, contoh: Rp 245.000
 */
function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return "Rp 0";
  return "Rp " + Math.round(amount).toLocaleString("id-ID");
}

/**
 * Format tanggal ke string Indonesia
 * @param {string} dateStr - Tanggal format ISO (YYYY-MM-DD)
 * @returns {string} Tanggal format Indonesia, contoh: 20 Juli 2025
 */
function formatDate(dateStr) {
  if (!dateStr) return "-";
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Format tanggal dan waktu
 * @param {string} dateStr - Tanggal format ISO
 * @returns {string} Format lengkap dengan jam
 */
function formatDateTime(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  const time = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formatDate(dateStr) + " " + time;
}

/**
 * Generate ID Transaksi unik
 * Format: BK-YYYYMMDD-XXXXXX
 * @returns {string}
 */
function generateTransactionId() {
  const now = new Date();
  const datePart =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BK-${datePart}-${randomPart}`;
}

/**
 * Generate kode pembayaran VA
 * @param {string} prefix - Prefix bank (contoh: 8810)
 * @param {string} txId - ID transaksi
 * @returns {string} Nomor VA 16 digit
 */
function generateVANumber(prefix, txId) {
  const cleanTxId = txId.replace(/[^0-9]/g, "");
  const base = prefix + cleanTxId;
  return base.substring(0, 16).padEnd(16, "0");
}

/**
 * Generate kode teller 8 digit
 * @returns {string}
 */
function generateTellerCode() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

/**
 * Debounce function
 * @param {Function} func - Fungsi yang akan di-debounce
 * @param {number} wait - Waktu tunggu dalam ms
 * @returns {Function}
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Hanya izinkan input angka
 * @param {KeyboardEvent} e - Event keyboard
 */
function onlyNumberKey(e) {
  const charCode = e.which ? e.which : e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    e.preventDefault();
  }
}

/**
 * Escape HTML untuk mencegah XSS
 * @param {string} str - String yang akan di-escape
 * @returns {string}
 */
function escapeHtml(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/**
 * Hitung selisih hari dari sekarang
 * @param {string} dateStr - Tanggal target
 * @returns {number} Selisih hari (negatif = sudah lewat)
 */
function daysUntil(dateStr) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

/**
 * Dapatkan tanggal saat ini format ISO
 * @returns {string}
 */
function getNowISO() {
  return new Date().toISOString();
}
