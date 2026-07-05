/**
 * ============================================
 * BAYARKITA - PULSA & PAKET DATA LOGIC
 * ============================================
 */

// ============================================
// STATE PULSA
// ============================================
let pulsaState = {
  providerId: null,
  providerName: "",
  phone: "",
  nominalAmount: 0,
  nominalPrice: 0,
};

// ============================================
// STATE PAKET DATA
// ============================================
let paketState = {
  providerId: null,
  providerName: "",
  phone: "",
  nominalLabel: "",
  nominalPrice: 0,
  nominalDesc: "",
};

// ============================================
// INIT: Render provider grid saat section dibuka
// ============================================

function initPulsaSection() {
  renderProviderGrid("pulsaProviderGrid", function (providerId) {
    selectPulsaProvider(providerId);
  });
  renderPulsaNominals();
}

function initPaketSection() {
  renderProviderGrid("paketProviderGrid", function (providerId) {
    selectPaketProvider(providerId);
  });
  renderPaketNominals();
}

/**
 * Render grid provider
 * @param {string} containerId
 * @param {Function} onSelect - Callback saat provider dipilih
 */
function renderProviderGrid(containerId, onSelect) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let html = "";
  pulsaProviders.forEach(function (provider) {
    html +=
      '<div class="provider-card" data-provider="' +
      provider.id +
      "\" onclick=\"this.parentElement.querySelectorAll('.provider-card').forEach(function(c){c.classList.remove('selected')});this.classList.add('selected');(" +
      onSelect.toString() +
      ")('" +
      provider.id +
      "')\">" +
      '<span class="provider-card-icon"><i class="' +
      provider.icon +
      '" style="color:' +
      provider.color +
      '"></i></span>' +
      '<p class="provider-card-name">' +
      escapeHtml(provider.name) +
      "</p>" +
      "</div>";
  });

  container.innerHTML = html;
}

// ============================================
// PULSA FUNCTIONS
// ============================================

function selectPulsaProvider(providerId) {
  pulsaState.providerId = providerId;
  const provider = pulsaProviders.find(function (p) {
    return p.id === providerId;
  });
  pulsaState.providerName = provider ? provider.name : "";
  pulsaState.nominalAmount = 0;
  pulsaState.nominalPrice = 0;
  renderPulsaNominals();
  updatePulsaBuyButton();
}

function renderPulsaNominals() {
  const container = document.getElementById("pulsaNominalGrid");
  if (!container) return;

  const nominals = pulsaNominals[pulsaState.providerId] || [];

  if (nominals.length === 0) {
    container.innerHTML =
      '<p class="text-sm text-muted" style="grid-column:1/-1;">Pilih provider terlebih dahulu</p>';
    return;
  }

  let html = "";
  nominals.forEach(function (item, index) {
    html +=
      '<div class="nominal-card" data-index="' +
      index +
      '" onclick="selectPulsaNominal(' +
      index +
      ')">' +
      '<p class="nominal-card-amount">' +
      formatCurrency(item.amount) +
      "</p>" +
      '<p class="nominal-card-price">Harga: ' +
      formatCurrency(item.price) +
      "</p>" +
      "</div>";
  });

  container.innerHTML = html;
}

function selectPulsaNominal(index) {
  const nominals = pulsaNominals[pulsaState.providerId] || [];
  if (index < 0 || index >= nominals.length) return;

  const item = nominals[index];
  pulsaState.nominalAmount = item.amount;
  pulsaState.nominalPrice = item.price;

  // Update selected state
  document
    .querySelectorAll("#pulsaNominalGrid .nominal-card")
    .forEach(function (card, i) {
      card.classList.toggle("selected", i === index);
    });

  updatePulsaBuyButton();
}

function updatePulsaBuyButton() {
  const btn = document.getElementById("pulsaBuyBtn");
  if (!btn) return;

  const phoneValid = validatePhone(pulsaState.phone).valid;
  const providerSelected = pulsaState.providerId !== null;
  const nominalSelected = pulsaState.nominalAmount > 0;

  btn.disabled = !(phoneValid && providerSelected && nominalSelected);

  if (nominalSelected) {
    btn.innerHTML =
      '<i class="fas fa-cart-shopping"></i> Beli Pulsa ' +
      formatCurrency(pulsaState.nominalAmount) +
      " - " +
      formatCurrency(pulsaState.nominalPrice);
  } else {
    btn.innerHTML = '<i class="fas fa-cart-shopping"></i> Beli Pulsa';
  }
}

