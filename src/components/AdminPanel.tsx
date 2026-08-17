"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { splitTime12h } from "@/lib/shopHours";

type AdminStatus = {
  mode: string;
  label: string;
  todayHours: string;
  message: string;
};

type SaveResponse = {
  ok?: boolean;
  error?: string;
  storageReady?: boolean;
  status?: AdminStatus;
  updatedAt?: string;
};

const HOURS = Array.from({ length: 12 }, (_, index) => String(index + 1));
const MINUTES = ["00", "15", "30", "45"];

async function readApiJson(response: Response): Promise<SaveResponse> {
  try {
    return (await response.json()) as SaveResponse;
  } catch {
    return {};
  }
}

export function AdminPanel() {
  const [password, setPassword] = useState("");
  const [rememberLogin, setRememberLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [sellingToday, setSellingToday] = useState(true);
  const [openHour, setOpenHour] = useState("10");
  const [openMinute, setOpenMinute] = useState("00");
  const [openPeriod, setOpenPeriod] = useState<"AM" | "PM">("AM");
  const [closeHour, setCloseHour] = useState("8");
  const [closeMinute, setCloseMinute] = useState("00");
  const [closePeriod, setClosePeriod] = useState<"AM" | "PM">("PM");
  const [status, setStatus] = useState<AdminStatus | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [storageReady, setStorageReady] = useState(true);

  useEffect(() => {
    const savedPassword = sessionStorage.getItem("dds-admin-password");
    if (savedPassword) {
      setPassword(savedPassword);
      setLoggedIn(true);
    }

    void loadCurrentHours();
    void loadAdminInfo();
  }, []);

  async function loadAdminInfo() {
    try {
      const response = await fetch("/api/admin/hours", { cache: "no-store" });
      if (!response.ok) return;

      const data = await readApiJson(response);
      if (typeof data.storageReady === "boolean") {
        setStorageReady(data.storageReady);
      }
    } catch {
      // Ignore — save will show a clearer error if needed.
    }
  }

  async function loadCurrentHours() {
    try {
      const response = await fetch("/api/hours", { cache: "no-store" });
      if (!response.ok) return;

      const data = await response.json();
      setSellingToday(Boolean(data.sellingToday));
      setUpdatedAt(data.updatedAt ?? null);

      const open = splitTime12h(data.openTime ?? "10:00 AM");
      setOpenHour(open.hour);
      setOpenMinute(open.minute);
      setOpenPeriod(open.period);

      const close = splitTime12h(data.closeTime ?? "8:00 PM");
      setCloseHour(close.hour);
      setCloseMinute(close.minute);
      setClosePeriod(close.period);

      if (data.status) {
        setStatus(data.status);
      }
    } catch {
      setError("Could not load current hours.");
    }
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const response = await fetch("/api/admin/hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          sellingToday,
          openHour,
          openMinute,
          openPeriod,
          closeHour,
          closeMinute,
          closePeriod,
        }),
      });

      const data = await readApiJson(response);

      if (!response.ok) {
        setError(data.error ?? `Save failed (${response.status}).`);
        return;
      }

      if (rememberLogin) {
        sessionStorage.setItem("dds-admin-password", password);
      }

      setLoggedIn(true);
      setStatus(data.status ?? null);
      setUpdatedAt(data.updatedAt ?? null);
      setMessage("Saved. Your website is updated.");
    } catch {
      setError("Network error. Check internet and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      const response = await fetch("/api/admin/hours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          sellingToday,
          openHour,
          openMinute,
          openPeriod,
          closeHour,
          closeMinute,
          closePeriod,
        }),
      });

      const data = await readApiJson(response);

      if (!response.ok) {
        setError(data.error ?? `Could not save (${response.status}).`);
        if (response.status === 401) setLoggedIn(false);
        return;
      }

      setStatus(data.status ?? null);
      setUpdatedAt(data.updatedAt ?? null);
      setMessage("Saved. Your website is updated.");
    } catch {
      setError("Network error. Check internet and try again.");
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("dds-admin-password");
    setLoggedIn(false);
    setPassword("");
    setMessage("");
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:py-14">
      <div className="mb-8">
        <p className="text-sm font-semibold text-brand-flame">DD&apos;s owner panel</p>
        <h1 className="mt-2 text-3xl font-bold text-brand-black">Today&apos;s shop hours</h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Change open and close times here. The main website updates automatically.
          Use Philippine time (Pampanga).
        </p>
      </div>

      {!storageReady && (
        <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-4 text-sm text-amber-950">
          <p className="font-semibold">Setup needed on Vercel (one time)</p>
          <p className="mt-2 leading-relaxed">
            Saving does not work yet because Redis storage is not connected.
            In Vercel: open your project → Storage → Add Redis (Upstash) →
            Connect → Redeploy. Then save will work on{" "}
            <strong>ddsfood.vercel.app/admin</strong>.
          </p>
        </div>
      )}

      {status && (
        <div className="mb-6 rounded-2xl border border-stone-200 bg-brand-muted px-4 py-4">
          <p className="text-sm font-semibold text-stone-500">Website shows now</p>
          <p className="mt-1 text-lg font-bold text-brand-black">{status.label}</p>
          <p className="mt-1 text-base text-stone-700">{status.todayHours}</p>
          <p className="mt-2 text-sm text-stone-600">{status.message}</p>
          {updatedAt && (
            <p className="mt-2 text-xs text-stone-500">
              Last saved: {new Date(updatedAt).toLocaleString("en-PH", { timeZone: "Asia/Manila" })}
            </p>
          )}
        </div>
      )}

      <form
        onSubmit={loggedIn ? handleSave : handleLogin}
        className="space-y-5 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
      >
        {!loggedIn && (
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-brand-black">
              Owner password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-base outline-none ring-brand-flame focus:ring-2"
              placeholder="Enter password"
              required
            />
            <label className="mt-3 flex items-center gap-2 text-sm text-stone-600">
              <input
                type="checkbox"
                checked={rememberLogin}
                onChange={(event) => setRememberLogin(event.target.checked)}
              />
              Remember on this phone until browser closes
            </label>
          </div>
        )}

        <fieldset>
          <legend className="text-sm font-semibold text-brand-black">
            Selling today?
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSellingToday(true)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                sellingToday
                  ? "border-green-600 bg-green-50 text-green-800"
                  : "border-stone-200 bg-white text-stone-600"
              }`}
            >
              Yes, open today
            </button>
            <button
              type="button"
              onClick={() => setSellingToday(false)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                !sellingToday
                  ? "border-red-600 bg-red-50 text-red-800"
                  : "border-stone-200 bg-white text-stone-600"
              }`}
            >
              No, closed today
            </button>
          </div>
        </fieldset>

        {sellingToday && (
          <>
            <TimePicker
              label="Open time"
              hour={openHour}
              minute={openMinute}
              period={openPeriod}
              onHourChange={setOpenHour}
              onMinuteChange={setOpenMinute}
              onPeriodChange={setOpenPeriod}
            />
            <TimePicker
              label="Close time"
              hour={closeHour}
              minute={closeMinute}
              period={closePeriod}
              onHourChange={setCloseHour}
              onMinuteChange={setCloseMinute}
              onPeriodChange={setClosePeriod}
            />
          </>
        )}

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>
        )}
        {message && (
          <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">{message}</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-full bg-brand-flame px-6 py-3.5 text-base font-bold text-white transition hover:bg-brand-flame-light disabled:opacity-60"
        >
          {saving ? "Saving..." : loggedIn ? "Save changes" : "Login and save"}
        </button>

        {loggedIn && (
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-sm font-medium text-stone-500 underline"
          >
            Log out on this device
          </button>
        )}
      </form>

      <div className="mt-8 space-y-2 text-sm text-stone-600">
        <p>
          <strong>Closed all day:</strong> choose &quot;No, closed today&quot; and save.
        </p>
        <p>
          <strong>Different hours:</strong> change open/close time and save once in the morning.
        </p>
        <Link href="/" className="inline-block font-semibold text-brand-flame hover:underline">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}

function TimePicker({
  label,
  hour,
  minute,
  period,
  onHourChange,
  onMinuteChange,
  onPeriodChange,
}: {
  label: string;
  hour: string;
  minute: string;
  period: "AM" | "PM";
  onHourChange: (value: string) => void;
  onMinuteChange: (value: string) => void;
  onPeriodChange: (value: "AM" | "PM") => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-brand-black">{label}</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        <select
          value={hour}
          onChange={(event) => onHourChange(event.target.value)}
          className="rounded-xl border border-stone-300 px-3 py-3 text-base outline-none ring-brand-flame focus:ring-2"
          aria-label={`${label} hour`}
        >
          {HOURS.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <select
          value={minute}
          onChange={(event) => onMinuteChange(event.target.value)}
          className="rounded-xl border border-stone-300 px-3 py-3 text-base outline-none ring-brand-flame focus:ring-2"
          aria-label={`${label} minute`}
        >
          {MINUTES.map((value) => (
            <option key={value} value={value}>
              :{value}
            </option>
          ))}
        </select>
        <select
          value={period}
          onChange={(event) => onPeriodChange(event.target.value as "AM" | "PM")}
          className="rounded-xl border border-stone-300 px-3 py-3 text-base outline-none ring-brand-flame focus:ring-2"
          aria-label={`${label} AM or PM`}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
}
