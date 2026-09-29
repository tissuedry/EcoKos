const rupiah = new Intl.NumberFormat("id-ID");

export const formatRupiah = (value: number): string => `Rp ${rupiah.format(Math.round(value))}`;

export const formatKwh = (value: number, digits = 2): string => `${value.toFixed(digits)} kWh`;

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});
const timeFormatter = new Intl.DateTimeFormat("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export const formatDate = (iso: string): string => dateFormatter.format(new Date(iso));

export const formatTime = (iso: string): string =>
  `${timeFormatter.format(new Date(iso)).replace(".", ":")} WIB`;
