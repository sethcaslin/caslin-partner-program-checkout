export function CardBrands() {
  return (
    <div
      role="img"
      aria-label="Accepted cards: Visa, Mastercard, American Express, Discover"
      className="flex items-center gap-1.5"
    >
      <svg viewBox="0 0 40 26" className="h-[22px] w-auto" aria-hidden="true">
        <rect width="40" height="26" rx="4" fill="#ffffff" stroke="#E2E8F0" />
        <text
          x="20"
          y="18"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="11"
          fontStyle="italic"
          fontWeight="700"
          fill="#1434CB"
        >
          VISA
        </text>
      </svg>
      <svg viewBox="0 0 40 26" className="h-[22px] w-auto" aria-hidden="true">
        <rect width="40" height="26" rx="4" fill="#ffffff" stroke="#E2E8F0" />
        <circle cx="17" cy="13" r="7" fill="#EB001B" />
        <circle cx="24" cy="13" r="7" fill="#F79E1B" fillOpacity="0.85" />
      </svg>
      <svg viewBox="0 0 40 26" className="h-[22px] w-auto" aria-hidden="true">
        <rect width="40" height="26" rx="4" fill="#1F72CD" />
        <text
          x="20"
          y="17"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#ffffff"
        >
          AMEX
        </text>
      </svg>
      <svg viewBox="0 0 40 26" className="h-[22px] w-auto" aria-hidden="true">
        <rect width="40" height="26" rx="4" fill="#ffffff" stroke="#E2E8F0" />
        <circle cx="31" cy="9" r="3.4" fill="#F58220" />
        <text
          x="19"
          y="17"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="6.5"
          fontWeight="700"
          letterSpacing="-0.2"
          fill="#101522"
        >
          DISCOVER
        </text>
      </svg>
    </div>
  )
}
