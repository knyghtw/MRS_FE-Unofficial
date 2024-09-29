export default function currency(price) {
  const priceCurrency = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    price
  );

  return priceCurrency
}
