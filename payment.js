/**
 * ============================================
 * BAYARKITA - PAYMENT PROCESSING
 * ============================================
 * Menangani pemilihan metode bayar, proses VA/QRIS/Teller
 */

let currentPaymentData = {
  type: "",
  customerId: "",
  total: 0,
};

/**
 * Tampilkan pilihan metode pembayaran
 * @param {string} type - Jenis tagihan
 * @param {string} customerId - ID pelanggan
 * @param {number} total - Total yang harus dibayar
 */
function showPaymentMethods(type, customerId, total) {
  // Cek saldo dulu
  const saldo = getSaldo();
  if (saldo < total) {
    showToast(
      "error",
      "Saldo Tidak Cukup",
      "Saldo Anda " +
        formatCurrency(saldo) +
        ", butuh " +
        formatCurrency(total) +
        ". Silakan top up terlebih dahulu.",
    );
    return;
  }

  currentPaymentData = { type: type, customerId: customerId, total: total };

  let methodsHtml = "";
  paymentMethods.forEach(function (method) {
    methodsHtml +=
      '<div class="payment-method" onclick="selectPaymentMethod(\'' +
      method.id +
      '\')" data-method-id="' +
      method.id +
      '">' +
      '<div class="payment-method-radio"></div>' +
      '<div class="payment-method-icon"><i class="' +
      method.icon +
      '"></i></div>' +
      '<div class="payment-method-info">' +
      '<p class="payment-method-name">' +
      escapeHtml(method.name) +
      "</p>" +
      '<p class="payment-method-desc">' +
      escapeHtml(method.desc) +
      "</p>" +
      "</div>" +
      "</div>";
  });

  const bodyHtml =
    '<div class="mb-4">' +
    '<p class="text-sm">Jenis: <strong>' +
    escapeHtml(transactionTypeLabels[type]) +
    "</strong></p>" +
    '<p class="text-sm">ID: <strong>' +
    escapeHtml(customerId) +
    "</strong></p>" +
    '<p class="text-lg font-bold text-primary mt-2">Total: ' +
    formatCurrency(total) +
    "</p>" +
    "</div>" +
    '<p class="form-label">Pilih Metode Pembayaran:</p>' +
    '<div class="payment-methods" id="paymentMethodsList">' +
    methodsHtml +
    "</div>";

  const footerHtml =
    '<button class="btn btn-secondary" onclick="hideModal()">Batal</button>' +
    '<button class="btn btn-primary" id="payConfirmBtn" onclick="confirmPayment()" disabled>Bayar ' +
    formatCurrency(total) +
    "</button>";

  showModal("Pembayaran", bodyHtml, footerHtml);
}

let selectedPaymentMethod = null;

function selectPaymentMethod(methodId) {
  selectedPaymentMethod = methodId;

  document.querySelectorAll(".payment-method").forEach(function (el) {
    el.classList.remove("selected");
  });
  const selected = document.querySelector(
    '.payment-method[data-method-id="' + methodId + '"]',
  );
  if (selected) selected.classList.add("selected");

  document.getElementById("payConfirmBtn").disabled = false;
}

function confirmPayment() {
  if (!selectedPaymentMethod) {
    showToast(
      "warning",
      "Perhatian",
      "Pilih metode pembayaran terlebih dahulu",
    );
    return;
  }

  hideModal();
  showLoading("Memproses Pembayaran", "Menggenerate kode pembayaran...");

  // Simulasi delay proses
  setTimeout(function () {
    hideLoading();

    const method = paymentMethods.find(function (m) {
      return m.id === selectedPaymentMethod;
    });
    if (!method) {
      showToast("error", "Error", "Metode pembayaran tidak ditemukan");
      return;
    }

    const txId = generateTransactionId();

    if (method.type === "va") {
      showVAPayment(txId, method);
    } else if (method.type === "qris") {
      showQRISPayment(txId, method);
    } else if (method.type === "teller") {
      showTellerPayment(txId, method);
    }

    selectedPaymentMethod = null;
  }, 1500);
}

// ============================================
// VIRTUAL ACCOUNT PAYMENT
// ============================================

