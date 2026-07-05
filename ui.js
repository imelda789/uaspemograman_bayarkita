/**
 * ============================================
 * BAYARKITA - UI MANAGEMENT
 * ============================================
 * Menangani navigasi, toast, modal, loading, tema
 */

// ============================================
// NAVIGASI
// ============================================

let currentSection = "dashboard";

/**
 * Navigasi ke section tertentu
 * @param {string} sectionId - ID section tanpa prefix "section-"
 */
function navigateTo(sectionId) {
  // Sembunyikan semua section
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  // Tampilkan section target
  const target = document.getElementById("section-" + sectionId);
  if (target) {
    target.classList.add("active");
    currentSection = sectionId;
  }

  // Update active nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-section") === sectionId) {
      link.classList.add("active");
    }
  });

  // Tutup mobile menu jika terbuka
  closeMobileMenu();

  // Scroll ke atas
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Refresh data section tertentu
  if (sectionId === "riwayat") {
    renderTransactionHistory();
  }
  if (sectionId === "dashboard") {
    updateSaldoDisplay();
    renderRecentTransactions();
  }
}

// ============================================
// MOBILE MENU
// ============================================

function toggleMobileMenu() {
  const nav = document.getElementById("navbarNav");
  const toggle = document.getElementById("mobileMenuToggle");
  const isOpen = nav.classList.toggle("active");
  toggle.innerHTML = isOpen
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
}

function closeMobileMenu() {
  const nav = document.getElementById("navbarNav");
  const toggle = document.getElementById("mobileMenuToggle");
  if (nav) nav.classList.remove("active");
  if (toggle) toggle.innerHTML = '<i class="fas fa-bars"></i>';
}

// ============================================
// DARK MODE / TEMA
// ============================================

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme") || "light";
  const next = current === "light" ? "dark" : "light";
  html.setAttribute("data-theme", next);
  setTheme(next);
  updateThemeIcon(next);
}

function applySavedTheme() {
  const theme = getTheme();
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.innerHTML =
      theme === "dark"
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
  }
}

// ============================================
// TOAST NOTIFICATION
// ============================================

/**
 * Tampilkan toast notification
 * @param {string} type - 'success' | 'error' | 'warning' | 'info'
 * @param {string} title - Judul toast
 * @param {string} message - Pesan toast
 * @param {number} duration - Durasi tampil dalam ms (default 4000)
 */
function showToast(type, title, message, duration) {
  duration = duration || 4000;
  const container = document.getElementById("toastContainer");
  const iconClass = toastIcons[type] || toastIcons.info;

  const toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.innerHTML =
    '<i class="toast-icon ' +
    iconClass +
    '"></i>' +
    '<div class="toast-content">' +
    '<p class="toast-title">' +
    escapeHtml(title) +
    "</p>" +
    '<p class="toast-message">' +
    escapeHtml(message) +
    "</p>" +
    "</div>" +
    '<button class="toast-close" onclick="this.parentElement.remove()">&times;</button>';

  container.appendChild(toast);

  // Auto remove
  setTimeout(function () {
    if (toast.parentElement) {
      toast.style.animation = "slideOut 0.3s ease forwards";
      setTimeout(function () {
        if (toast.parentElement) toast.remove();
      }, 300);
    }
  }, duration);
}

// ============================================
// LOADING OVERLAY
// ============================================

/**
 * Tampilkan loading overlay
 * @param {string} text - Teks utama
 * @param {string} subtext - Teks tambahan
 */
function showLoading(text, subtext) {
  const overlay = document.getElementById("loadingOverlay");
  const textEl = document.getElementById("loadingText");
  const subtextEl = document.getElementById("loadingSubtext");
  if (textEl) textEl.textContent = text || "Memproses...";
  if (subtextEl) subtextEl.textContent = subtext || "Mohon tunggu sebentar";
  if (overlay) overlay.classList.add("active");
}

/**
 * Sembunyikan loading overlay
 */
