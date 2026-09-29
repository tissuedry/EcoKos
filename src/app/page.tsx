import { redirect } from "next/navigation";

/** Alur dimulai dari halaman autentikasi. */
export default function HomePage() {
  redirect("/auth");
}
