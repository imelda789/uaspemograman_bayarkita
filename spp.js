/**
 * ============================================
 * BAYARKITA - SPP PAYMENT LOGIC
 * ============================================
 */

let sppPaymentState = {
  nim: "",
  name: "",
  prodi: "",
  fakultas: "",
  semester: 0,
  angkatan: 0,
  installments: [],
  selectedMonths: [],
  totalAmount: 0,
};

/**
 * Cek tagihan SPP berdasarkan NIM
 */
function checkSppBill() {
  clearFormError("sppNimInput", "sppNimError");

  const nimInput = document.getElementById("sppNimInput");
  const nim = nimInput ? nimInput.value.trim() : "";

  const validation = validateNIM(nim);
  if (!validation.valid) {
    showFormError("sppNimInput", "sppNimError", validation.message);
    return;
  }

  const student = sppData[nim];
  if (!student) {
    showFormError(
      "sppNimInput",
      "sppNimError",
      "NIM tidak ditemukan dalam database",
    );
    return;
  }

  showLoading("Mencari Data", "Memuat data tagihan SPP...");

  setTimeout(function () {
    hideLoading();

    // Set state
    sppPaymentState.nim = student.nim;
    sppPaymentState.name = student.name;
    sppPaymentState.prodi = student.prodi;
    sppPaymentState.fakultas = student.fakultas;
    sppPaymentState.semester = student.semester;
    sppPaymentState.angkatan = student.angkatan;
    sppPaymentState.installments = student.installments;
    sppPaymentState.selectedMonths = [];
    sppPaymentState.totalAmount = 0;

    renderSppBill(nim);
  }, 1000);
}

/**
 * Render tabel tagihan SPP
 * @param {string} nim
 */
function renderSppBill(nim) {
  const container = document.getElementById("sppBillResult");
  if (!container) return;

  const student = sppData[nim];
  if (!student) return;

  let rows = "";
  student.installments.forEach(function (item, index) {
    const isPaid = item.status === "paid";
    const isDisabled = isPaid ? "disabled" : "";
    const isChecked = !isPaid ? "" : "";
    const statusBadge = isPaid
      ? '<span class="badge badge-success">Lunas</span>'
      : '<span class="badge badge-warning">Belum</span>';

    rows +=
      "<tr>" +
      '<td class="text-center"><input type="checkbox" class="spp-checkbox" data-index="' +
      index +
      '" ' +
      isDisabled +
      ' onchange="toggleSppMonth(' +
      index +
      ')" /></td>' +
      "<td>" +
      escapeHtml(item.month) +
      "</td>" +
      '<td class="text-right">' +
      formatCurrency(item.amount) +
      "</td>" +
      "<td>" +
      (isPaid ? formatDateTime(item.paidAt) : "-") +
      "</td>" +
      "<td>" +
      statusBadge +
      "</td>" +
      "</tr>";
  });

  const html =
    '<div class="bill-result">' +
    '<div class="bill-result-header">' +
    '<div class="bill-result-status">' +
    '<div class="bill-result-status-icon"><i class="fas fa-school"></i></div>' +
    "<div>" +
    '<p class="font-bold">' +
    escapeHtml(student.name) +
    "</p>" +
    '<p class="text-sm text-secondary">' +
    escapeHtml(student.prodi) +
    " - " +
    escapeHtml(student.fakultas) +
    "</p>" +
    '<p class="text-sm text-secondary">NIM: ' +
    escapeHtml(student.nim) +
    " | Semester " +
    student.semester +
    " | Angkatan " +
    student.angkatan +
    "</p>" +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="table-container">' +
    '<table class="spp-table">' +
    "<thead><tr>" +
    '<th class="text-center">Pilih</th>' +
    "<th>Bulan</th>" +
    '<th class="text-right">Nominal</th>' +
    "<th>Tanggal Bayar</th>" +
    "<th>Status</th>" +
    "</tr></thead>" +
    "<tbody>" +
    rows +
    "</tbody>" +
    "</table>" +
    "</div>" +
    '<div class="spp-total-bar">' +
    '<span class="spp-total-label">Total Bulan Dipilih: <strong id="sppSelectedCount">0</strong> bulan</span>' +
    '<span class="spp-total-amount" id="sppTotalDisplay">' +
    formatCurrency(0) +
    "</span>" +
    "</div>" +
    '<div class="mt-4">' +
    '<button class="btn btn-primary btn-block btn-lg" id="sppPayBtn" onclick="paySpp()" disabled>' +
    '<i class="fas fa-credit-card"></i> Bayar SPP' +
    "</button>" +
    "</div>" +
    "</div>";

  container.innerHTML = html;
  container.classList.remove("hidden");
}

/**
 * Toggle pilihan bulan SPP
 * @param {number} index
 */
function toggleSppMonth(index) {
  const student = sppData[sppPaymentState.nim];
  if (!student) return;

  const installment = student.installments[index];
  if (installment.status === "paid") return;

  const pos = sppPaymentState.selectedMonths.indexOf(index);
  if (pos === -1) {
    sppPaymentState.selectedMonths.push(index);
  } else {
    sppPaymentState.selectedMonths.splice(pos, 1);
  }

  calculateSPPTotal();
}

/**
 * Hitung total SPP yang dipilih
 */
function calculateSPPTotal() {
  const student = sppData[sppPaymentState.nim];
  if (!student) return;

  let total = 0;
  sppPaymentState.selectedMonths.forEach(function (idx) {
    total += student.installments[idx].amount;
  });

  sppPaymentState.totalAmount = total;

  const countEl = document.getElementById("sppSelectedCount");
  const totalEl = document.getElementById("sppTotalDisplay");
  const payBtn = document.getElementById("sppPayBtn");

  if (countEl) countEl.textContent = sppPaymentState.selectedMonths.length;
  if (totalEl) totalEl.textContent = formatCurrency(total);
  if (payBtn) payBtn.disabled = sppPaymentState.selectedMonths.length === 0;
}

/**
 * Proses pembayaran SPP
 */
function paySpp() {
  if (sppPaymentState.selectedMonths.length === 0) {
    showToast("warning", "Perhatian", "Pilih minimal 1 bulan SPP");
    return;
  }

  // Set nama bulan untuk struk
  sppPaymentState.months = sppPaymentState.selectedMonths.map(function (idx) {
    return sppData[sppPaymentState.nim].installments[idx].month;
  });

  showPaymentMethods("spp", sppPaymentState.nim, sppPaymentState.totalAmount);
}

/**
 * Reset state SPP setelah pembayaran
 */
function resetSppState() {
  sppPaymentState = {
    nim: "",
    name: "",
    prodi: "",
    fakultas: "",
    semester: 0,
    angkatan: 0,
    installments: [],
    selectedMonths: [],
    totalAmount: 0,
    months: [],
  };

  const nimInput = document.getElementById("sppNimInput");
  if (nimInput) nimInput.value = "";
}