function hideLoading() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) overlay.classList.remove("active");
}

// ============================================
// MODAL (Generic)
// ============================================

/**
 * Tampilkan modal dengan konten HTML
 * @param {string} title - Judul modal
 * @param {string} bodyHtml - Konten HTML body
 * @param {string} footerHtml - Konten HTML footer (opsional)
 */
function showModal(title, bodyHtml, footerHtml) {
  const overlay = document.getElementById("modalOverlay");
  const titleEl = document.getElementById("modalTitle");
  const bodyEl = document.getElementById("modalBody");
  const footerEl = document.getElementById("modalFooter");

  if (titleEl) titleEl.textContent = title;
  if (bodyEl) bodyEl.innerHTML = bodyHtml;
  if (footerEl) footerEl.innerHTML = footerHtml || "";
  if (overlay) overlay.classList.add("active");
}

/**
 * Sembunyikan modal
 */
function hideModal() {
  const overlay = document.getElementById("modalOverlay");
  if (overlay) overlay.classList.remove("active");
}

// ============================================
// RECEIPT MODAL (Struk)
// ============================================

/**
 * Tampilkan modal struk
 * @param {string} receiptHtml - Konten HTML struk
 */
function showReceiptModal(receiptHtml) {
  const overlay = document.getElementById("receiptModalOverlay");
  const bodyEl = document.getElementById("receiptModalBody");
  if (bodyEl) bodyEl.innerHTML = receiptHtml;
  if (overlay) overlay.classList.add("active");
}

function hideReceiptModal() {
  const overlay = document.getElementById("receiptModalOverlay");
  if (overlay) overlay.classList.remove("active");
}

/**
 * Cetak struk (trigger window.print)
 */
function printReceipt() {
  window.print();
}

// ============================================
// TOP UP MODAL
// ============================================

function showTopUpModal() {
  let amountButtons = "";
  topUpAmounts.forEach(function (amt) {
    amountButtons +=
      '<button class="topup-amount-btn" onclick="selectTopUpAmount(this, ' +
      amt +
      ')">' +
      formatCurrency(amt) +
      "</button>";
  });

  const bodyHtml =
    '<p class="text-sm mb-4">Pilih nominal top up saldo BayarKita:</p>' +
    '<div class="topup-amount-grid" id="topUpAmountGrid">' +
    amountButtons +
    "</div>" +
    '<div class="form-group">' +
    '<label class="form-label" for="topUpCustomInput">Atau masukkan nominal lain:</label>' +
    '<input type="number" class="form-input" id="topUpCustomInput" placeholder="Minimal Rp 10.000" min="10000" />' +
    "</div>";

  const footerHtml =
    '<button class="btn btn-secondary" onclick="hideModal()">Batal</button>' +
    '<button class="btn btn-primary" id="topUpConfirmBtn" onclick="confirmTopUp()" disabled>Top Up</button>';

  showModal("Top Up Saldo", bodyHtml, footerHtml);
}

let selectedTopUpAmount = 0;

function selectTopUpAmount(btn, amount) {
  document.querySelectorAll(".topup-amount-btn").forEach(function (b) {
    b.classList.remove("selected");
  });
  btn.classList.add("selected");
  selectedTopUpAmount = amount;
  document.getElementById("topUpCustomInput").value = "";
  document.getElementById("topUpConfirmBtn").disabled = false;
}

function confirmTopUp() {
  const customInput = document.getElementById("topUpCustomInput");
  let amount = selectedTopUpAmount;

  if (customInput && customInput.value) {
    amount = parseInt(customInput.value, 10);
  }

  if (!amount || amount < 10000) {
    showToast("error", "Gagal", "Nominal top up minimal Rp 10.000");
    return;
  }

  const newSaldo = addSaldo(amount);
  updateSaldoDisplay();

  // Simpan sebagai transaksi
  saveTransaction({
    type: "topup",
    customerId: "-",
    customerName: "Top Up Saldo",
    amount: amount,
    total: amount,
    status: "success",
    detail: "Top up saldo BayarKita",
  });

  hideModal();
  selectedTopUpAmount = 0;
  showToast(
    "success",
    "Top Up Berhasil",
    "Saldo berhasil ditambah menjadi " + formatCurrency(newSaldo),
  );
  renderRecentTransactions();
}

