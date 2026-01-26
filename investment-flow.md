# CLIENT UI PROMPT — Investment Operations Platform

You are extending an existing frontend codebase.
DO NOT change project structure, routing patterns, state management style, or design system.
Follow existing folder layout, component architecture, and theming strictly.

---

# Objective

Implement the Admin + Distributor + Investor onboarding and portfolio UI for an Investment Operations Platform.

The UI must support:

- Single investment onboarding form
- Editable autofill behavior
- Async KYC document upload
- Draft saving
- Snapshot-safe submission
- Compliance-first UX

---

# Core UX Rules (Non-Negotiable)

1. Autofilled fields MUST remain editable
2. Editing autofilled data MUST prompt scope selection:
   - Apply to THIS INVESTMENT ONLY
   - Update MASTER PROFILE
3. File uploads MUST be async (before submit)
4. Final submit must be JSON only (no files)
5. Draft saving must persist partially completed forms
6. Must follow existing UI theme and component library

---

# Roles Supported

Handle roles and permissions like the app's strucutre
---

# ADMIN / DISTRIBUTOR — Create Investment Flow

Route:

/admin/investments/create  
/distributor/investments/create  

---

# Page Layout

multi tabs, multi-section form:

1. Investor Identification
2. Address
3. Product Selection
4. Holding Mode
5. Holders
6. Nominees
7. Bank Selection
8. DP Details
9. KYC Upload
10. Review & Submit

---

# SECTION 1 — Investor Identification

Fields:

- PAN (search input)
- Myalt Code (readonly)
- Name
- DOB
- Gender
- Residential Status
- Sub Status

Behavior:

On PAN blur:

Call:

GET /api/investors/by-pan/{pan}

If exists:

- Autofill all fields
- Show badge: "Loaded from Master Profile"
- Fields remain editable

When user edits autofilled fields:

Show inline toggle:

Apply change to:
( ) Investment Only (default)
( ) Master Profile

Store selection in form state.

---

# SECTION 2 — Address

Same behavior as above.

Edits trigger scope selector.

---

# SECTION 3 — Product Details

Fields:

- Product Type
- AMC Name
- Strategy Name
- Scheme
- Capital Commitment
- Currency (auto)
- Fee Structure
- Inception Date

Dynamic behavior:

- GIFT AIF → USD currency auto
- MF → Hide drawdown inputs

---

# SECTION 4 — Holding Mode

Dropdown:

- SINGLE
- JOINT

Behavior:

- SINGLE → Only Primary Holder visible
- JOINT → Add/remove holders allowed

---

# SECTION 5 — Holders

Repeatable form group.

Fields:

- PAN
- Name
- DOB
- Gender
- Email
- Mobile
- Address

Behavior:

PAN lookup autofills holder details.

Same editable + scope selection logic applies.

Validation:

- No duplicate PANs
- Primary holder required

---

# SECTION 6 — Nominees

Repeatable group:

Fields:

- Name
- ID Type
- ID Number
- Relationship
- Percentage

Validation:

- Total percentage must equal 100%

If nominee minor:

Show Guardian fields.

---

# SECTION 7 — Bank Selection

Show existing investor bank accounts.

Allow:

- Select existing
- Add new

If new bank added:

Require Bank Proof upload.

---

# SECTION 8 — DP Details

Standard form.

Optional depending on product.

---

# SECTION 9 — KYC Upload (ASYNC)

Per holder + bank:

Required:

- PAN Proof
- Address Proof
- Bank Proof
- Optional Others

---

# Upload Behavior

On file select:

Call:

POST /api/kyc/upload  
multipart/form-data  

Receive:

- documentId
- status

Store documentId in form state.

Show:

- Progress bar
- Success/failure state
- Replace option

Files are NOT included in final submit.

---

# SECTION 10 — Review

Show full summary:

- Investor
- Holders
- Nominees
- Bank
- Product
- Uploaded docs

Require confirmation checkbox.

---

# Buttons

- Save Draft
- Final Submit

---

# Save Draft

Call:

POST /api/investments/draft

Send:

- Partial form data
- Uploaded document IDs
- Scope selections

---

# Final Submit

Call:

POST /api/admin/investments/onboard

Payload:

- Investor master updates
- Investment details
- Holders
- Nominees
- Selected bank ID
- DP info
- KYC document references
- Field scope map

NO FILES.

---

# Investor Portal

Routes:

/investor/dashboard  
/investor/investments/:id  

Display:

- Portfolio summary
- KYC status
- Drawdowns
- Statements

Investor permissions:

- Upload missing KYC
- View snapshots (read-only)

No edit of investment core data.

---

# Distributor Portal

Same onboarding UI as Admin but:

- No approve permissions
- Submissions marked "Pending Admin Approval"

---

# Snapshot Awareness

UI must treat submitted investment as immutable.

Edits trigger:

"New version will be created" warning.

---

# Security Rules

- Mask PAN
- Mask bank numbers
- Disable copy on sensitive inputs
- Enforce role guards

---

# Performance Rules

- Async uploads
- Debounced PAN search
- Lazy loading lists
- Pagination for portfolios

---

# IMPORTANT

Follow existing:

- Component folder structure
- Form library usage
- Validation framework
- API service layer pattern
- Theme tokens

Do not introduce new architectural patterns.