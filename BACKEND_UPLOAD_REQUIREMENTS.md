# Backend Requirements for Bulk Upload Module

This document outlines the backend specifications required to support the Bulk Upload Queue UI. The backend is responsible for serving template files, validating uploaded data, and managing the processing queue.

## 1. API Endpoints

### A. Download Template
- **Endpoint:** `GET /api/data-upload/template/:type`
- **Method:** `GET`
- **Params:**
  - `type`: Enum (`DAILY_VALUATION`, `HOLDINGS`, `MARKET_LIST`, `TRANSACTION`, `INDEX`)
- **Response:**
  - Content-Type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` (for .xlsx)
  - Content-Disposition: `attachment; filename="[type]_template.xlsx"`
  - Body: Binary file stream.

### B. Bulk Upload
- **Endpoint:** `POST /api/data-upload/bulk`
- **Method:** `POST`
- **Content-Type:** `multipart/form-data`
- **Form Data:**
  - `file`: The uploaded file (Binary).
  - `uploadType`: Enum (as above).
  - `source`: `ADMIN_PANEL`.
  - `processMode`: `QUEUE`.
  - `fileType`: `EXCEL` or `CSV`.
- **Response:**
  - Success: `{ "statusCode": 201, "message": "File uploaded successfully and queued for processing", "data": { "jobId": "..." } }`
  - Error: Standard error format with validation details.

### C. Queue Logs (Existing Update)
- **Endpoint:** `GET /api/populate/external/logs`
- **Requirement:** Ensure this endpoint now includes jobs created via the Bulk Upload endpoint. The `jobType` field in the response should match the `uploadType` (e.g., `DAILY_VALUATION`).

---

## 2. Template Data Structures & Validation Rules

The backend should generate these templates dynamically or serve static files pre-populated with headers and 1-2 rows of example data based on the following requirements.

### A. Daily Valuation (`DAILY_VALUATION`)
Used for updating valuation data for clients.

**Conditions:**
- **PMS:** Daily upload.
- **AIF / GIFT AIF:** Monthly, 6-monthly, or Yearly upload.

**Template Columns:**
| Column Header | Data Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `AMC_CLIENT_CODE` | String | Yes | Unique Client Code. |
| `VALUATION_DATE` | Date | Yes | `YYYY-MM-DD` |
| `CURRENT_VALUATION_AMOUNT` | Decimal | Yes | The valuation amount. |

**Example Data:**
```csv
AMC_CLIENT_CODE,VALUATION_DATE,CURRENT_VALUATION_AMOUNT
CLIENT001,2024-01-15,1050000.00
```

### B. Holdings (`HOLDINGS`)
Used for uploading client holdings.

**Template Columns:**
| Column Header | Data Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `AMC_CLIENT_CODE` | String | Yes | Unique Client Code. |
| `ISIN_CODE` | String | Yes | International Securities Identification Number. |
| `VALUATION_DATE` | Date | Yes | `YYYY-MM-DD` |
| `SECURITY_TYPE` | String | Yes | e.g., Equity, Debt. |
| `PORTFOLIO_WEIGHTAGE` | Decimal | Yes | Percentage (0-100). |

**Example Data:**
```csv
AMC_CLIENT_CODE,ISIN_CODE,VALUATION_DATE,SECURITY_TYPE,PORTFOLIO_WEIGHTAGE
CLIENT001,INE002A01018,2024-01-15,Equity,5.5
```

### C. Market List (`MARKET_LIST`)
Used for updating the master list of stocks/securities.

**Template Columns:**
| Column Header | Data Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `COMPANY_NAME` | String | Yes | Name of the company. |
| `ISIN_CODE` | String | Yes | Unique Identifier. |
| `CATEGORIZATION` | String | Yes | e.g., Large Cap, Mid Cap. |
| `SECTOR` | String | Yes | e.g., IT, Banking. |
| `AS_ON_DATE` | Date | Yes | `YYYY-MM-DD` |

**Example Data:**
```csv
COMPANY_NAME,ISIN_CODE,CATEGORIZATION,SECTOR,AS_ON_DATE
Reliance Industries,INE002A01018,Large Cap,Oil & Gas,2024-01-15
```

### D. Transactions (`TRANSACTION`)
Used for recording client transactions.

**Conditions:**
- **PMS:** First transaction is Initial; subsequent are Addition/Withdrawal.
- **AIF/GIFT:** Initial is Capital Commitment; Additions are Capital Called (deducted from commitment).
- **GIFT:** All values in Dollar terms.

**Template Columns:**
| Column Header | Data Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `AMC_CLIENT_CODE` | String | Yes | Unique Client Code. |
| `ORDER_DATE` | Date | Yes | `YYYY-MM-DD` |
| `VALUATION_DATE` | Date | Yes | `YYYY-MM-DD` |
| `TRANSACTION_TYPE` | String | Yes | `ADDITION` or `WITHDRAWAL`. |
| `AMOUNT` | Decimal | Yes | Transaction Amount. |
| `REMARKS` | String | No | Optional remarks. |

**Example Data:**
```csv
AMC_CLIENT_CODE,ORDER_DATE,VALUATION_DATE,TRANSACTION_TYPE,AMOUNT,REMARKS
CLIENT001,2024-01-15,2024-01-15,ADDITION,500000.00,Additional Investment
```

### E. Index's (`INDEX`)
Used for updating Index data.

**Template Columns:**
| Column Header | Data Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `VALUATION_DATE` | Date | Yes | `YYYY-MM-DD` |
| `SCHEME_CODE` | String | Yes | Code of the Index/Scheme. |
| `SCHEME_NAME` | String | Yes | Name of the Index/Scheme. |
| `OPEN_VALUE` | Decimal | Yes | |
| `HIGH_VALUE` | Decimal | Yes | |
| `LOW_VALUE` | Decimal | Yes | |
| `CLOSE_VALUE` | Decimal | Yes | |

**Example Data:**
```csv
VALUATION_DATE,SCHEME_CODE,SCHEME_NAME,OPEN_VALUE,HIGH_VALUE,LOW_VALUE,CLOSE_VALUE
2024-01-15,NIFTY50,Nifty 50,21500.00,21600.00,21450.00,21550.00