// ============================================
// RENDER TRANSAKSI TERAKHIR (Dashboard)
// ============================================

function renderRecentTransactions() {
  const container = document.getElementById("recentTransactions");
  if (!container) return;

  const transactions = getRecentTransactions(5);

  if (transactions.length === 0) {
    container.innerHTML =
      '<div class="empty-state">' +
      '<div class="empty-state-icon"><i class="fas fa-receipt"></i></div>' +
      '<h4 class="empty-state-title">Belum Ada Transaksi</h4>' +
      '<p class="empty-state-desc">Mulai bayar tagihan untuk melihat riwayat di sini.</p>' +
      "</div>";
    return;
  }

  let html =
    '<div class="table-container"><table><thead><tr>' +
    "<th>Tanggal</th><th>Jenis</th><th>Nama</th><th>Nominal</th><th>Status</th>" +
    "</tr></thead><tbody>";

  transactions.forEach(function (tx) {
    const statusBadge =
      tx.status === "success"
        ? '<span class="badge badge-success">Berhasil</span>'
        : '<span class="badge badge-danger">Gagal</span>';

    html +=
      "<tr>" +
      '<td class="text-sm">' +
      formatDateTime(tx.createdAt) +
      "</td>" +
      '<td class="text-sm">' +
      escapeHtml(transactionTypeLabels[tx.type] || tx.type) +
      "</td>" +
      '<td class="text-sm">' +
      escapeHtml(tx.customerName) +
      "</td>" +
      '<td class="text-sm font-semibold">' +
      formatCurrency(tx.total) +
      "</td>" +
      "<td>" +
      statusBadge +
      "</td>" +
      "</tr>";
  });

  html += "</tbody></table></div>";
  container.innerHTML = html;
}

// ============================================
// RENDER BILL RESULT (generic untuk PLN, PDAM, Internet, Seminar)
// ============================================

/**
 * Render hasil cek tagihan
 * @param {string} containerId - ID container hasil
 * @param {Object} data - Data tagihan
 * @param {string} type - Jenis tagihan
 * @param {string} customerId - ID pelanggan yang dicek
 */
