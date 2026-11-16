const rupiah = (n) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

const $ = (id) => document.getElementById(id);

function tampilkanError(pesan) {
  $("error").textContent = pesan;
  $("error").hidden = false;
  $("hasil").hidden = true;
}

function hitung() {
  const harga = parseFloat($("harga").value) || 0;
  const dp = parseFloat($("dp").value) || 0;
  const bunga = parseFloat($("bunga").value) || 0;
  const tenor = parseInt($("tenor").value, 10) || 0;

  $("error").hidden = true;

  if (harga <= 0) return tampilkanError("Masukkan harga barang yang valid.");
  if (dp < 0 || dp >= harga) return tampilkanError("DP harus lebih kecil dari harga barang.");
  if (bunga < 0) return tampilkanError("Bunga tidak boleh negatif.");
  if (tenor < 1) return tampilkanError("Tenor minimal 1 bulan.");

  // Rumus bunga flat:
  // total bunga = pokok x bunga/tahun x (tenor / 12)
  const pokok = harga - dp;
  const totalBunga = pokok * (bunga / 100) * (tenor / 12);
  const totalBayar = pokok + totalBunga;
  const cicilan = totalBayar / tenor;

  $("cicilan").textContent = rupiah(cicilan);
  $("pokok").textContent = rupiah(pokok);
  $("totalBunga").textContent = rupiah(totalBunga);
  $("totalBayar").textContent = rupiah(totalBayar);
  $("hasil").hidden = false;
}

$("hitung").addEventListener("click", hitung);
document.querySelectorAll("input").forEach((el) =>
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") hitung();
  })
);