function buyPulsa() {
  clearFormError("pulsaPhoneInput", "pulsaPhoneError");

  const phoneInput = document.getElementById("pulsaPhoneInput");
  pulsaState.phone = phoneInput ? phoneInput.value.trim() : "";

  const validation = validatePhone(pulsaState.phone);
  if (!validation.valid) {
    showFormError("pulsaPhoneInput", "pulsaPhoneError", validation.message);
    return;
  }

  if (!pulsaState.providerId) {
    showToast("warning", "Perhatian", "Pilih provider terlebih dahulu");
    return;
  }

  if (pulsaState.nominalAmount === 0) {
    showToast("warning", "Perhatian", "Pilih nominal pulsa terlebih dahulu");
    return;
  }

  showPaymentMethods("pulsa", pulsaState.phone, pulsaState.nominalPrice);
}

function resetPulsaState() {
  pulsaState = {
    providerId: null,
    providerName: "",
    phone: "",
    nominalAmount: 0,
    nominalPrice: 0,
  };
  const phoneInput = document.getElementById("pulsaPhoneInput");
  if (phoneInput) phoneInput.value = "";
  renderPulsaNominals();
  updatePulsaBuyButton();
  // Reset provider selection visual
  document
    .querySelectorAll("#pulsaProviderGrid .provider-card")
    .forEach(function (c) {
      c.classList.remove("selected");
    });
}

// ============================================
// PAKET DATA FUNCTIONS
// ============================================

function selectPaketProvider(providerId) {
  paketState.providerId = providerId;
  const provider = pulsaProviders.find(function (p) {
    return p.id === providerId;
  });
  paketState.providerName = provider ? provider.name : "";
  paketState.nominalLabel = "";
  paketState.nominalPrice = 0;
  renderPaketNominals();
  updatePaketBuyButton();
}

function renderPaketNominals() {
  const container = document.getElementById("paketNominalGrid");
  if (!container) return;

  const packages = paketDataNominals[paketState.providerId] || [];

  if (packages.length === 0) {
    container.innerHTML =
      '<p class="text-sm text-muted" style="grid-column:1/-1;">Pilih provider terlebih dahulu</p>';
    return;
  }

  let html = "";
  packages.forEach(function (item, index) {
    html +=
      '<div class="nominal-card" data-index="' +
      index +
      '" onclick="selectPaketNominal(' +
      index +
      ')">' +
      '<p class="nominal-card-amount">' +
      escapeHtml(item.amount) +
      "</p>" +
      '<p class="nominal-card-price">' +
      formatCurrency(item.price) +
      "</p>" +
      '<p class="nominal-card-desc">' +
      escapeHtml(item.desc) +
      "</p>" +
      "</div>";
  });

  container.innerHTML = html;
}

function selectPaketNominal(index) {
  const packages = paketDataNominals[paketState.providerId] || [];
  if (index < 0 || index >= packages.length) return;

  const item = packages[index];
  paketState.nominalLabel = item.amount;
  paketState.nominalPrice = item.price;
  paketState.nominalDesc = item.desc;

  document
    .querySelectorAll("#paketNominalGrid .nominal-card")
    .forEach(function (card, i) {
      card.classList.toggle("selected", i === index);
    });

  updatePaketBuyButton();
}

function updatePaketBuyButton() {
  const btn = document.getElementById("paketBuyBtn");
  if (!btn) return;

  const phoneValid = validatePhone(paketState.phone).valid;
  const providerSelected = paketState.providerId !== null;
  const nominalSelected = paketState.nominalPrice > 0;

  btn.disabled = !(phoneValid && providerSelected && nominalSelected);

  if (nominalSelected) {
    btn.innerHTML =
      '<i class="fas fa-cart-shopping"></i> Beli ' +
      paketState.nominalLabel +
      " - " +
      formatCurrency(paketState.nominalPrice);
  } else {
    btn.innerHTML = '<i class="fas fa-cart-shopping"></i> Beli Paket Data';
  }
}

function buyPaketData() {
  clearFormError("paketPhoneInput", "paketPhoneError");

  const phoneInput = document.getElementById("paketPhoneInput");
  paketState.phone = phoneInput ? phoneInput.value.trim() : "";

  const validation = validatePhone(paketState.phone);
  if (!validation.valid) {
    showFormError("paketPhoneInput", "paketPhoneError", validation.message);
    return;
  }

  if (!paketState.providerId) {
    showToast("warning", "Perhatian", "Pilih provider terlebih dahulu");
    return;
  }

  if (paketState.nominalPrice === 0) {
    showToast("warning", "Perhatian", "Pilih paket data terlebih dahulu");
    return;
  }

  showPaymentMethods("paket-data", paketState.phone, paketState.nominalPrice);
}

function resetPaketState() {
  paketState = {
    providerId: null,
    providerName: "",
    phone: "",
    nominalLabel: "",
    nominalPrice: 0,
    nominalDesc: "",
  };
  const phoneInput = document.getElementById("paketPhoneInput");
  if (phoneInput) phoneInput.value = "";
  renderPaketNominals();
  updatePaketBuyButton();
  document
    .querySelectorAll("#paketProviderGrid .provider-card")
    .forEach(function (c) {
      c.classList.remove("selected");
    });
}
