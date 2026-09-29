// A deliberately neutral hero object: an unbranded browser window holding a
// page skeleton. It says "we build sites and apps" without depicting any one
// client, product or theme, and the single orange block is the only colour.
export function BrowserWire() {
  return (
    <div className="wire" aria-hidden="true">
      <div className="wire-top">
        <i />
        <i />
        <i />
        <span />
      </div>
      <div className="wire-page">
        <div className="wire-nav">
          <b />
          <i />
          <i />
          <i />
        </div>
        <div className="wire-hero">
          <div className="l1" />
          <div className="l2" />
          <div className="l3" />
          <div className="l4" />
          <div className="cta" />
        </div>
        <div className="wire-cards">
          {[0, 1, 2].map((n) => (
            <div key={n}>
              <b />
              <i />
              <i />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
