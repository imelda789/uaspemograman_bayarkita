/**
 * ============================================
 * BAYARKITA - DATA DUMMY
 * ============================================
 * Data simulasi untuk aplikasi pembayaran tagihan.
 * Tidak terhubung ke backend/database nyata.
 */

// ============================================
// DATA TAGIHAN PLN (Listrik)
// ============================================
const plnData = {
  123456789012: {
    id: "PLN-001",
    name: "Budi Santoso",
    address: "Jl. Merdeka No. 45, Jakarta Pusat",
    period: "Juni 2025",
    amount: 245000,
    penalty: 0,
    total: 245000,
    dueDate: "2025-07-20",
    status: "unpaid",
    category: "R1-900VA",
  },
  987654321098: {
    id: "PLN-002",
    name: "Siti Aminah",
    address: "Jl. Sudirman No. 78, Bandung",
    period: "Juni 2025",
    amount: 512000,
    penalty: 15000,
    total: 527000,
    dueDate: "2025-07-20",
    status: "unpaid",
    category: "R1-1300VA",
  },
  456789012345: {
    id: "PLN-003",
    name: "Ahmad Hidayat",
    address: "Jl. Ahmad Yani No. 23, Surabaya",
    period: "Juni 2025",
    amount: 178000,
    penalty: 0,
    total: 178000,
    dueDate: "2025-07-20",
    status: "unpaid",
    category: "R1-450VA",
  },
  789012345678: {
    id: "PLN-004",
    name: "Dewi Lestari",
    address: "Jl. Gatot Subroto No. 56, Yogyakarta",
    period: "Juni 2025",
    amount: 890000,
    penalty: 25000,
    total: 915000,
    dueDate: "2025-07-20",
    status: "unpaid",
    category: "R2-2200VA",
  },
  321654987012: {
    id: "PLN-005",
    name: "Rudi Hartono",
    address: "Jl. Thamrin No. 12, Medan",
    period: "Juni 2025",
    amount: 345000,
    penalty: 0,
    total: 345000,
    dueDate: "2025-07-20",
    status: "unpaid",
    category: "R1-900VA",
  },
};

// ============================================
// DATA TAGIHAN PDAM
// ============================================
const pdamData = {
  112233445566: {
    id: "PDM-001",
    name: "Budi Santoso",
    address: "Jl. Merdeka No. 45, Jakarta Pusat",
    period: "Juni 2025",
    amount: 125000,
    penalty: 0,
    total: 125000,
    dueDate: "2025-07-15",
    status: "unpaid",
    usage: "25 m³",
  },
  998877665544: {
    id: "PDM-002",
    name: "Siti Aminah",
    address: "Jl. Sudirman No. 78, Bandung",
    period: "Juni 2025",
    amount: 89000,
    penalty: 10000,
    total: 99000,
    dueDate: "2025-07-15",
    status: "unpaid",
    usage: "18 m³",
  },
  556677889900: {
    id: "PDM-003",
    name: "Rina Wulandari",
    address: "Jl. Diponegoro No. 90, Semarang",
    period: "Juni 2025",
    amount: 156000,
    penalty: 0,
    total: 156000,
    dueDate: "2025-07-15",
    status: "unpaid",
    usage: "32 m³",
  },
  334455667788: {
    id: "PDM-004",
    name: "Hendra Prasetya",
    address: "Jl. Pahlawan No. 33, Malang",
    period: "Juni 2025",
    amount: 67000,
    penalty: 5000,
    total: 72000,
    dueDate: "2025-07-15",
    status: "unpaid",
    usage: "14 m³",
  },
};

// ============================================
// DATA TAGIHAN INTERNET
// ============================================
const internetData = {
  556677889900: {
    id: "NET-001",
    name: "Andi Wijaya",
    address: "Jl. Imam Bonjol No. 15, Jakarta Selatan",
    period: "Juni 2025",
    amount: 350000,
    penalty: 0,
    total: 350000,
    dueDate: "2025-07-10",
    status: "unpaid",
    package: "Fiber 50 Mbps",
    provider: "NetFast",
  },
  223344556677: {
    id: "NET-002",
    name: "Maya Sari",
    address: "Jl. Gajah Mada No. 67, Denpasar",
    period: "Juni 2025",
    amount: 450000,
    penalty: 20000,
    total: 470000,
    dueDate: "2025-07-10",
    status: "unpaid",
    package: "Fiber 100 Mbps",
    provider: "NetFast",
  },
  889900112233: {
    id: "NET-003",
    name: "Fajar Nugroho",
    address: "Jl. Veteran No. 22, Yogyakarta",
    period: "Juni 2025",
    amount: 275000,
    penalty: 0,
    total: 275000,
    dueDate: "2025-07-10",
    status: "unpaid",
    package: "Fiber 30 Mbps",
    provider: "SpeedNet",
  },
};

