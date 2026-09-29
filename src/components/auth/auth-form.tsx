"use client";

import { ArrowRight, AtSign, Building2, DoorClosed, Eye, EyeOff, Gauge, Lock, ShieldCheck, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Field, IconInput, inputClass } from "@/components/ui/form-field";
import { KOS_OPTIONS, QUOTA } from "@/data/kos";
import { cn } from "@/lib/cn";
import { saveSession } from "@/lib/session";

type Mode = "login" | "register";

interface FormValues {
  name: string;
  username: string;
  password: string;
  kos: string;
  room: string;
  quota: number;
  remember: boolean;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  name: "",
  username: "",
  password: "",
  kos: KOS_OPTIONS[0],
  room: "",
  quota: QUOTA.default,
  remember: true,
};

/** Validasi sisi klien saja; backend belum ada. */
function validate(mode: Mode, values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.username.trim()) {
    errors.username = "Username wajib diisi.";
  } else if (values.username.trim().length < 3) {
    errors.username = "Username minimal 3 karakter.";
  }
  if (values.password.length < 8) errors.password = "Kata sandi minimal 8 karakter.";
  if (mode === "register") {
    if (!values.name.trim()) errors.name = "Nama lengkap wajib diisi.";
    if (!values.room.trim()) errors.room = "Isi nomor kamar.";
  }
  return errors;
}

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("register");
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const isRegister = mode === "register";
  const quotaFill = ((values.quota - QUOTA.min) / (QUOTA.max - QUOTA.min)) * 100;

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) =>
    setValues((previous) => ({ ...previous, [key]: value }));

  const switchMode = (next: Mode) => {
    setMode(next);
    setErrors({});
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(mode, values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    saveSession({
      name: isRegister ? values.name.trim() : values.username.trim(),
      username: values.username.trim(),
      kos: isRegister ? values.kos : KOS_OPTIONS[0],
      room: isRegister ? values.room.trim() : "204",
      quotaKwh: values.quota,
    });
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col justify-between bg-white p-8 lg:col-span-7 lg:p-12">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/30 pb-4">
          <div>
            <h2 className="text-2xl leading-8 font-bold tracking-tight">
              {isRegister ? "Daftar Akun Baru" : "Masuk ke EcoKos"}
            </h2>
            <p className="text-xs text-ink-muted">
              {isRegister
                ? "Mulai kendalikan penggunaan energi kamar kosmu hari ini."
                : "Selamat datang kembali! Lanjutkan pantau listrik kamarmu."}
            </p>
          </div>
          <div role="tablist" className="flex rounded-xl border border-line/30 bg-surface-mid p-1.5 text-xs font-semibold">
            {(["login", "register"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={mode === tab}
                onClick={() => switchMode(tab)}
                className={cn(
                  "rounded-lg px-5 py-2 transition-colors",
                  mode === tab ? "bg-white text-primary shadow-card" : "text-ink-muted hover:text-ink",
                )}
              >
                {tab === "login" ? "Masuk" : "Daftar Akun Baru"}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className={cn("grid gap-3", isRegister && "sm:grid-cols-2")}>
            {isRegister && (
              <Field label="Nama Lengkap" htmlFor="name" error={errors.name}>
                <IconInput
                  id="name"
                  icon={<User className="size-3" />}
                  placeholder="Dimas Pratama"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => update("name", event.target.value)}
                />
              </Field>
            )}
            <Field label="Username Mahasiswa" htmlFor="username" error={errors.username}>
              <IconInput
                id="username"
                type="text"
                icon={<AtSign className="size-3.5" />}
                placeholder="dimas_pratama"
                autoComplete="username"
                value={values.username}
                onChange={(event) => update("username", event.target.value.toLowerCase().replace(/\s+/g, "_"))}
              />
            </Field>
          </div>

          <Field label="Kata Sandi" htmlFor="password" error={errors.password}>
            <IconInput
              id="password"
              type={showPassword ? "text" : "password"}
              icon={<Lock className="size-3.5" />}
              placeholder="Minimal 8 karakter"
              autoComplete={isRegister ? "new-password" : "current-password"}
              value={values.password}
              onChange={(event) => update("password", event.target.value)}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  className="text-ink-subtle hover:text-ink"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
            />
          </Field>

          {isRegister && (
            <>
              <div className="grid gap-3 sm:grid-cols-12">
                <Field label="Pilihan Kosan Terdaftar" htmlFor="kos" className="sm:col-span-8">
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2 text-ink-subtle" />
                    <select
                      id="kos"
                      value={values.kos}
                      onChange={(event) => update("kos", event.target.value)}
                      className={cn(inputClass, "pl-10")}
                    >
                      {KOS_OPTIONS.map((kos) => (
                        <option key={kos}>{kos}</option>
                      ))}
                    </select>
                  </div>
                </Field>
                <Field label="No. Kamar" htmlFor="room" error={errors.room} className="sm:col-span-4">
                  <IconInput
                    id="room"
                    icon={<DoorClosed className="size-3.5" />}
                    placeholder="204"
                    inputMode="numeric"
                    value={values.room}
                    onChange={(event) => update("room", event.target.value)}
                  />
                </Field>
              </div>

              <div className="flex flex-col gap-2 rounded-xl border border-line/30 bg-surface-low p-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="quota" className="flex items-center gap-1.5 text-xs font-semibold">
                    <Gauge className="size-3.5 text-primary" aria-hidden />
                    Target Kuota Listrik Kamar
                  </label>
                  <span className="rounded-md bg-mint/60 px-2 py-0.5 text-xs font-bold text-primary">
                    {values.quota} kWh / bln
                  </span>
                </div>
                <input
                  id="quota"
                  type="range"
                  className="eco-range"
                  min={QUOTA.min}
                  max={QUOTA.max}
                  step={QUOTA.step}
                  value={values.quota}
                  style={{ "--fill": `${quotaFill}%` } as React.CSSProperties}
                  onChange={(event) => update("quota", Number(event.target.value))}
                />
                <div className="flex justify-between text-[10px] text-ink-muted">
                  <span>30 kWh (Hemat)</span>
                  <span>Standar: 65 - 90 kWh</span>
                  <span>150 kWh (Tinggi)</span>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <label className="flex cursor-pointer items-center gap-2 font-medium text-ink-muted">
              <input
                type="checkbox"
                checked={values.remember}
                onChange={(event) => update("remember", event.target.checked)}
                className="size-4 accent-primary"
              />
              Ingat akun di perangkat ini
            </label>
            <span className="text-[11px] text-ink-muted">
              {isRegister ? "Dengan mendaftar, kamu setuju aturan kos." : "Lupa kata sandi? Hubungi pengelola kos."}
            </span>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald py-3 text-sm font-semibold text-white shadow-float transition-colors hover:bg-emerald/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {isRegister ? "Daftar Akun EcoKos" : "Masuk"}
            <ArrowRight className="size-3.5" aria-hidden />
          </button>
        </form>
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-xl flex-wrap items-center justify-between gap-2 border-t border-line/30 pt-5 text-[11px] text-ink-subtle">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="size-3" aria-hidden />
          Data konsumsi listrik &amp; privasi kamar terenkripsi 256-bit
        </span>
        <span className="flex items-center gap-3 underline">
          <Link href="#">Bantuan</Link>
          <Link href="#">Kebijakan Privasi</Link>
        </span>
      </div>
    </div>
  );
}
