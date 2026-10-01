// The example quote, laid out as a boarding pass: brief to launch, with the
// price redacted because it only exists once a real brief has been read.
export function BoardingPass() {
  return (
    <article className="pass" aria-label="Example quote for a booking portal, laid out as a boarding pass">
      <div className="main">
        <div className="hd">
          <b>RUNWAY<i>14</i></b>
          <span>Quote &middot; Example</span>
        </div>
        <div className="route">
          <div>
            <small>From</small>
            <strong>Brief</strong>
          </div>
          <svg width="44" height="14" viewBox="0 0 44 14" aria-hidden="true">
            <path d="M0 7h36" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M34 2l8 5-8 5z" fill="currentColor" />
          </svg>
          <div className="to">
            <small>To</small>
            <strong>Launch</strong>
          </div>
        </div>
        <div className="fields">
          <div><small>Design</small><span>Week 2</span></div>
          <div><small>Staging</small><span>Week 4</span></div>
          <div><small>Live</small><span>Week 6</span></div>
        </div>
        <div className="fields one">
          <div><small>Includes</small><span>Booking flow, payments, admin view</span></div>
        </div>
      </div>
      <div className="stub">
        <div>
          <small>Price</small>
          <span className="redact" role="img" aria-label="Shown on your real quote" />
        </div>
        <div className="pass-fixed">Fixed price</div>
        <div className="barcode" aria-hidden="true" />
      </div>
    </article>
  );
}