function renderBillResult(containerId, data, type, customerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const label = transactionTypeLabels[type] || type;
  let detailRows = "";

  detailRows +=
    '<div class="bill-result-row"><span class="bill-result-label">ID</span><span class="bill-result-value">' +
    escapeHtml(data.id) +
    "</span></div>";
  detailRows +=
    '<div class="bill-result-row"><span class="bill-result-label">Nama</span><span class="bill-result-value">' +
    escapeHtml(data.name) +
    "</span></div>";

  if (data.address) {
    detailRows +=
      '<div class="bill-result-row"><span class="bill-result-label">Alamat</span><span class="bill-result-value">' +
      escapeHtml(data.address) +
      "</span></div>";
  }
  if (data.period) {
    detailRows +=
      '<div class="bill-result-row"><span class="bill-result-label">Periode</span><span class="bill-result-value">' +
      escapeHtml(data.period) +
      "</span></div>";
  }
  if (data.category) {
    detailRows +=
      '<div class="bill-result-row"><span class="bill-result-label">Golongan</span><span class="bill-result-value">' +
      escapeHtml(data.category) +
      "</span></div>";
  }
  if (data.usage) {
    detailRows +=
      '<div class="bill-result-row"><span class="bill-result-label">Pemakaian</span><span class="bill-result-value">' +
      escapeHtml(data.usage) +
      "</span></div>";
  }
  if (data.package) {
    detailRows +=
      '<div class="bill-result-row"><span class="bill-result-label">Paket</span><span class="bill-result-value">' +
      escapeHtml(data.package) +
      "</span></div>";
  }
  if (data.provider) {
    detailRows +=
      '<div class="bill-result-row"><span class="bill-result-label">Provider</span><span class="bill-result-value">' +
      escapeHtml(data.provider) +
      "</span></div>";
  }
  if (data.title) {
    detailRows +=
      '<div class="bill-result-row"><span class="bill-result-label">Judul</span><span class="bill-result-value">' +
      escapeHtml(data.title) +
      "</span></div>";
  }
  if (data.speaker) {
    detailRows +=
      '<div class="bill-result-row"><span class="bill-result-label">Pembicara</span><span class="bill-result-value">' +
      escapeHtml(data.speaker) +
      "</span></div>";
  }
  if (data.date) {
    detailRows +=
      '<div class="bill-result-row"><span class="bill-result-label">Tanggal</span><span class="bill-result-value">' +
      escapeHtml(data.date) +
      "</span></div>";
  }
  if (data.time) {
    detailRows +=
      '<div class="bill-result-row"><span class="bill-result-label">Waktu</span><span class="bill-result-value">' +
      escapeHtml(data.time) +
      "</span></div>";
  }
  if (data.venue) {
    detailRows +=
      '<div class="bill-result-row"><span class="bill-result-label">Tempat</span><span class="bill-result-value">' +
      escapeHtml(data.venue) +
      "</span></div>";
  }

  detailRows +=
    '<div class="bill-result-row"><span class="bill-result-label">Tagihan</span><span class="bill-result-value">' +
    formatCurrency(data.amount) +
    "</span></div>";

  if (data.penalty > 0) {
    detailRows +=
      '<div class="bill-result-row"><span class="bill-result-label">Denda</span><span class="bill-result-value text-danger">' +
      formatCurrency(data.penalty) +
      "</span></div>";
  }

  const daysLeft = daysUntil(data.dueDate);
  const dueDateColor = daysLeft <= 3 ? "text-danger" : "text-warning";
  detailRows +=
    '<div class="bill-result-row"><span class="bill-result-label">Jatuh Tempo</span><span class="bill-result-value ' +
    dueDateColor +
    '">' +
    formatDate(data.dueDate) +
    " (" +
    daysLeft +
    " hari lagi)</span></div>";

  const html =
    '<div class="bill-result">' +
    '<div class="bill-result-header">' +
    '<div class="bill-result-status">' +
    '<div class="bill-result-status-icon"><i class="fas fa-file-invoice"></i></div>' +
    '<div><p class="font-bold">Tagihan ' +
    escapeHtml(label) +
    '</p><p class="text-sm text-secondary">Ditemukan</p></div>' +
    "</div>" +
    '<span class="badge badge-warning">Belum Dibayar</span>' +
    "</div>" +
    '<div class="bill-result-detail">' +
    detailRows +
    "</div>" +
    '<div class="bill-result-total">' +
    '<span class="bill-result-total-label">Total Bayar</span>' +
    '<span class="bill-result-total-value">' +
    formatCurrency(data.total) +
    "</span>" +
    "</div>" +
    '<div class="mt-4">' +
    '<button class="btn btn-primary btn-block btn-lg" onclick="showPaymentMethods(\'' +
    type +
    "', '" +
    escapeHtml(customerId) +
    "', " +
    data.total +
    ')">' +
    '<i class="fas fa-credit-card"></i> Bayar Sekarang' +
    "</button>" +
    "</div>" +
    "</div>";

  container.innerHTML = html;
  container.classList.remove("hidden");
}

// ============================================
// CLOSE MODAL ON OVERLAY CLICK
// ============================================
document.addEventListener("click", function (e) {
  if (e.target.id === "modalOverlay") hideModal();
  if (e.target.id === "receiptModalOverlay") hideReceiptModal();
});

// Close on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    hideModal();
    hideReceiptModal();
  }
});
