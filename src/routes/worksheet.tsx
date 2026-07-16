import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { checkAdminAuth, loginAdmin, logoutAdmin } from "@/lib/admin-auth";
import { WORKSHEET_SERVICES } from "@/lib/worksheet-services";
import { generateWorksheetPdf, lineItemAmount, worksheetTotal, type WorksheetLineItem } from "@/lib/worksheet-pdf";
import logoUrl from "@/assets/cnicole-logo.png";

export const Route = createFileRoute("/worksheet")({
  head: () => ({
    meta: [
      { title: "Worksheet" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  loader: async () => {
    const { authenticated } = await checkAdminAuth();
    return { authenticated };
  },
  component: WorksheetRoute,
});

function WorksheetRoute() {
  const { authenticated } = Route.useLoaderData();
  const router = useRouter();
  const [authed, setAuthed] = useState(authenticated);

  if (!authed) {
    return (
      <LoginGate
        onSuccess={() => {
          setAuthed(true);
          router.invalidate();
        }}
      />
    );
  }

  return (
    <WorksheetForm
      onLogout={async () => {
        await logoutAdmin();
        setAuthed(false);
        router.invalidate();
      }}
    />
  );
}

function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const result = await loginAdmin({ data: { password } });
      if (result.success) {
        onSuccess();
      } else {
        setError("Incorrect password.");
      }
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-neutral-100 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-8 rounded-lg border border-neutral-200 shadow-sm">
        <h1 className="text-lg font-semibold text-neutral-900">Private Worksheet</h1>
        <p className="mt-1 text-sm text-neutral-500">Enter the password to continue.</p>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mt-5 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting || !password}
          className="mt-4 w-full rounded-md bg-neutral-900 text-white py-2.5 text-sm font-medium disabled:opacity-50"
        >
          {submitting ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}

function WorksheetForm({ onLogout }: { onLogout: () => void }) {
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [generating, setGenerating] = useState(false);
  const [lineItems, setLineItems] = useState<WorksheetLineItem[]>(() =>
    WORKSHEET_SERVICES.map((service) => ({ service, checked: false, quantity: 1 })),
  );

  useEffect(() => {
    setDate(new Date().toISOString().slice(0, 10));
  }, []);

  const toggleChecked = (id: string) => {
    setLineItems((items) => items.map((li) => (li.service.id === id ? { ...li, checked: !li.checked } : li)));
  };

  const setQuantity = (id: string, value: string) => {
    const num = value === "" ? 0 : Number(value);
    setLineItems((items) =>
      items.map((li) => (li.service.id === id ? { ...li, quantity: Number.isNaN(num) ? 0 : num } : li)),
    );
  };

  const total = worksheetTotal(lineItems);

  const onGeneratePdf = async () => {
    setGenerating(true);
    try {
      await generateWorksheetPdf({ clientName, date, lineItems, notes, logoUrl });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 px-4 py-8">
      <div className="mx-auto max-w-2xl bg-white rounded-lg border border-neutral-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-neutral-900">Client Service Worksheet</h1>
            <p className="mt-1 text-sm text-neutral-500">Internal use only — not part of the public site.</p>
          </div>
          <button onClick={onLogout} className="text-xs text-neutral-500 underline shrink-0 pt-1">
            Log out
          </button>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1">Client Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-semibold text-neutral-900">Services Provided</h2>
          <div className="mt-3 space-y-3">
            {lineItems.map((li) => (
              <div
                key={li.service.id}
                className={`rounded-md border p-3 ${li.checked ? "border-neutral-900" : "border-neutral-200"}`}
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={li.checked}
                    onChange={() => toggleChecked(li.service.id)}
                    className="mt-0.5"
                  />
                  <span className="flex-1 text-sm text-neutral-900">
                    {li.service.label}
                    {li.service.note && <span className="text-neutral-500"> — {li.service.note}</span>}
                    <span className="block text-xs text-neutral-500">
                      {li.service.unit === "hr" ? `$${li.service.rate}/hr` : `$${li.service.rate}`}
                    </span>
                  </span>
                </label>

                {li.checked && (
                  <div className="mt-3 ml-7 flex items-center gap-3">
                    <label className="text-xs text-neutral-600">
                      {li.service.unit === "hr" ? "Hours" : "Qty"}
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={li.service.unit === "hr" ? 0.25 : 1}
                      value={li.quantity}
                      onChange={(e) => setQuantity(li.service.id, e.target.value)}
                      className="w-20 rounded-md border border-neutral-300 px-2 py-1 text-sm outline-none focus:border-neutral-900"
                    />
                    <span className="text-sm text-neutral-700 ml-auto">${lineItemAmount(li).toFixed(2)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-4">
          <span className="text-sm font-medium text-neutral-600">Total</span>
          <span className="text-lg font-semibold text-neutral-900">${total.toFixed(2)}</span>
        </div>

        <div className="mt-6">
          <label className="block text-xs font-medium text-neutral-600 mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
          />
        </div>

        <button
          onClick={onGeneratePdf}
          disabled={generating}
          className="mt-8 w-full rounded-md bg-neutral-900 text-white py-3 text-sm font-medium disabled:opacity-50"
        >
          {generating ? "Generating…" : "Generate PDF"}
        </button>
      </div>
    </div>
  );
}
