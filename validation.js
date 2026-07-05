/**
 * ============================================
 * BAYARKITA - FORM VALIDATION
 * ============================================
 */

/**
 * Validasi ID Pelanggan PLN (12 digit angka)
 * @param {string} id
 * @returns {Object} { valid: boolean, message: string }
 */
function validatePlnId(id) {
  if (!id || id.trim() === "") {
    return { valid: false, message: "ID Pelanggan tidak boleh kosong" };
  }
  if (!/^\d{12}$/.test(id.trim())) {
    return { valid: false, message: "ID Pelanggan harus 12 digit angka" };
  }
  return { valid: true, message: "" };
}

/**
 * Validasi No. Sambungan PDAM (12 digit angka)
 * @param {string} id
 * @returns {Object}
 */
function validatePdamId(id) {
  if (!id || id.trim() === "") {
    return { valid: false, message: "No. Sambungan tidak boleh kosong" };
  }
  if (!/^\d{12}$/.test(id.trim())) {
    return { valid: false, message: "No. Sambungan harus 12 digit angka" };
  }
  return { valid: true, message: "" };
}

/**
 * Validasi No. Pelanggan Internet (12 digit angka)
 * @param {string} id
 * @returns {Object}
 */
function validateInternetId(id) {
  if (!id || id.trim() === "") {
    return { valid: false, message: "No. Pelanggan tidak boleh kosong" };
  }
  if (!/^\d{12}$/.test(id.trim())) {
    return { valid: false, message: "No. Pelanggan harus 12 digit angka" };
  }
  return { valid: true, message: "" };
}

/**
 * Validasi Kode Seminar
 * @param {string} code
 * @returns {Object}
 */
function validateSeminarCode(code) {
  if (!code || code.trim() === "") {
    return { valid: false, message: "Kode Seminar tidak boleh kosong" };
  }
  if (!/^SEM-\d{4}-\d{3}$/.test(code.trim())) {
    return {
      valid: false,
      message: "Format kode: SEM-YYYY-NNN (contoh: SEM-2025-001)",
    };
  }
  return { valid: true, message: "" };
}

/**
 * Validasi NIM (7-10 digit angka)
 * @param {string} nim
 * @returns {Object}
 */
function validateNIM(nim) {
  if (!nim || nim.trim() === "") {
    return { valid: false, message: "NIM tidak boleh kosong" };
  }
  if (!/^\d{7,10}$/.test(nim.trim())) {
    return { valid: false, message: "NIM harus 7-10 digit angka" };
  }
  return { valid: true, message: "" };
}

/**
 * Validasi nomor HP (10-13 digit, dimulai 08)
 * @param {string} phone
 * @returns {Object}
 */
function validatePhone(phone) {
  if (!phone || phone.trim() === "") {
    return { valid: false, message: "Nomor HP tidak boleh kosong" };
  }
  if (!/^08\d{8,11}$/.test(phone.trim())) {
    return {
      valid: false,
      message: "Nomor HP tidak valid (10-13 digit, dimulai 08)",
    };
  }
  return { valid: true, message: "" };
}

/**
 * Tampilkan error pada form input
 * @param {string} inputId - ID elemen input
 * @param {string} errorId - ID elemen error message
 * @param {string} message - Pesan error
 */
function showFormError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.add("error");
  if (error) {
    error.textContent = message;
    error.classList.add("show");
  }
}

/**
 * Hapus error pada form input
 * @param {string} inputId
 * @param {string} errorId
 */
function clearFormError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.remove("error");
  if (error) error.classList.remove("show");
}

/**
 * Hapus semua error di dalam sebuah container
 * @param {string} containerId
 */
function clearAllErrors(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container
    .querySelectorAll(".form-input.error")
    .forEach((el) => el.classList.remove("error"));
  container
    .querySelectorAll(".error-message.show")
    .forEach((el) => el.classList.remove("show"));
}
