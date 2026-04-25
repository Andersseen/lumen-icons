export const ANIMATE_STYLES = `
  @keyframes lmn-spin { to { transform: rotate(360deg); } }
  @keyframes lmn-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .25; } }
  @keyframes lmn-bounce {
    0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
    50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
  }
  @keyframes lmn-ping { 75%, 100% { transform: scale(2); opacity: 0; } }
  :host([data-animate="spin"])   { animation: lmn-spin   1s linear           infinite; }
  :host([data-animate="pulse"])  { animation: lmn-pulse  2s ease-in-out      infinite; }
  :host([data-animate="bounce"]) { animation: lmn-bounce 1s                  infinite; }
  :host([data-animate="ping"])   { animation: lmn-ping   1s cubic-bezier(0,0,0.2,1) infinite; }
`;
