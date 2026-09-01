"use client";

import { useEffect, useState, useRef } from "react";
import BundlesModal from "@/components/modals/BundlesModal";
import { PreferredCurrencyModal } from "@/components/wallet/PreferredCurrencyModal";

import { WalletData } from "@/types/wallet";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://redatacom-end.onrender.com";

  function normalizeBundle(b: any, countries: any[]) {
  // Normalize countries
  const normalizedCountries = (b.countries || []).map((c: any) => {
    const iso = c?.country?.iso || c?.iso || "";
    const name = c?.country?.name || c?.name || "";
    const flag = countries.find(
      (cc) => cc.iso?.toUpperCase() === iso?.toUpperCase()
    )?.flag;

    return { iso: iso.toUpperCase(), name, flag };
  });

  // Normalize roamingEnabled
  const normalizedRoaming = (b.roamingEnabled || []).map((c: any) => {
    const iso = c?.country?.iso || c?.iso || "";
    const name = c?.country?.name || c?.name || "";
    const flag = countries.find(
      (cc) => cc.iso?.toUpperCase() === iso?.toUpperCase()
    )?.flag;

    return { iso: iso.toUpperCase(), name, flag };
  });

  // Normalize countryNetworks
  const normalizedNetworks = (b.countryNetworks || []).map((n: any) => {
    const iso = n.country?.iso || "";
    const name = n.country?.name || "";
    const flag = countries.find(
      (cc) => cc.iso?.toUpperCase() === iso?.toUpperCase()
    )?.flag;

    return {
      iso: iso.toUpperCase(),
      name,
      flag,
      networks: n.networks || [],
    };
  });

  return {
    ...b,
    countries: normalizedCountries,
    roamingEnabled: normalizedRoaming,
    countryNetworks: normalizedNetworks,
  };
}


type Group = {
  name: string;
  icon?: string;
  desc?: string;
  priceListUrl?: string;
};

type Country = {
  name: string;
  iso2: string;
  iso?: string;
  flag: string;
  dialCode?: string;
};

type Bundle = any;

type EsimShopProps = {
  cardholderName: string;
  wallet: WalletData;
};