function showVAPayment(txId, method) {
  const vaNumber = generateVANumber(method.prefix, txId);

  const bodyHtml =
    '<div class="va-display">' +
    '<p class="va-bank"><i class="fas fa-building-columns"></i> ' +
    escapeHtml(method.bank) +
    " Virtual Account</p>" +
    '<p class="va-number">' +
    vaNumber +
    "</p>" +
    '<p class="va-label">Nomor Virtual Account di atas berlaku selama 24 jam</p>' +
    "</div>" +
    '<div class="mt-4">' +
    '<p class="text-sm"><strong>Cara Bayar:</strong></p>' +
    '<ol class="text-sm mt-2" style="padding-left: 1.5rem;">' +
    "<li>Buka aplikasi M-Banking " +
    escapeHtml(method.bank) +
    " atau ATM terdekat</li>" +
    "<li>Pilih menu <strong>Transfer</strong> ke <strong>Virtual Account</strong></li>" +
    "<li>Masukkan nomor VA: <strong>" +
    vaNumber +
    "</strong></li>" +
    "<li>Masukkan nominal: <strong>" +
    formatCurrency(currentPaymentData.total) +
    "</strong></li>" +
    "<li>Konfirmasi dan selesaikan pembayaran</li>" +
    "</ol>" +
    "</div>";

  const footerHtml =
    '<button class="btn btn-outline btn-sm" onclick="copyToClipboard(\'' +
    vaNumber +
    '\')"><i class="fas fa-copy"></i> Salin No. VA</button>' +
    '<button class="btn btn-primary btn-sm" onclick="simulatePaymentSuccess(\'' +
    txId +
    "')\">Simulasi Bayar</button>";

  showModal("Pembayaran VA " + method.bank, bodyHtml, footerHtml);
}

// ============================================
// QRIS PAYMENT
// ============================================

function showQRISPayment(txId, method) {
  const bodyHtml =
    '<div class="qris-display">' +
    '<div class="receipt-qr" style="width:200px;height:200px;">' +
    '<div><i class="fas fa-qrcode" style="font-size:4rem;color:#999;"></i></div>' +
    "</div>" +
    '<p class="font-bold mt-2">Scan QR Code di atas</p>' +
    '<p class="text-sm">Menggunakan e-wallet atau mobile banking</p>' +
    '<div class="qris-timer"><i class="fas fa-clock"></i> <span id="qrisTimer">14:59</span></div>' +
    '<div class="qris-instructions">' +
    '<p class="font-semibold mb-2">Petunjuk Pembayaran:</p>' +
    '<ol style="padding-left:1.5rem;text-align:left;">' +
    "<li>Buka aplikasi e-wallet (GoPay, OVO, DANA, ShopeePay, dll)</li>" +
    "<li>Pilih menu <strong>Scan QR</strong></li>" +
    "<li>Arahkan kamera ke QR Code di atas</li>" +
    "<li>Konfirmasi pembayaran " +
    formatCurrency(currentPaymentData.total) +
    "</li>" +
    "</ol>" +
    "</div>" +
    "</div>";

  const footerHtml =
    '<button class="btn btn-primary btn-sm" onclick="simulatePaymentSuccess(\'' +
    txId +
    "')\">Simulasi Bayar</button>";

  showModal("Pembayaran QRIS", bodyHtml, footerHtml);

  // Start countdown timer
  startQrisTimer(899); // 14:59 detik
}

let qrisTimerInterval = null;

function startQrisTimer(seconds) {
  if (qrisTimerInterval) clearInterval(qrisTimerInterval);

  const timerEl = document.getElementById("qrisTimer");
  if (!timerEl) return;

  qrisTimerInterval = setInterval(function () {
    seconds--;
    if (seconds <= 0) {
      clearInterval(qrisTimerInterval);
      if (timerEl) timerEl.textContent = "Kadaluarsa";
      showToast(
        "error",
        "QRIS Kadaluarsa",
        "Waktu pembayaran QRIS telah habis. Silakan coba lagi.",
      );
      return;
    }
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (timerEl)
      timerEl.textContent =
        String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }, 1000);
}

// ============================================
// TELLER PAYMENT
// ============================================

