import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PP_SUPPORT_EMAIL, formatMb, linkableFile } from "@/lib/printerpilot";
import { PP_AVAILABILITY } from "@/lib/printerpilot-availability";
import data from "@/content/printerpilot/components.json";

export const metadata: Metadata = {
  title: "PrinterPilot source and licences",
  description:
    "The open-source components inside PrinterPilot's design tools, the licence each declares, and where to get their source.",
  alternates: { canonical: "/printerpilot/source" },
};

const OCCT_SOURCE = "https://github.com/Open-Cascade-SAS/OCCT/releases/tag/V8_0_1";
const LICENCE_BASE = "/printerpilot/licences";

function NotAvailable({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[18px] border border-border bg-surface p-5 text-text/80 leading-relaxed">
      <p className="text-sm font-semibold uppercase tracking-wide text-muted mb-1">Not available yet</p>
      {children}
    </div>
  );
}

type Pkg = (typeof data.python)[number];

function licenceCell(p: Pkg) {
  if (p.licenceFiles.length === 0) {
    return <span className="text-text/70">No licence file shipped with the package</span>;
  }
  return (
    <ul className="space-y-1">
      {p.licenceFiles.map((f) => (
        <li key={f}>
          <a className="text-mark hover:underline break-all" href={`${LICENCE_BASE}/${f}`}>
            {f.split("/").slice(1).join("/")}
          </a>
        </li>
      ))}
    </ul>
  );
}

function sourceCell(p: Pkg) {
  if (!p.sdist) {
    return (
      <span className="text-text/70">
        No source distribution is published on PyPI for this version (wheel only).{" "}
        <a className="text-mark hover:underline" href={p.pypiPage}>PyPI page</a>
      </span>
    );
  }
  return (
    <span>
      <a className="text-mark hover:underline break-all" href={p.sdist.url}>{p.sdist.filename}</a>
      <span className="block text-xs text-muted font-mono" title={p.sdist.sha256}>
        SHA-256 {p.sdist.sha256.slice(0, 16)}...
      </span>
    </span>
  );
}