export default function EsimShop({ cardholderName, wallet }: EsimShopProps) {
  /* ---------------------------------------------------
     STATE
  --------------------------------------------------- */
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupsLoading, setGroupsLoading] = useState(true);

  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const [groupBundles, setGroupBundles] = useState<Bundle[]>([]);
  const [groupCount, setGroupCount] = useState<number>(0);
  const [bundlesLoading, setBundlesLoading] = useState(false);

  const [showBundlesModal, setShowBundlesModal] = useState(false);

  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true);

  const [preferredCurrency, setPreferredCurrency] = useState(
    wallet?.preferred_currency ?? "USD"
  );
  const [fxMidRate, setFxMidRate] = useState(wallet?.fx_mid_rate ?? 1);

  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* ---------------------------------------------------
     PARTICLE BACKGROUND (same as LocalSimCard)
  --------------------------------------------------- */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let particles: any[] = [];
    const count = 45;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.25,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  /* ---------------------------------------------------
     LOAD GROUPS
  --------------------------------------------------- */
  useEffect(() => {
    async function loadGroups() {
      try {
        const res = await fetch(`${API_BASE}/api/esim/groups`);
        const json = await res.json();
        setGroups(json.groups || []);
      } catch (err) {
        console.error("Failed to load groups", err);
      } finally {
        setGroupsLoading(false);
      }
    }
    loadGroups();
  }, []);

  /* ---------------------------------------------------
     LOAD COUNTRIES
  --------------------------------------------------- */
  useEffect(() => {
    async function loadCountries() {
      try {
        const res = await fetch(`${API_BASE}/api/countries`);
        const json = await res.json();

        const normalized = (json.countries || []).map((c: any) => ({
          name: c.name,
          iso2: c.iso2 || c.iso || c.code,
          iso: c.iso || c.iso2 || c.code,
          flag: c.flag,
          dialCode: c.dialCode || "",
        }));

        setCountries(normalized);
      } catch (err) {
        console.error("Failed to load countries", err);
      } finally {
        setCountriesLoading(false);
      }
    }

    loadCountries();
  }, []);

  /* ---------------------------------------------------
     LOAD BUNDLES FOR GROUP
  --------------------------------------------------- */
  async function loadGroupBundles(groupName: string) {
  try {
    setBundlesLoading(true);

    const res = await fetch(
      `${API_BASE}/api/esim/groups/${encodeURIComponent(groupName)}/bundles`
    );

    const json = await res.json();

    // Normalize all bundles
    const normalized = (json.bundles || []).map((b: any) =>
      normalizeBundle(b, countries)
    );

    setGroupBundles(normalized);
    setGroupCount(normalized.length);
  } catch (err) {
    console.error("Failed to load group bundles", err);
    setGroupBundles([]);
    setGroupCount(0);
  } finally {
    setBundlesLoading(false);
  }
}




  return (
    <div className="flex flex-col gap-10">
      {/* HEADER */}
      <div className="relative w-full rounded-3xl p-6 shadow-2xl bg-gradient-to-br from-neutral-950 via-purple-900 to-purple-600 text-white border border-purple-500/40 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-25 mix-blend-overlay" />
        <div className="absolute inset-0 pointer-events-none shine-effect" />

        <div className="absolute top-6 left-6 text-xs tracking-[0.35em] uppercase opacity-60">
          REDATACOM ESIM
        </div>

        <div className="relative z-10 mt-10 flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-purple-200/80">
              Welcome
            </p>
            <p className="text-xl font-semibold">
              {" "}
              <span className="text-purple-200">{cardholderName}</span>
            </p>
            <p className="text-xs text-purple-100/80 max-w-md">
              6 Bundles | Unlimited Possibilities
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <img
              src="/sim-esim1.png"
              className="h-12 w-auto opacity-90 drop-shadow-lg"
            />
            

            {/* ⭐ Currency Button */}
            <button
              onClick={() => setShowCurrencyModal(true)}
              className="text-[10px] px-3 py-1 rounded-full bg-purple-600/40 border border-purple-200/40 hover:bg-purple-700/50 transition"
            >
              Currency: {preferredCurrency}
            </button>
          </div>
        </div>
      </div>

      {/* GROUP SELECTOR WITH PARTICLE BACKGROUND */}
      <div className="relative bg-white/90 rounded-2xl p-4 shadow-sm border border-neutral-200/70 backdrop-blur overflow-hidden">

        {/* ⭐ PARTICLE CANVAS */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-100 pointer-events-none"
        />

        <p className="relative z-10 text-xs font-semibold text-neutral-700">
          <img src="/selectbundleicon.png" className="w-auto h-10 opacity-100" />
        </p>
        <p className="relative z-10 text-[11px] text-neutral-500 mb-3">
          <img src="/selectbundleicon1.png" className="w-auto h-5 opacity-100" />
        </p>

        {groupsLoading ? (
          <p className="relative z-10 text-xs text-neutral-500">Loading groups...</p>
        ) : (
          <div className="relative z-10 grid grid-cols-2 gap-3">
            {groups.map((g) => (
             <button
  key={g.name}
  onClick={async () => {
    setSelectedGroup(g);
    await loadGroupBundles(g.name);
    setShowBundlesModal(true);
  }}
  className="relative group w-full h-70 rounded-3xl overflow-hidden shadow-xl border border-purple-500/40 bg-gradient-to-r from-purple-600 via-black to-black opacity-100 text-white transition-all hover:scale-[1.02]"
>
  {/* ⭐ REAL PARTICLE CANVAS */}
  <canvas
    ref={(el) => {
      if (!el) return;
      const canvas = el;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let particles: any[] = [];
      const count = 200;

      const resize = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };

      resize();

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.8 + 0.8,
          dx: (Math.random() - 0.5) * 0.25,
          dy: (Math.random() - 0.5) * 0.25,
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          p.x += p.dx;
          p.y += p.dy;

          if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.30)";
          ctx.fill();
        });

        requestAnimationFrame(animate);
      };

      animate();
    }}
    className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
  />

  {/* METAL TEXTURE */}
  <div className="absolute inset-0 bg-[url('/metal-texture.png')] opacity-30 mix-blend-overlay pointer-events-none" />

  {/* Magnetic Stripe */}
  <div className="absolute top-0 left-0 w-full h-6 overflow-hidden border-b border-white/10">
    <div className="absolute inset-0 bg-gradient-black opacity-80" />
    <canvas className="absolute inset-0 w-full h-full opacity-100" />

    <div className="absolute inset-0 flex items-center justify-between px-4">
      <img src="/chip-gold.png" className="h-20 opacity-80" alt="Redatacom Logo" />
    </div>
  </div>

  {/* Shine */}
  <div className="absolute inset-0 pointer-events-none shine-effect" />

  {/* Glow */}
  <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

  {/* CONTENT */}
  <div className="relative z-10 mt-16 px-6 flex flex-col gap-1 text-left">
    <span className="text-lg font-bold tracking-wide">{g.name}</span>

    {g.desc && (
      <span className="text-[11px] text-purple-200/80">{g.desc}</span>
    )}

    {g.icon && (
      <img
        src={g.icon}
        className="h-10 w-10 mt-2 rounded-md opacity-90 drop-shadow-lg"
        alt=""
      />
    )}
  </div>
</button>

            ))}
          </div>
        )}
      </div>

      {/* ⭐ BUNDLES MODAL */}
      {selectedGroup && (
        <BundlesModal
          open={showBundlesModal}
          onClose={() => setShowBundlesModal(false)}
          groupName={selectedGroup.name}
          bundles={groupBundles}
          loading={bundlesLoading}
          preferredCurrency={preferredCurrency}
          fxMidRate={fxMidRate}
          token={token}
          countries={countries}
          count={groupCount}
        />
      )}

      {/* ⭐ CURRENCY MODAL */}
      {showCurrencyModal && (
        <PreferredCurrencyModal
          onClose={() => setShowCurrencyModal(false)}
          onSelect={(currency, rate) => {
            setPreferredCurrency(currency);
            setFxMidRate(rate);
            setShowCurrencyModal(false);
          }}
        />
      )}
    </div>
  );
}
