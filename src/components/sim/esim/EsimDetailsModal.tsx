"use client";

type EsimDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  metadata: any | null;
};

export function EsimDetailsModal({ open, onClose, metadata }: EsimDetailsModalProps) {
  if (!open) return null;

  const fmt = (d: string | null) =>
    d ? new Date(d).toLocaleString() : "—";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-neutral-900 text-white p-6 rounded-2xl w-full max-w-lg shadow-xl border border-neutral-700 overflow-y-auto max-h-[90vh]">

        <h2 className="text-lg font-bold mb-4">eSIM Details</h2>

        {!metadata && (
          <p className="text-sm opacity-70">No metadata available.</p>
        )}

        {metadata && (
          <div className="flex flex-col gap-4 text-sm">

            {/* STATUS */}
            <div>
              <p><strong>Status:</strong> {metadata.status}</p>
              <p><strong>Expired:</strong> {metadata.expired ? "Yes" : "No"}</p>
            </div>

            {/* DATES */}
            <div>
              <p><strong>Activated:</strong> {fmt(metadata.activated_at)}</p>
              <p><strong>Expires:</strong> {fmt(metadata.expires_at)}</p>
              <p><strong>Install by:</strong> {fmt(metadata.install_by)}</p>
            </div>

            {/* PLAN */}
            <div>
              <p><strong>Plan:</strong> {metadata.plan?.name}</p>
              <p><strong>Data:</strong> {metadata.plan?.data_mb} MB</p>
              <p><strong>Validity:</strong> {metadata.plan?.validity_days} days</p>
            </div>

            {/* NETWORKS */}
            <div>
              <p><strong>Networks:</strong></p>
              <p className="opacity-80">{metadata.available_networks?.join(", ") || "—"}</p>
            </div>

            {/* USAGE */}
            <div>
              <p><strong>Usage:</strong></p>
              <ul className="ml-4 opacity-80">
                <li>Used: {metadata.usage?.data_used_mb ?? 0} MB</li>
                <li>Allowed: {metadata.usage?.data_allowed_mb ?? 0} MB</li>
                <li>Remaining: {metadata.usage?.data_remaining_mb ?? 0} MB</li>
              </ul>
            </div>

            {/* COVERAGE */}
            <div>
              <p><strong>Coverage:</strong></p>
              <ul className="ml-4 opacity-80">
                {metadata.coverage?.map((c: any, i: number) => (
                  <li key={i}>{c.country_name}: {c.networks.join(", ")}</li>
                )) || <li>—</li>}
              </ul>
            </div>

            {/* EVENTS */}
            <div>
              <p><strong>Events:</strong></p>
              <ul className="ml-4 opacity-80">
                {metadata.events?.map((ev: any, i: number) => (
                  <li key={i}>{ev.status} — {fmt(ev.occurred_at)}</li>
                )) || <li>—</li>}
              </ul>
            </div>

            {/* LOCATIONS */}
            <div>
              <p><strong>Locations:</strong></p>
              <ul className="ml-4 opacity-80">
                {metadata.locations?.map((loc: any, i: number) => (
                  <li key={i}>{loc.country} — {loc.network}</li>
                )) || <li>—</li>}
              </ul>
            </div>

            {/* DEVICE */}
            <div>
              <p><strong>Device:</strong></p>
              {metadata.device ? (
                <ul className="ml-4 opacity-80">
                  <li>EID: {metadata.device.eid}</li>
                  <li>Manufacturer: {metadata.device.euicc_manufacturer}</li>
                  <li>Hint: {metadata.device.device_hint}</li>
                  <li>Model: {metadata.device.device_model}</li>
                  <li>Note: {metadata.device.note}</li>
                </ul>
              ) : (
                <p className="opacity-70 ml-4">No device info</p>
              )}
            </div>

            {/* ACTIVATION INFO */}
            <div>
              <p><strong>Activation Code:</strong> {metadata.activation_code || "—"}</p>
              
            </div>

          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
