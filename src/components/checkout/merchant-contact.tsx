export function MerchantSupport() {
  return (
    <div className="cpp-support">
      <p>
        Questions before you enroll? Email Ben at <a href="mailto:ben@gochrz.com">ben@gochrz.com</a> — we reply within one business day.
      </p>
      <p className="cpp-descriptor">
        Your card statement will show CASLINPARTNERPROGRAM.
      </p>
    </div>
  )
}

export function MerchantFooter() {
  return (
    <footer className="cpp-footer">
      <div className="cpp-footer-inner">
        <div className="cpp-cols">
          <div className="cpp-col">
            <h4>Contact and support</h4>
            <p>
              <a href="mailto:ben@gochrz.com">ben@gochrz.com</a>
              &nbsp;·&nbsp;
              <a href="mailto:seth@caslinpartnerprogram.com">
                seth@caslinpartnerprogram.com
              </a>
            </p>
            <p>
              <a href="tel:+19733567881">(973) 356-7881</a>
            </p>
            <p className="cpp-note">
              Enrollment, billing, onboarding and access — all handled here.
            </p>
          </div>
          <div className="cpp-col">
            <h4>Seller of record</h4>
            <p>Seth Caslin LLC</p>
            <p>30 N Gould St, Ste N</p>
            <p>Sheridan, WY 82801, United States</p>
          </div>
        </div>
        <div className="cpp-bottom">
          <a href="/terms">Purchase terms</a>
          <a href="/refund-policy">Refund policy</a>
          <a href="https://caslinpartnerprogram.com/privacy-policy">
            Privacy policy
          </a>
          <span className="cpp-processor">
            Payments securely processed by Stripe
          </span>
        </div>
      </div>
    </footer>
  )
}