export default function PrinterPilotSourcePage() {
  const a = PP_AVAILABILITY;
  const archive = linkableFile(a.designToolsSource);
  const noFile = data.python.filter((p) => p.licenceFiles.length === 0);
  const undeclared = data.python.filter((p) => !p.declaredLicence);
  const noSdist = data.python.filter((p) => !p.sdist);
  const tk = data.native.filter((n) => n.library.startsWith("libTK"));
  const otherNative = data.native.filter((n) => !n.library.startsWith("libTK"));
  const flagged = Array.from(new Set(data.native.filter((n) => n.flagged).map((n) => n.library)));
  const names = (xs: Pkg[]) => xs.map((x) => `${x.name} ${x.version}`).join(", ") || "none";

  return (
    <>
      <Nav />
      <main className="bg-bg">
        <article className="mx-auto max-w-5xl px-6 pt-12 pb-24 sm:pt-16 sm:pb-32">
          <header className="mb-10">
            <p className="text-sm font-medium text-mark uppercase tracking-wider mb-4">Source and licences</p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">Source and licences</h1>
          </header>
      <div className="max-w-3xl text-text/80 leading-relaxed space-y-4">
        <p>
          PrinterPilot&rsquo;s design tools include Open CASCADE Technology (OCCT) 8.0.1, a geometry engine published under
          the GNU Lesser General Public License 2.1 with the Open CASCADE exception, and {data.python.length} Python packages
          with their own licences. This page lists each one, the licence it declares, the licence text we hold, and where its
          source can be had. If you have the design tools, you may obtain the source of the libraries covered by these
          licences and replace them with your own build.
        </p>
        <p className="text-sm text-text/70">
          This page is a record of what is in the design tools. It is not a legal opinion, and a legal review of it has not
          yet been done.
        </p>
      </div>

      <section className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Source archive</h2>
        {archive ? (
          <div className="rounded-[18px] border border-border bg-surface p-5">
            <a className="text-mark font-semibold hover:underline" href={archive.url} download>
              Download the source archive, version {archive.version} ({formatMb(archive.sizeBytes)})
            </a>
            <p className="mt-3 text-xs text-muted break-all">
              SHA-256: <span className="font-mono">{archive.sha256}</span>
            </p>
          </div>
        ) : (
          <NotAvailable>
            <p>
              The source archive for the design tools has not been uploaded yet, and neither has the design tools pack
              itself. Until it is, the links below go to each project&rsquo;s own upstream source, not to a copy held by
              us. To ask for the source directly, write to{" "}
              <a className="text-mark hover:underline" href={`mailto:${PP_SUPPORT_EMAIL}`}>{PP_SUPPORT_EMAIL}</a>.
            </p>
          </NotAvailable>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Open CASCADE Technology 8.0.1</h2>
        <div className="max-w-3xl space-y-3 text-text/80 leading-relaxed">
          <p>
            Licence: LGPL-2.1 with the Open CASCADE exception. Texts:{" "}
            <a className="text-mark hover:underline" href={`${LICENCE_BASE}/OCCT/LICENSE_LGPL_21.txt`}>LGPL-2.1</a>,{" "}
            <a className="text-mark hover:underline" href={`${LICENCE_BASE}/OCCT/OCCT_LGPL_EXCEPTION.txt`}>Open CASCADE exception</a>.
          </p>
          <p>
            Source we built from: the upstream tag{" "}
            <a className="text-mark hover:underline" href={OCCT_SOURCE}>V8_0_1</a>. It is wrapped for Python by{" "}
            <a className="text-mark hover:underline" href="https://github.com/CadQuery/OCP">cadquery-ocp</a>, whose
            bundled build system is at{" "}
            <a className="text-mark hover:underline" href="https://github.com/CadQuery/ocp-build-system">ocp-build-system</a>.
            The wrapper wheel we use is identified exactly by the hashes pinned in PrinterPilot&rsquo;s own requirements
            lock.
          </p>
          <p>
            The OCCT libraries are separate files ({tk.length} <code className="font-mono">libTK*.dylib</code> files under{" "}
            <code className="font-mono">OCP/.dylibs/</code>), not compiled into PrinterPilot&rsquo;s program, and they sit
            outside any signed application bundle.
          </p>
          <p>
            <strong className="font-semibold">To replace them:</strong> put a compatible build in the same folder inside
            the design tools and re-sign it ad hoc (<code className="font-mono">codesign --force --sign - &lt;file&gt;</code>),
            which Apple-silicon Macs require of any changed program file.
          </p>
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">What we have not been able to establish</h2>
        <ul className="list-disc pl-6 space-y-3 text-text/85 leading-relaxed">
          <li>
            The OCCT wrapper wheel ships <strong className="font-semibold">no OCCT licence text</strong>. Its metadata says
            Apache-2.0, which covers the wrapper only. The OCCT texts above were copied from the upstream OCCT 8.0.1 source
            tree.
          </li>
          <li>
            <strong className="font-semibold">{flagged.join(" and ") || "None flagged"}</strong>: the upstream projects
            publish under a choice of licences, including copyleft ones, and the wheel does not say which applies to the copy
            it contains. This has not been checked.
          </li>
          <li>
            For the other native libraries, the licence column in the table below is what the upstream project is generally
            published under. <strong className="font-semibold">It was not verified against the copies built into these
            wheels</strong>, which ship no licence text for most of them.
          </li>
          <li>
            Packages shipping no licence file: {names(noFile)}. Packages declaring no licence in their metadata: {names(undeclared)}.
          </li>
          <li>
            Packages with no published source distribution on PyPI, so no source link below: {names(noSdist)}.
          </li>
          <li>
            <code className="font-mono">certifi</code> is MPL-2.0, a file-level copyleft licence.{" "}
            <code className="font-mono">threejs-materials</code> is a large set of assets whose licence has not been read.
          </li>
          <li>
            This list was read from the exact hash-pinned packages the design tools will be built from, not from a finished
            design tools pack, because none has been built yet.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Native libraries bundled in the wheels</h2>
        <p className="mb-4 max-w-3xl text-sm text-text/70">
          The right-hand column is the licence the upstream project is generally published under. It is a pointer, not a
          finding about these builds.
        </p>
        <div className="overflow-x-auto rounded-[18px] border border-border bg-surface">
          <table className="w-full text-sm text-left">
            <thead className="text-muted">
              <tr>
                <th className="p-3 font-medium">Package</th>
                <th className="p-3 font-medium">Library</th>
                <th className="p-3 font-medium">Upstream&rsquo;s usual licence (unchecked)</th>
              </tr>
            </thead>
            <tbody>
              {tk.length > 0 && (
                <tr className="border-t border-border align-top">
                  <td className="p-3">{tk[0].package}</td>
                  <td className="p-3 font-mono">libTK*.dylib ({tk.length} files)</td>
                  <td className="p-3">{tk[0].upstreamUsual}</td>
                </tr>
              )}
              {otherNative.map((n) => (
                <tr key={`${n.package}/${n.library}`} className="border-t border-border align-top">
                  <td className="p-3">{n.package}</td>
                  <td className="p-3 font-mono break-all">{n.library}</td>
                  <td className="p-3">{n.upstreamUsual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Python packages ({data.python.length})</h2>
        <div className="overflow-x-auto rounded-[18px] border border-border bg-surface">
          <table className="w-full text-sm text-left">
            <thead className="text-muted">
              <tr>
                <th className="p-3 font-medium">Package</th>
                <th className="p-3 font-medium">Version</th>
                <th className="p-3 font-medium">Licence it declares</th>
                <th className="p-3 font-medium">Licence text</th>
                <th className="p-3 font-medium">Source</th>
              </tr>
            </thead>
            <tbody>
              {data.python.map((p) => (
                <tr key={`${p.name}-${p.version}`} className="border-t border-border align-top">
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3 font-mono">{p.version}</td>
                  <td className="p-3">{p.declaredLicence ?? <span className="text-text/70">Not declared</span>}</td>
                  <td className="p-3">{licenceCell(p)}</td>
                  <td className="p-3">{sourceCell(p)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
