export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');

.app {
  --ink: #202B3B;
  --ink-2: #2B3849;
  --paper: #F1EEE6;
  --surface: #FBFAF6;
  --brass: #AD7A3F;
  --brass-dark: #8F6431;
  --brass-bg: #F1E7D8;
  --plum: #6B2E3A;
  --sage: #55735C;
  --sage-bg: #E4EAE1;
  --rust: #B5502E;
  --rust-bg: #F3E3D8;
  --brick: #9C3B34;
  --brick-bg: #F5E1DE;
  --text: #241F1A;
  --text-muted: #6B655C;
  --border: #DAD4C7;
  --border-soft: #E7E2D6;
  display: flex;
  height: 100vh;
  height: 100dvh;
  width: 100%;
  overflow: hidden;
  background: var(--paper);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
}

.sidebar { width: 240px; flex-shrink: 0; background: var(--ink); color: #EDEAE2; display: flex; flex-direction: column; transition: width 0.2s ease, transform 0.25s ease; }
.brand__text { min-width: 0; }
.sidebar__close { display: none; margin-left: auto; background: transparent; border: none; color: #C7C2B6; cursor: pointer; padding: 6px; border-radius: 6px; }
.sidebar__close:hover { color: #fff; background: var(--ink-2); }
.sidebar-backdrop { display: none; }
.brand { display: flex; align-items: center; gap: 10px; padding: 22px 18px 18px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.brand__mark { width: 32px; height: 32px; border-radius: 8px; background: var(--brass); color: var(--ink); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.brand__name { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 600; font-style: italic; line-height: 1.1; }
.brand__tag { font-size: 11.5px; color: #A7A091; margin-top: 2px; }

.nav { display: flex; flex-direction: column; padding: 10px 10px; gap: 4px; flex: 1; overflow-y: auto; }
.nav__group { display: flex; flex-direction: column; gap: 2px; padding: 8px 0 4px; }
.nav__group-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: #8B8577; padding: 4px 12px 4px; }
.nav__item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 7px; color: #C7C2B6; background: transparent; border: none; border-left: 2px solid transparent; text-align: left; font-size: 13.5px; font-family: inherit; cursor: pointer; }
.nav__item:hover { background: var(--ink-2); color: #fff; }
.nav__item--active { background: var(--ink-2); color: #fff; border-left: 2px solid var(--brass); font-weight: 600; }

.sidebar__footer { display: flex; align-items: center; gap: 10px; padding: 14px 16px; padding-bottom: calc(14px + env(safe-area-inset-bottom)); border-top: 1px solid rgba(255,255,255,0.08); }
.sidebar__avatar { width: 30px; height: 30px; border-radius: 50%; background: var(--plum); color: #F5E9E9; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; flex-shrink: 0; }
.sidebar__who { flex: 1; min-width: 0; }
.sidebar__user { font-size: 12.5px; font-weight: 600; color: #EDEAE2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sidebar__role { font-size: 11px; color: #A7A091; }

.main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.topbar { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; padding: 20px 32px; border-bottom: 1px solid var(--border-soft); background: var(--surface); }
.topbar__left { display: flex; align-items: flex-start; gap: 12px; min-width: 0; }
.topbar__headings { min-width: 0; }
.topbar__toggle { flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 38px; margin-top: 1px; border-radius: 8px; border: 1px solid var(--border); background: var(--paper); color: var(--text); cursor: pointer; }
.topbar__toggle:hover { border-color: var(--brass); color: var(--brass-dark); }
.topbar__title { font-family: 'Fraunces', serif; font-size: 23px; font-weight: 600; margin: 0; line-height: 1.2; }
.topbar__sub { margin: 3px 0 0; color: var(--text-muted); font-size: 13px; }
.topbar__right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
.topbar__meta { color: var(--text-muted); font-size: 12.5px; }
.shift-indicator { display: inline-flex; align-items: center; gap: 6px; background: var(--sage-bg); color: var(--sage); padding: 4px 10px; border-radius: 20px; font-size: 11.5px; font-weight: 600; }

.main__content { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 26px 32px 40px; padding-bottom: calc(40px + env(safe-area-inset-bottom)); }
.view { display: flex; flex-direction: column; gap: 22px; }

.kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 14px; }
.kpi-grid--4 { grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); }
.kpi-card { background: var(--surface); border: 1px solid var(--border-soft); border-left: 3px solid var(--border); border-radius: 8px; padding: 16px 18px; }
.kpi-card--brass { border-left-color: var(--brass); }
.kpi-card--plum { border-left-color: var(--plum); }
.kpi-card--rust { border-left-color: var(--rust); }
.kpi-card--sage { border-left-color: var(--sage); }
.kpi-card__label { font-size: 12.5px; color: var(--text-muted); }
.kpi-card__value { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 600; margin-top: 6px; overflow-wrap: anywhere; }
.kpi-card__note { font-size: 11.5px; color: var(--text-muted); margin-top: 5px; }

.dash-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 16px; align-items: start; }

.panel { background: var(--surface); border: 1px solid var(--border-soft); border-radius: 8px; padding: 18px 20px; }
.panel__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.panel__head h2 { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 600; margin: 0 0 14px; display: flex; align-items: center; gap: 8px; }
.section-title { font-family: 'Fraunces', serif; font-size: 17px; font-weight: 600; margin: 0; display: flex; align-items: center; gap: 8px; }

.table-scroll { width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th { text-align: left; font-weight: 600; color: var(--text-muted); font-size: 11.5px; padding: 0 10px 8px; border-bottom: 1px solid var(--border-soft); }
.data-table td { padding: 10px; border-bottom: 1px solid var(--border-soft); vertical-align: middle; }
.data-table tr:last-child td { border-bottom: none; }
.data-table__strong td { font-weight: 700; font-family: 'Fraunces', serif; font-size: 15px; }
.ta-right { text-align: right; }
.ta-center { text-align: center; }
.table-product__name { font-weight: 600; }
.table-product__meta { color: var(--text-muted); font-size: 12px; margin-top: 2px; }
.link-cell { cursor: pointer; text-decoration: underline dotted; text-underline-offset: 3px; }

.pill { display: inline-flex; align-items: center; gap: 6px; padding: 3px 9px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.pill--sm { padding: 2px 8px; font-size: 11px; }
.pill__dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.pill--sage { background: var(--sage-bg); color: var(--sage); }
.pill--rust { background: var(--rust-bg); color: var(--rust); }
.pill--brick { background: var(--brick-bg); color: var(--brick); }
.pill--brass { background: var(--brass-bg); color: var(--brass-dark); }

.role-badge { display: inline-block; padding: 3px 10px; border-radius: 6px; background: var(--ink); color: #EDEAE2; font-size: 11.5px; font-weight: 600; }
.points-badge { display: inline-flex; align-items: center; gap: 4px; color: var(--brass-dark); font-weight: 600; }

.low-stock-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.low-stock-item { display: flex; align-items: center; justify-content: space-between; padding-bottom: 10px; border-bottom: 1px solid var(--border-soft); }
.low-stock-item:last-child { border-bottom: none; padding-bottom: 0; }
.low-stock-item__name { font-weight: 600; font-size: 13px; }
.low-stock-item__meta { color: var(--text-muted); font-size: 11.5px; margin-top: 1px; }

.empty-state { color: var(--text-muted); font-size: 13px; padding: 14px 0; text-align: center; }

.btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 16px; border-radius: 7px; border: 1px solid transparent; font-family: inherit; font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap; }
.btn-primary { background: var(--brass); color: #fff; }
.btn-primary:hover { background: var(--brass-dark); }
.btn-primary:disabled { background: #C9BFAE; cursor: not-allowed; }
.btn-outline { background: transparent; border-color: var(--border); color: var(--text); }
.btn-outline:hover { border-color: var(--brass); color: var(--brass-dark); }
.btn-ghost { background: transparent; color: var(--text-muted); }
.btn-brick { background: var(--brick); color: #fff; }
.btn-brick:hover { background: #82302A; }
.btn-brick:disabled { background: #C9BFAE; cursor: not-allowed; }
.btn-block { width: 100%; justify-content: center; }
.btn-icon { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; }
.btn-icon:hover { border-color: var(--brass); color: var(--brass-dark); }
.btn-icon--danger:hover { border-color: var(--brick); color: var(--brick); }
.btn-icon--ghost { background: transparent; border-color: rgba(255,255,255,0.15); color: #C7C2B6; }
.btn-icon--ghost:hover { border-color: var(--brass); color: #fff; }
.row-actions { display: inline-flex; gap: 6px; white-space: nowrap; }

.pos-toolbar { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 16px; }
.pos-toolbar--wide { justify-content: space-between; }
.search-box { display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 7px; padding: 8px 12px; flex: 1 1 220px; min-width: 0; max-width: 360px; color: var(--text-muted); }
.search-box input { border: none; outline: none; background: transparent; font-family: inherit; font-size: 13px; color: var(--text); flex: 1; min-width: 0; width: 100%; }
.chip-row { display: flex; gap: 8px; flex-wrap: wrap; }
.chip { padding: 6px 13px; border-radius: 20px; border: 1px solid var(--border); background: var(--surface); font-family: inherit; font-size: 12.5px; color: var(--text-muted); cursor: pointer; }
.chip--active { background: var(--ink); color: #fff; border-color: var(--ink); }

.pos-layout { display: grid; grid-template-columns: minmax(0, 1fr) 360px; gap: 20px; align-items: start; }
.pos-products { min-width: 0; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 12px; }
.product-card { display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--border-soft); border-radius: 9px; padding: 0; overflow: hidden; text-align: left; cursor: pointer; font-family: inherit; }
.product-card:hover { border-color: var(--brass); }
.product-card--disabled { opacity: 0.45; cursor: not-allowed; }
.product-card__swatch { height: 64px; display: flex; align-items: center; justify-content: center; color: #fff; }
.swatch--1 { background: #6B2E3A; } .swatch--2 { background: #AD7A3F; } .swatch--3 { background: #3E5A63; } .swatch--4 { background: #55735C; } .swatch--5 { background: #7A5C8E; }
.product-card__body { padding: 10px 12px 12px; }
.product-card__name { font-weight: 600; font-size: 13px; line-height: 1.3; }
.product-card__meta { color: var(--text-muted); font-size: 11.5px; margin-top: 2px; }
.product-card__foot { display: flex; align-items: center; justify-content: space-between; margin-top: 9px; }
.product-card__price { font-weight: 700; font-size: 13px; color: var(--brass-dark); }

.pos-cart { background: var(--surface); border: 1px solid var(--border-soft); border-radius: 10px; padding: 18px; display: flex; flex-direction: column; gap: 12px; position: sticky; top: 0; }
.pos-cart__head { display: flex; align-items: center; justify-content: space-between; }
.pos-cart__head h2 { font-family: 'Fraunces', serif; font-size: 16px; margin: 0; }
.pos-cart__count { font-size: 11.5px; color: var(--text-muted); }
.pos-cart__field { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--text-muted); font-weight: 600; }
.pos-cart__field select, .pos-cart__field input { border: 1px solid var(--border); border-radius: 6px; padding: 8px 10px; font-family: inherit; font-size: 13px; color: var(--text); background: var(--paper); }
.pos-cart__field--sm { font-size: 12px; }
.pos-cart__lines { display: flex; flex-direction: column; gap: 12px; max-height: 260px; overflow-y: auto; padding-right: 2px; }
.cart-item { display: grid; grid-template-columns: 1fr auto auto auto; align-items: center; gap: 8px; padding-bottom: 10px; border-bottom: 1px dashed var(--border); }
.cart-item__name { font-size: 12.5px; font-weight: 600; }
.cart-item__meta { font-size: 11px; color: var(--text-muted); }
.cart-item__price { font-size: 12.5px; font-weight: 600; white-space: nowrap; }
.cart-item__remove { background: none; border: none; color: var(--brick); cursor: pointer; padding: 4px; }
.qty-stepper { display: flex; align-items: center; gap: 6px; }
.qty-stepper button { width: 20px; height: 20px; border-radius: 5px; border: 1px solid var(--border); background: var(--paper); display: flex; align-items: center; justify-content: center; cursor: pointer; }
.qty-stepper span { font-size: 12.5px; font-weight: 600; min-width: 14px; text-align: center; }

.pos-cart__discount { border-top: 1px solid var(--border-soft); padding-top: 12px; }
.discount-input { display: flex; gap: 6px; }
.discount-input select { flex: 0 0 62px; }
.discount-input input { flex: 1; }

.pos-cart__pay { padding-top: 4px; border-top: 1px solid var(--border-soft); display: flex; flex-direction: column; gap: 12px; }
.pos-cart__totals { display: flex; flex-direction: column; gap: 4px; padding-top: 6px; }
.pos-cart__row { display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; color: var(--text-muted); }
.pos-cart__total { display: flex; align-items: center; justify-content: space-between; font-family: 'Fraunces', serif; font-size: 19px; font-weight: 600; margin-top: 4px; }
.pos-cart__actions { display: flex; gap: 8px; }
.pos-cart__actions .btn-block { flex: 1; }

.held-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.held-list__item { display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--border-soft); border-radius: 8px; padding: 10px 12px; }
.held-list__label { font-weight: 600; font-size: 13px; }
.held-list__meta { font-size: 11.5px; color: var(--text-muted); }

.shift-gate { max-width: 480px; margin: 40px auto; }

.receipt-success { max-width: 380px; margin: 40px auto; background: var(--surface); border: 1px solid var(--border-soft); border-radius: 10px; padding: 28px; text-align: center; }
.receipt-success__icon { color: var(--sage); margin-bottom: 8px; }
.receipt-success h2 { font-family: 'Fraunces', serif; margin: 4px 0 6px; }
.receipt-success p { color: var(--text-muted); font-size: 13px; margin: 0 0 16px; }
.receipt-mini { text-align: left; border-top: 1px dashed var(--border); padding-top: 12px; margin-bottom: 18px; display: flex; flex-direction: column; gap: 6px; }
.receipt-mini__row { display: flex; justify-content: space-between; font-size: 12.5px; }

.add-product-panel { border-color: var(--brass); }
.field-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px; }
.field-grid--narrow { grid-template-columns: 1fr; max-width: 260px; }
.field-grid--single { grid-template-columns: 1fr; }
.field-grid label, .panel > label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: var(--text-muted); font-weight: 600; margin-top: 12px; }
.field-grid input, .field-grid select, .panel input, .panel select, .panel textarea { border: 1px solid var(--border); border-radius: 6px; padding: 8px 10px; font-family: inherit; font-size: 13px; color: var(--text); background: var(--paper); }
.panel textarea { resize: vertical; }
.field-actions { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px; margin-top: 16px; }
.field-actions--start { justify-content: flex-start; }
.field-actions--center { justify-content: center; }
.field-hint { font-size: 12px; color: var(--text-muted); margin: 12px 0 0; display: flex; align-items: center; gap: 5px; }
.field-hint--error { color: var(--brick); }

.toggle-field { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: var(--text); cursor: pointer; }
.toggle-field--card { border: 1px solid var(--border); border-radius: 7px; padding: 9px 12px; background: var(--paper); }
.payment-toggle-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 10px; margin-top: 10px; }

.user-cell { display: flex; align-items: center; gap: 10px; }
.user-cell__avatar { background: var(--brass); color: var(--ink); }

.permission-table th, .permission-table td { text-align: center; }
.permission-table td:first-child, .permission-table th:first-child { text-align: left; }
.permission-table input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--brass); cursor: pointer; }

.access-denied { max-width: 420px; margin: 60px auto; text-align: center; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; gap: 10px; }
.access-denied h2 { color: var(--text); font-family: 'Fraunces', serif; margin: 0; }

.modal-overlay { position: fixed; inset: 0; background: rgba(32, 43, 59, 0.55); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; overflow-y: auto; }
.modal-box { background: var(--surface); border-radius: 10px; width: 100%; max-height: 88vh; max-height: calc(100dvh - 40px); overflow-y: auto; box-shadow: 0 20px 50px rgba(0,0,0,0.25); }
.modal-box__head { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--border-soft); position: sticky; top: 0; background: var(--surface); }
.modal-box__head h2 { font-family: 'Fraunces', serif; font-size: 16px; margin: 0; }
.modal-box__body { padding: 18px 20px 20px; }

/* ---- QRIS panel ---- */
.qris-panel { display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap; }
.qris-panel__code { position: relative; border: 8px solid #fff; box-shadow: 0 0 0 1px var(--border); border-radius: 8px; flex-shrink: 0; }
.qris-panel__overlay { position: absolute; inset: 0; background: rgba(255,255,255,0.85); display: flex; align-items: center; justify-content: center; }
.qris-panel__info { flex: 1; min-width: 200px; }
.qris-panel__brand { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-muted); font-weight: 600; }
.qris-panel__amount { font-family: 'Fraunces', serif; font-size: 24px; font-weight: 700; margin-top: 4px; }
.qris-panel__ref { font-size: 11.5px; color: var(--text-muted); margin-bottom: 10px; }
.qris-panel__hint { font-size: 12.5px; color: var(--text-muted); }
.qris-panel__hint--loading { display: flex; align-items: center; gap: 6px; }
.qris-panel__hint--success { color: var(--sage); font-weight: 600; }
.spin { animation: spin 0.8s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* ---- login ---- */
.login-screen { width: 100%; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(160deg, #202B3B 0%, #2B3849 55%, #3E5A63 100%); font-family: 'Inter', sans-serif; padding: 24px; }
.login-card { background: var(--surface, #FBFAF6); width: 100%; max-width: 420px; border-radius: 14px; padding: 30px 30px 26px; box-shadow: 0 30px 60px rgba(0,0,0,0.35); }
.login-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; }
.login-brand__name { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; font-style: italic; color: #241F1A; }
.login-brand__tag { font-size: 12px; color: #6B655C; margin-top: 2px; }
.login-form { display: flex; flex-direction: column; gap: 14px; }
.login-form label { display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; font-weight: 600; color: #6B655C; }
.login-form input { border: 1px solid #DAD4C7; border-radius: 7px; padding: 10px 12px; font-family: inherit; font-size: 13.5px; background: #F1EEE6; color: #241F1A; }
.login-divider { display: flex; align-items: center; gap: 10px; margin: 20px 0 14px; color: #A7A091; font-size: 11.5px; }
.login-divider::before, .login-divider::after { content: ""; flex: 1; height: 1px; background: #DAD4C7; }
.login-quick-list { display: flex; flex-direction: column; gap: 8px; max-height: 220px; overflow-y: auto; }
.login-quick-item { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px; border: 1px solid #DAD4C7; background: #FBFAF6; cursor: pointer; font-family: inherit; text-align: left; }
.login-quick-item:hover { border-color: #AD7A3F; }
.login-quick-item__avatar { flex-shrink: 0; }
.login-quick-item__name { display: block; font-size: 12.5px; font-weight: 600; color: #241F1A; }
.login-quick-item__role { display: block; font-size: 11px; color: #6B655C; }
.login-note { font-size: 11px; color: #A7A091; margin-top: 14px; text-align: center; }

/* ---- printable receipt (thermal-style) ---- */
.receipt-print-area { display: none; }
@media print {
  body * { visibility: hidden; }
  .receipt-print-area, .receipt-print-area * { visibility: visible; }
  .receipt-print-area { display: block; position: absolute; top: 0; left: 0; width: 100%; }
}
.receipt-paper { width: 300px; margin: 0 auto; font-family: 'Courier New', monospace; font-size: 12px; color: #000; padding: 12px; }
.receipt-paper__center { text-align: center; }
.receipt-paper__store { font-weight: 700; font-size: 14px; }
.receipt-paper__hr { border-top: 1px dashed #000; margin: 8px 0; }
.receipt-paper__row { display: flex; justify-content: space-between; gap: 8px; }
.receipt-paper__row--total { font-weight: 700; font-size: 13px; margin-top: 4px; }
.receipt-paper__item { margin-bottom: 4px; }
.receipt-paper__footer { font-size: 11px; margin-top: 8px; }

/* =========================================================
   RESPONSIVE
   Desktop (>1024px) : sidebar tetap, bisa dikecilkan jadi rail ikon.
   Tablet/HP (<=1024px): sidebar jadi drawer geser + backdrop.
   ========================================================= */

/* ---- desktop: mode rail (sidebar "masuk") ---- */
@media (min-width: 1025px) {
  .app--collapsed .sidebar { width: 76px; }
  .app--collapsed .brand__text,
  .app--collapsed .nav__group-label,
  .app--collapsed .nav__item span,
  .app--collapsed .sidebar__who { display: none; }
  .app--collapsed .brand,
  .app--collapsed .sidebar__footer,
  .app--collapsed .nav__item { justify-content: center; }
  .app--collapsed .nav__item { border-left-width: 0; }
  .app--collapsed .nav__item--active { box-shadow: inset 2px 0 0 var(--brass); }
  .app--collapsed .nav__group { padding: 6px 0; border-top: 1px solid rgba(255,255,255,0.06); }
  .app--collapsed .nav__group:first-child { border-top: none; }
}

/* ---- tablet & HP: sidebar jadi drawer ---- */
@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    top: 0; bottom: 0; left: 0;
    width: 272px;
    max-width: 84vw;
    z-index: 90;
    transform: translateX(-100%);
    box-shadow: 0 0 40px rgba(0,0,0,0.35);
  }
  .app--drawer-open .sidebar { transform: translateX(0); }
  .sidebar__close { display: inline-flex; }

  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(32, 43, 59, 0.55);
    z-index: 85;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }
  .app--drawer-open .sidebar-backdrop { opacity: 1; pointer-events: auto; }

  /* target sentuh lebih besar */
  .nav__item { padding: 12px 12px; font-size: 14px; }
  .nav { padding: 6px 10px 14px; }

  .dash-grid { grid-template-columns: 1fr; }
  .pos-layout { grid-template-columns: 1fr; }
  .pos-cart { position: static; }
  .topbar { padding: 16px 20px; }
  .main__content { padding: 20px 20px calc(32px + env(safe-area-inset-bottom)); }
}

/* ---- tablet potret ---- */
@media (max-width: 860px) {
  .topbar { flex-direction: column; align-items: stretch; gap: 10px; padding: 14px 16px; }
  .topbar__right { flex-direction: row; align-items: center; justify-content: flex-start; flex-wrap: wrap; gap: 10px; }
  .topbar__title { font-size: 20px; }
  .topbar__sub { font-size: 12.5px; }
  .main__content { padding: 16px 16px calc(28px + env(safe-area-inset-bottom)); }
  .view { gap: 16px; }
  .panel { padding: 16px; }
  .pos-toolbar { gap: 10px; }
  .search-box { max-width: none; }
}

/* ---- HP ---- */
@media (max-width: 640px) {
  .app { font-size: 13.5px; }
  .kpi-grid, .kpi-grid--4 { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; }
  .kpi-card { padding: 13px 14px; }
  .kpi-card__value { font-size: 20px; }

  .field-grid, .field-grid--narrow { grid-template-columns: 1fr; max-width: none; }
  .field-actions { justify-content: stretch; }
  .field-actions .btn { flex: 1 1 160px; justify-content: center; }

  .product-grid { grid-template-columns: repeat(auto-fill, minmax(145px, 1fr)); gap: 10px; }
  .product-card__swatch { height: 54px; }

  .pos-toolbar--wide { flex-direction: column; align-items: stretch; }
  .pos-toolbar--wide > .btn { width: 100%; justify-content: center; }
  .chip-row { overflow-x: auto; flex-wrap: nowrap; padding-bottom: 2px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
  .chip-row::-webkit-scrollbar { display: none; }
  .chip { flex-shrink: 0; padding: 8px 14px; }

  .pos-cart { padding: 14px; }
  .pos-cart__lines { max-height: none; }
  .pos-cart__actions { flex-wrap: wrap; }
  .pos-cart__actions .btn { flex: 1 1 130px; justify-content: center; }
  .qty-stepper button { width: 28px; height: 28px; }
  .cart-item { grid-template-columns: 1fr auto; grid-template-areas: "info remove" "qty price"; row-gap: 8px; }
  .cart-item__info { grid-area: info; min-width: 0; }
  .cart-item__remove { grid-area: remove; justify-self: end; }
  .qty-stepper { grid-area: qty; }
  .cart-item__price { grid-area: price; justify-self: end; }

  .panel { padding: 14px; border-radius: 8px; }
  .panel__head h2 { font-size: 15px; }
  .modal-overlay { padding: 12px; align-items: flex-start; }
  .modal-box { max-height: calc(100dvh - 24px); }
  .modal-box__body { padding: 16px; }
  .modal-box__head { padding: 14px 16px; }

  .btn { padding: 10px 14px; min-height: 40px; }
  .btn-icon { width: 34px; height: 34px; }

  .receipt-success { margin: 16px auto; padding: 22px 18px; }
  .shift-gate { margin: 0 auto; }
  .login-card { padding: 24px 20px 22px; }
  .login-screen { padding: 16px; }
  .qris-panel { justify-content: center; }
  .held-list__item { flex-wrap: wrap; gap: 10px; }
  .held-list__item .btn { flex: 1 1 auto; justify-content: center; }
  .pos-cart__head { flex-wrap: wrap; gap: 6px; }
  .section-title { font-size: 15.5px; }
  .low-stock-item { gap: 10px; }
  .toggle-field { font-size: 13.5px; }
}

/* ---- tabel: selalu bisa digeser horizontal di layar sempit ---- */
@media (max-width: 860px) {
  .table-scroll { margin: 0 -4px; padding: 0 4px; }
  .data-table th, .data-table td { white-space: nowrap; }
  .data-table td { padding: 10px 8px; }
  .table-product__meta { white-space: normal; }
}

/* ---- input 16px supaya iOS tidak auto-zoom saat fokus ---- */
@media (max-width: 860px) {
  input, select, textarea,
  .search-box input,
  .field-grid input, .field-grid select,
  .panel input, .panel select, .panel textarea,
  .pos-cart__field select, .pos-cart__field input,
  .login-form input { font-size: 16px; }
}

/* ---- layar sangat pendek / landscape HP ---- */
@media (max-height: 520px) and (max-width: 1024px) {
  .brand { padding: 14px 16px 12px; }
  .nav__item { padding: 9px 12px; }
}

@media print {
  .sidebar, .sidebar-backdrop, .topbar { display: none !important; }
  .app { display: block; height: auto; overflow: visible; }
}

`;