function showTellerPayment(txId, method) {
  const code = generateTellerCode();

  let locationsHtml = "";
  tellerLocations.forEach(function (loc) {
    locationsHtml +=
      '<div class="teller-location-item"><i class="fas fa-map-marker-alt text-primary"></i> ' +
      escapeHtml(loc) +
      "</div>";
  });

  const bodyHtml =
    '<div class="teller-display">' +
    '<p class="va-label">Kode Pembayaran</p>' +
    '<p class="teller-code">' +
    code +
    "</p>" +
    '<p class="text-sm">Berikan kode ini ke kasir</p>' +
    "</div>" +
    '<div class="mt-4">' +
    '<p class="form-label">Lokasi Pembayaran:</p>' +
    '<div class="teller-locations">' +
    locationsHtml +
    "</div>" +
    "</div>";

  const footerHtml =
    '<button class="btn btn-outline btn-sm" onclick="copyToClipboard(\'' +
    code +
    '\')"><i class="fas fa-copy"></i> Salin Kode</button>' +
    '<button class="btn btn-primary btn-sm" onclick="simulatePaymentSuccess(\'' +
    txId +
    "')\">Simulasi Bayar</button>";

  showModal("Pembayaran via Teller", bodyHtml, footerHtml);
}

// ============================================
// SIMULASI PEMBAYARAN BERHASIL
// ============================================

function simulatePaymentSuccess(txId) {
  if (qrisTimerInterval) clearInterval(qrisTimerInterval);
  hideModal();

  showLoading("Memproses", "Memverifikasi pembayaran...");

  setTimeout(function () {
    hideLoading();

    // Kurangi saldo
    const success = deductSaldo(currentPaymentData.total);

    if (!success) {
      showToast("error", "Pembayaran Gagal", "Saldo tidak mencukupi");
      return;
    }

    // Ambil data detail berdasarkan tipe
    let detail = "";
    let customerName = "-";
    const cid = currentPaymentData.customerId;

    if (currentPaymentData.type === "listrik" && plnData[cid]) {
      customerName = plnData[cid].name;
      detail = plnData[cid].period + " - " + plnData[cid].category;
    } else if (currentPaymentData.type === "pdam" && pdamData[cid]) {
      customerName = pdamData[cid].name;
      detail = pdamData[cid].period + " - " + pdamData[cid].usage;
    } else if (currentPaymentData.type === "internet" && internetData[cid]) {
      customerName = internetData[cid].name;
      detail = internetData[cid].period + " - " + internetData[cid].package;
    } else if (currentPaymentData.type === "seminar" && seminarData[cid]) {
      customerName = seminarData[cid].title;
      detail = seminarData[cid].date;
    } else if (currentPaymentData.type === "spp") {
      customerName = sppPaymentState.name || "Mahasiswa";
      detail = sppPaymentState.months.join(", ");
    } else if (currentPaymentData.type === "pulsa") {
      customerName = pulsaState.phone || "-";
      detail =
        (pulsaState.providerName || "") +
        " - " +
        formatCurrency(pulsaState.nominalAmount);
    } else if (currentPaymentData.type === "paket-data") {
      customerName = paketState.phone || "-";
      detail =
        (paketState.providerName || "") + " - " + paketState.nominalLabel;
    }

    // Simpan transaksi
    const transaction = saveTransaction({
      type: currentPaymentData.type,
      customerId: cid,
      customerName: customerName,
      amount: currentPaymentData.total,
      total: currentPaymentData.total,
      status: "success",
      detail: detail,
      txId: txId,
    });

    // Update saldo display
    updateSaldoDisplay();

    // Tampilkan struk
    showReceipt(transaction);

    showToast(
      "success",
      "Pembayaran Berhasil",
      formatCurrency(currentPaymentData.total) +
        " untuk " +
        (transactionTypeLabels[currentPaymentData.type] ||
          currentPaymentData.type),
    );

    // Reset bill result jika ada
    const resultContainers = [
      "plnBillResult",
      "pdamBillResult",
      "internetBillResult",
      "seminarBillResult",
      "sppBillResult",
    ];
    resultContainers.forEach(function (id) {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = "";
        el.classList.add("hidden");
      }
    });

    // Reset SPP state
    if (currentPaymentData.type === "spp") {
      resetSppState();
    }

    // Reset pulsa/paket state
    if (currentPaymentData.type === "pulsa") {
      resetPulsaState();
    }
    if (currentPaymentData.type === "paket-data") {
      resetPaketState();
    }
  }, 2000);
}

// ============================================
// STRUK / RECEIPT
// ============================================

