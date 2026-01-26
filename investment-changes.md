# Client Investment Onboarding Flow (Admin UI)

This defines strict frontend behavior for admin onboarding.

---

## Architecture Rules

* Use existing form components
* No new custom form engines
* Use controlled forms
* Persist tab state locally until final submit

---

## Tab Order

1. Investor Info
2. Holding Details
3. Account Details
4. Nominees
5. KYC Upload
6. Review & Submit

---

## Step 1 — Investor Info Tab

### Flow

1. Enter PAN
2. Auto-search backend

If Found:

* Autofill person + customer
* Lock MyAlt Code

If Not Found:

* Allow new entry

---

## Step 2 — Holding Details

Fields:

* Mode of Holding
* Holder 1 mandatory
* Holder 2/3 conditional

Validation:

* Holder 1 = PAN owner

---

## Step 3 — Account Details

### Demat

* DP Type
* DP ID
* Client ID

### Bank

* Select from dropdown
* IFSC validation

---

## Step 4 — Nominees

Rules:

* Max 3 nominees
* Percentage total = 100

---

## Step 5 — KYC Upload

Upload First → Store path → Attach metadata only

No base64 payloads

---

## Step 6 — Review

Display:

* Investor summary
* Holder mapping
* Commitment amount
* Bank + DP

---

## Final Submit

Call:

POST /api/investments/onboard

---

## UX Enforcement

| Rule             | Behavior            |
| ---------------- | ------------------- |
| Tab incomplete   | Disable Next        |
| PAN conflict     | Show blocking modal |
| Nominee mismatch | Prevent submit      |

---

## Performance Rules

* Lazy load masters
* Cache dropdowns
* Debounce PAN search

---

## Error UX

Always show:

* Field level error
* API error banner
* Retry option

✅ FINAL PAYLOAD STRUCTURE
{
  "investment": {
    "product_type": "AIF",
    "product_id": "uuid",
    "amc_id": "uuid",
    "amc_client_code": "ABK12345",

    "capital_commitment": 10000000,
    "commitment_currency": "INR",

    "strategy_id": "uuid",
    "fee_structure": "REGULAR",

    "fm_code": "FM009",
    "branch_code": "MUM01",

    "distributor_id": "uuid",
    "cre_id": "uuid",
    "rm_id": "uuid",

    "inception_date": "2024-10-01",
    "remarks": "HNI onboarding"
  },

  "customer_profile": {
    "residential_status": "RESIDENT",
    "sub_status": null,
    "primary_pan": "ABCDE1234F"
  },

  "portfolio_account": {
    "mode_of_holding": "JOINT"
  },

  "demat_account": {
    "dp_type": "NSDL",
    "dp_name": "Motilal Oswal",
    "dp_id": "IN300214",
    "client_id": "12345678"
  },

  "bank_account": {
    "bank_name": "HDFC Bank",
    "account_number": "123456789012",
    "ifsc": "HDFC0000123",
    "account_type": "SAVINGS"
  },

  "holders": [
    {
      "holder_order": 1,
      "pan": "ABCDE1234F",
      "full_name": "Rahul Sharma",
      "dob": "1985-05-12",
      "gender": "MALE",

      "mobile": "9876543210",
      "email": "rahul@email.com",

      "address": {
        "line1": "Andheri East",
        "line2": "Near Metro",
        "city": "Mumbai",
        "state": "MH",
        "country": "IN",
        "pincode": "400069"
      },

      "is_minor": false,
      "guardian": null
    },

    {
      "holder_order": 2,
      "pan": "PQRSX5678Z",
      "full_name": "Neha Sharma",
      "dob": "1987-03-18",
      "gender": "FEMALE",

      "mobile": "9876500000",
      "email": "neha@email.com",

      "address": {
        "line1": "Andheri East",
        "line2": "",
        "city": "Mumbai",
        "state": "MH",
        "country": "IN",
        "pincode": "400069"
      },

      "is_minor": false,
      "guardian": null
    }
  ],

  "nominees": [
    {
      "full_name": "Aarav Sharma",
      "relationship": "SON",
      "percentage": 100,
      "id_type": "AADHAAR",
      "id_number": "123412341234"
    }
  ],

  "kyc_documents": [
    {
      "person_pan": "ABCDE1234F",
      "document_type": "PAN",
      "file_url": "s3://bucket/pan_abc.pdf"
    },
    {
      "person_pan": "ABCDE1234F",
      "document_type": "ADDRESS_PROOF",
      "file_url": "s3://bucket/address_abc.pdf"
    },
    {
      "person_pan": "ABCDE1234F",
      "document_type": "BANK_PROOF",
      "file_url": "s3://bucket/bank_abc.pdf"
    }
  ],

  "drawdown": {
    "drawdown_number": "DD001",
    "payment_reference": "UTR998877",
    "amount": 2500000,
    "percentage": 25,
    "payment_due_date": "2024-11-01",
    "payment_received_date": null,
    "late_fee": 0,
    "next_due_date": "2024-12-15"
  }
}

🚫 What You MUST NOT Allow

Reject payload if:

❌ Names without IDs for masters
❌ Holder 1 PAN ≠ primary_pan
❌ More holders than mode_of_holding
❌ Nominee % ≠ 100
❌ GIFT AIF currency ≠ USD
❌ Bank without IFSC
❌ DP details missing for demat product