// ============================================
// DATA TAGIHAN SEMINAR
// ============================================
const seminarData = {
  "SEM-2025-001": {
    id: "SEM-001",
    title: "Seminar Nasional AI & Machine Learning 2025",
    speaker: "Prof. Dr. Ir. Surya Adi Nugroho, M.Sc.",
    date: "25 Agustus 2025",
    time: "09:00 - 16:00 WIB",
    venue: "Auditorium Utama, Universitas Teknologi Nusantara",
    amount: 250000,
    penalty: 0,
    total: 250000,
    dueDate: "2025-08-20",
    status: "unpaid",
  },
  "SEM-2025-002": {
    id: "SEM-002",
    title: "Workshop Cybersecurity: Ethical Hacking Fundamentals",
    speaker: "Bambang Sutejo, CISSP, CEH",
    date: "15 September 2025",
    time: "08:00 - 17:00 WIB",
    venue: "Lab Komputer Lantai 3, Politeknik Digital",
    amount: 350000,
    penalty: 0,
    total: 350000,
    dueDate: "2025-09-10",
    status: "unpaid",
  },
  "SEM-2025-003": {
    id: "SEM-003",
    title: "Seminar Web Development Trends 2025",
    speaker: "Rizky Pratama, Google Developer Expert",
    date: "5 Oktober 2025",
    time: "13:00 - 17:00 WIB",
    venue: "Co-Working Space Hub, Jakarta Selatan",
    amount: 150000,
    penalty: 0,
    total: 150000,
    dueDate: "2025-10-01",
    status: "unpaid",
  },
  "SEM-2025-004": {
    id: "SEM-004",
    title: "Konferensi Cloud Computing & DevOps",
    speaker: "Dr. Linda Kusuma, AWS Solutions Architect",
    date: "20 Oktober 2025",
    time: "09:00 - 15:00 WIB",
    venue: "Ballroom Hotel Grand Mercure, Bandung",
    amount: 500000,
    penalty: 0,
    total: 500000,
    dueDate: "2025-10-15",
    status: "unpaid",
  },
};

// ============================================
// DATA TAGIHAN SPP (per NIM)
// ============================================
const sppData = {
  2023001: {
    nim: "2023001",
    name: "Ahmad Rizki Pratama",
    prodi: "Teknik Informatika",
    fakultas: "Fakultas Ilmu Komputer",
    semester: 4,
    angkatan: 2023,
    installments: [
      {
        month: "Februari 2025",
        amount: 1200000,
        status: "paid",
        paidAt: "2025-02-05",
      },
      {
        month: "Maret 2025",
        amount: 1200000,
        status: "paid",
        paidAt: "2025-03-03",
      },
      {
        month: "April 2025",
        amount: 1200000,
        status: "paid",
        paidAt: "2025-04-02",
      },
      { month: "Mei 2025", amount: 1200000, status: "unpaid", paidAt: null },
      { month: "Juni 2025", amount: 1200000, status: "unpaid", paidAt: null },
      { month: "Juli 2025", amount: 1200000, status: "unpaid", paidAt: null },
    ],
  },
  2023002: {
    nim: "2023002",
    name: "Siti Nurhaliza",
    prodi: "Sistem Informasi",
    fakultas: "Fakultas Ilmu Komputer",
    semester: 4,
    angkatan: 2023,
    installments: [
      {
        month: "Februari 2025",
        amount: 1100000,
        status: "paid",
        paidAt: "2025-02-10",
      },
      {
        month: "Maret 2025",
        amount: 1100000,
        status: "paid",
        paidAt: "2025-03-08",
      },
      { month: "April 2025", amount: 1100000, status: "unpaid", paidAt: null },
      { month: "Mei 2025", amount: 1100000, status: "unpaid", paidAt: null },
      { month: "Juni 2025", amount: 1100000, status: "unpaid", paidAt: null },
      { month: "Juli 2025", amount: 1100000, status: "unpaid", paidAt: null },
    ],
  },
  2022001: {
    nim: "2022001",
    name: "Dina Marlina",
    prodi: "Teknik Informatika",
    fakultas: "Fakultas Ilmu Komputer",
    semester: 6,
    angkatan: 2022,
    installments: [
      {
        month: "Februari 2025",
        amount: 1500000,
        status: "paid",
        paidAt: "2025-02-01",
      },
      {
        month: "Maret 2025",
        amount: 1500000,
        status: "paid",
        paidAt: "2025-03-01",
      },
      {
        month: "April 2025",
        amount: 1500000,
        status: "paid",
        paidAt: "2025-04-01",
      },
      {
        month: "Mei 2025",
        amount: 1500000,
        status: "paid",
        paidAt: "2025-05-01",
      },
      { month: "Juni 2025", amount: 1500000, status: "unpaid", paidAt: null },
      { month: "Juli 2025", amount: 1500000, status: "unpaid", paidAt: null },
    ],
  },
  2024001: {
    nim: "2024001",
    name: "Rizky Fauzan",
    prodi: "Manajemen Informatika",
    fakultas: "Fakultas Vokasi",
    semester: 2,
    angkatan: 2024,
    installments: [
      {
        month: "Februari 2025",
        amount: 900000,
        status: "paid",
        paidAt: "2025-02-15",
      },
      {
        month: "Maret 2025",
        amount: 900000,
        status: "paid",
        paidAt: "2025-03-12",
      },
      { month: "April 2025", amount: 900000, status: "unpaid", paidAt: null },
      { month: "Mei 2025", amount: 900000, status: "unpaid", paidAt: null },
      { month: "Juni 2025", amount: 900000, status: "unpaid", paidAt: null },
      { month: "Juli 2025", amount: 900000, status: "unpaid", paidAt: null },
    ],
  },
};