function showReceipt(transaction) {
  const receiptHtml =
    '<div class="receipt">' +
    '<div class="receipt-header">' +
    '<p class="receipt-logo">BayarKita</p>' +
    '<p class="receipt-title">Bukti Pembayaran</p>' +
    '<p class="receipt-id">' +
    escapeHtml(transaction.txId || transaction.id) +
    "</p>" +
    "</div>" +
    '<div class="receipt-body">' +
    '<div class="receipt-row"><span class="label">Tanggal</span><span>' +
    formatDateTime(transaction.createdAt) +
    "</span></div>" +
    '<div class="receipt-row"><span class="label">Jenis</span><span>' +
    escapeHtml(transactionTypeLabels[transaction.type] || transaction.type) +
    "</span></div>" +
    '<div class="receipt-row"><span class="label">ID Pelanggan</span><span>' +
    escapeHtml(transaction.customerId) +
    "</span></div>" +
    '<div class="receipt-row"><span class="label">Nama</span><span>' +
    escapeHtml(transaction.customerName) +
    "</span></div>" +
    (transaction.detail
      ? '<div class="receipt-row"><span class="label">Detail</span><span>' +
        escapeHtml(transaction.detail) +
        "</span></div>"
      : "") +
    '<div class="receipt-row total"><span>TOTAL</span><span>' +
    formatCurrency(transaction.total) +
    "</span></div>" +
    '<div class="receipt-row"><span class="label">Status</span><span style="color: var(--success);">BERHASIL</span></div>' +
    "</div>" +
    '<div class="receipt-footer">' +
    "<p>Terima kasih telah menggunakan BayarKita</p>" +
    "<p>Simpan struk ini sebagai bukti pembayaran</p>" +
    "</div>" +
    "</div>";

  showReceiptModal(receiptHtml);
}

// ============================================
// RIWAYAT TRANSAKSI
// ============================================

let currentFilter = "all";

function filterTransactions(filter) {
  currentFilter = filter;

  document.querySelectorAll(".filter-btn").forEach(function (btn) {
    btn.classList.remove("active");
    if (btn.getAttribute("data-filter") === filter) {
      btn.classList.add("active");
    }
  });

  renderTransactionHistory();
}

function renderTransactionHistory() {
  const tbody = document.getElementById("transactionTableBody");
  const emptyEl = document.getElementById("emptyHistory");
  const tableContainer = document.getElementById("transactionTableContainer");
  const statTotal = document.getElementById("statTotal");
  const statSuccess = document.getElementById("statSuccess");
  const statFailed = document.getElementById("statFailed");
  const statAmount = document.getElementById("statAmount");

  const allTransactions = getTransactions();

  // Update stats
  const successCount = allTransactions.filter(function (t) {
    return t.status === "success";
  }).length;
  const failedCount = allTransactions.filter(function (t) {
    return t.status === "failed";
  }).length;
  const totalAmount = allTransactions
    .filter(function (t) {
      return t.status === "success";
    })
    .reduce(function (sum, t) {
      return sum + t.total;
    }, 0);

  if (statTotal) statTotal.textContent = allTransactions.length;
  if (statSuccess) statSuccess.textContent = successCount;
  if (statFailed) statFailed.textContent = failedCount;
  if (statAmount) statAmount.textContent = formatCurrency(totalAmount);

  // Filter
  let filtered = allTransactions;
  if (currentFilter !== "all") {
    filtered = allTransactions.filter(function (t) {
      return t.type === currentFilter;
    });
  }

  if (filtered.length === 0) {
    if (tbody) tbody.innerHTML = "";
    if (tableContainer) tableContainer.classList.add("hidden");
    if (emptyEl) emptyEl.classList.remove("hidden");
    return;
  }

  if (tableContainer) tableContainer.classList.remove("hidden");
  if (emptyEl) emptyEl.classList.add("hidden");

  let html = "";
  filtered.forEach(function (tx) {
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
      escapeHtml(tx.customerId) +
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
      '<td><button class="btn btn-ghost btn-sm" onclick="viewTransactionReceipt(\'' +
      escapeHtml(tx.id || tx.txId || "") +
      '\')"><i class="fas fa-receipt"></i></button></td>' +
      "</tr>";
  });

  if (tbody) tbody.innerHTML = html;
}

function viewTransactionReceipt(txId) {
  const transactions = getTransactions();
  const tx = transactions.find(function (t) {
    return (t.id || t.txId) === txId;
  });
  if (tx) {
    showReceipt(tx);
  } else {
    showToast("error", "Error", "Transaksi tidak ditemukan");
  }
}

// ============================================
// COPY TO CLIPBOARD
// ============================================

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      showToast("success", "Berhasil Disalin", text);
    });
  } else {
    // Fallback
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showToast("success", "Berhasil Disalin", text);
  }
}