// ============================================
// DATA PROVIDER PULSA
// ============================================
const pulsaProviders = [
  {
    id: "telkomsel",
    name: "Telkomsel",
    icon: "fas fa-signal",
    color: "#e4002b",
  },
  { id: "xl", name: "XL", icon: "fas fa-signal", color: "#0064d2" },
  { id: "indosat", name: "Indosat", icon: "fas fa-signal", color: "#ffd500" },
  { id: "tri", name: "Tri", icon: "fas fa-signal", color: "#e60012" },
  {
    id: "smartfren",
    name: "Smartfren",
    icon: "fas fa-signal",
    color: "#ff0000",
  },
  { id: "axis", name: "Axis", icon: "fas fa-signal", color: "#009bdf" },
];

// ============================================
// DATA NOMINAL PULSA (per provider)
// ============================================
const pulsaNominals = {
  telkomsel: [
    { amount: 5000, price: 6000 },
    { amount: 10000, price: 11000 },
    { amount: 15000, price: 16000 },
    { amount: 25000, price: 26000 },
    { amount: 50000, price: 51000 },
    { amount: 100000, price: 101000 },
  ],
  xl: [
    { amount: 5000, price: 6000 },
    { amount: 10000, price: 11000 },
    { amount: 15000, price: 15500 },
    { amount: 25000, price: 25500 },
    { amount: 50000, price: 50500 },
    { amount: 100000, price: 100500 },
  ],
  indosat: [
    { amount: 5000, price: 6000 },
    { amount: 10000, price: 11000 },
    { amount: 15000, price: 16000 },
    { amount: 25000, price: 26000 },
    { amount: 50000, price: 51000 },
    { amount: 100000, price: 100500 },
  ],
  tri: [
    { amount: 5000, price: 5500 },
    { amount: 10000, price: 10500 },
    { amount: 15000, price: 15500 },
    { amount: 25000, price: 25000 },
    { amount: 50000, price: 50000 },
    { amount: 100000, price: 99500 },
  ],
  smartfren: [
    { amount: 5000, price: 6000 },
    { amount: 10000, price: 11000 },
    { amount: 15000, price: 16000 },
    { amount: 25000, price: 26000 },
    { amount: 50000, price: 51000 },
    { amount: 100000, price: 101000 },
  ],
  axis: [
    { amount: 5000, price: 5500 },
    { amount: 10000, price: 10500 },
    { amount: 15000, price: 15000 },
    { amount: 25000, price: 25000 },
    { amount: 50000, price: 49500 },
    { amount: 100000, price: 99000 },
  ],
};

// ============================================
// DATA PAKET DATA (per provider)
// ============================================
const paketDataNominals = {
  telkomsel: [
    { amount: "1 GB", price: 15000, desc: "30 Hari" },
    { amount: "3 GB", price: 30000, desc: "30 Hari" },
    { amount: "5 GB", price: 45000, desc: "30 Hari" },
    { amount: "10 GB", price: 75000, desc: "30 Hari" },
    { amount: "15 GB", price: 100000, desc: "30 Hari" },
    { amount: "25 GB", price: 150000, desc: "30 Hari" },
  ],
  xl: [
    { amount: "1 GB", price: 12000, desc: "30 Hari" },
    { amount: "3 GB", price: 25000, desc: "30 Hari" },
    { amount: "5 GB", price: 40000, desc: "30 Hari" },
    { amount: "10 GB", price: 65000, desc: "30 Hari" },
    { amount: "15 GB", price: 90000, desc: "30 Hari" },
    { amount: "25 GB", price: 135000, desc: "30 Hari" },
  ],
  indosat: [
    { amount: "1 GB", price: 13000, desc: "30 Hari" },
    { amount: "3 GB", price: 28000, desc: "30 Hari" },
    { amount: "5 GB", price: 42000, desc: "30 Hari" },
    { amount: "10 GB", price: 70000, desc: "30 Hari" },
    { amount: "15 GB", price: 95000, desc: "30 Hari" },
    { amount: "25 GB", price: 140000, desc: "30 Hari" },
  ],
  tri: [
    { amount: "1 GB", price: 10000, desc: "30 Hari" },
    { amount: "3 GB", price: 22000, desc: "30 Hari" },
    { amount: "5 GB", price: 35000, desc: "30 Hari" },
    { amount: "10 GB", price: 60000, desc: "30 Hari" },
    { amount: "15 GB", price: 85000, desc: "30 Hari" },
    { amount: "25 GB", price: 125000, desc: "30 Hari" },
  ],
  smartfren: [
    { amount: "1 GB", price: 11000, desc: "30 Hari" },
    { amount: "3 GB", price: 24000, desc: "30 Hari" },
    { amount: "5 GB", price: 38000, desc: "30 Hari" },
    { amount: "10 GB", price: 65000, desc: "30 Hari" },
    { amount: "15 GB", price: 88000, desc: "30 Hari" },
    { amount: "25 GB", price: 130000, desc: "30 Hari" },
  ],
  axis: [
    { amount: "1 GB", price: 9500, desc: "30 Hari" },
    { amount: "3 GB", price: 20000, desc: "30 Hari" },
    { amount: "5 GB", price: 33000, desc: "30 Hari" },
    { amount: "10 GB", price: 55000, desc: "30 Hari" },
    { amount: "15 GB", price: 80000, desc: "30 Hari" },
    { amount: "25 GB", price: 120000, desc: "30 Hari" },
  ],
};

// ============================================
// DATA METODE PEMBAYARAN
// ============================================
const paymentMethods = [
  {
    id: "va-bca",
    name: "Virtual Account BCA",
    desc: "Bayar via ATM, M-Banking, atau Internet Banking BCA",
    icon: "fas fa-building-columns",
    type: "va",
    bank: "BCA",
    prefix: "8810",
  },
  {
    id: "va-bni",
    name: "Virtual Account BNI",
    desc: "Bayar via ATM, M-Banking, atau Internet Banking BNI",
    icon: "fas fa-building-columns",
    type: "va",
    bank: "BNI",
    prefix: "8809",
  },
  {
    id: "va-mandiri",
    name: "Virtual Account Mandiri",
    desc: "Bayar via ATM, M-Banking, atau Internet Banking Mandiri",
    icon: "fas fa-building-columns",
    type: "va",
    bank: "Mandiri",
    prefix: "8901",
  },
  {
    id: "qris",
    name: "QRIS",
    desc: "Scan QR dengan e-wallet atau mobile banking manapun",
    icon: "fas fa-qrcode",
    type: "qris",
  },
  {
    id: "teller",
    name: "Bayar via Teller/Minimarket",
    desc: "Bayar tunai di Indomaret, Alfamart, atau kantor pos",
    icon: "fas fa-store",
    type: "teller",
  },
];

// ============================================
// DATA LOKASI TELLER
// ============================================
const tellerLocations = [
  "Indomaret - Jl. Merdeka No. 12",
  "Indomaret - Jl. Sudirman No. 55",
  "Alfamart - Jl. Ahmad Yani No. 78",
  "Alfamart - Jl. Gatot Subroto No. 33",
  "Kantor Pos Pusat - Jl. Thamrin No. 1",
];

// ============================================
// DATA TOAST ICONS
// ============================================
const toastIcons = {
  success: "fas fa-check-circle",
  error: "fas fa-exclamation-circle",
  warning: "fas fa-exclamation-triangle",
  info: "fas fa-info-circle",
};

// ============================================
// DATA LABEL JENIS TRANSAKSI
// ============================================
const transactionTypeLabels = {
  listrik: "Listrik PLN",
  pdam: "Air PDAM",
  internet: "Internet",
  seminar: "Seminar",
  spp: "SPP Kuliah",
  pulsa: "Pulsa",
  "paket-data": "Paket Data",
  topup: "Top Up Saldo",
};

// ============================================
// DATA TOP-UP NOMINAL
// ============================================
const topUpAmounts = [50000, 100000, 200000, 300000, 500000, 1000000];
