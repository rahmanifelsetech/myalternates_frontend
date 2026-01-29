import { AccountType } from "../../Investors/types/bank";

// Document Types
export enum DocumentType {
  PAN = 'pan',
  ADDRESS_PROOF = 'addressProof',
  BANK_PROOF = 'bankProof',
  OTHERS = 'others',
}

export const documentTypeLabels: Record<DocumentType, string> = {
  [DocumentType.PAN]: 'PAN Document',
  [DocumentType.ADDRESS_PROOF]: 'Address Proof',
  [DocumentType.BANK_PROOF]: 'Bank Proof',
  [DocumentType.OTHERS]: 'Other Documents',
};

// Holding Mode
export enum HoldingMode {
  SINGLE = 'SINGLE',
  JOINT = 'JOINT',
}

export const holdingModeOptions = [
  { label: 'Single', value: HoldingMode.SINGLE },
  { label: 'Joint', value: HoldingMode.JOINT },
];

// Gender
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export const genderOptions = [
  { label: 'Male', value: Gender.MALE },
  { label: 'Female', value: Gender.FEMALE },
  { label: 'Other', value: Gender.OTHER },
];

// Residential Status
export enum ResidentialStatus {
  RESIDENT = 'Resident',
  NRI = 'NRI',
  NON_INDIVIDUAL = 'Non-Individual',
}

export const residentialStatusOptions = [
  { label: 'Resident', value: ResidentialStatus.RESIDENT },
  { label: 'NRI', value: ResidentialStatus.NRI },
  { label: 'Non-Individual', value: ResidentialStatus.NON_INDIVIDUAL },
];

// Sub Status (for Non-Individual)
export enum SubStatus {
  PRIVATE_LTD = 'Private Ltd Company',
  PUBLIC_LTD = 'Public Ltd Company',
  LLP = 'Limited Liability Partnership',
  PARTNERSHIP = 'Partnership Firm',
  TRUST = 'Trust',
  HUF = 'HUF',
  SOLE_PROPRIETORSHIP = 'Sole Proprietorship',
}

export const subStatusOptions = [
  { label: 'Private Ltd Company', value: SubStatus.PRIVATE_LTD },
  { label: 'Public Ltd Company', value: SubStatus.PUBLIC_LTD },
  { label: 'Limited Liability Partnership', value: SubStatus.LLP },
  { label: 'Partnership Firm', value: SubStatus.PARTNERSHIP },
  { label: 'Trust', value: SubStatus.TRUST },
  { label: 'HUF', value: SubStatus.HUF },
  { label: 'Sole Proprietorship', value: SubStatus.SOLE_PROPRIETORSHIP },
];

// DP Type
export enum DPType {
  NSDL = 'NSDL',
  CDSL = 'CDSL',
}

export const dpTypeOptions = [
  { label: 'NSDL', value: DPType.NSDL },
  { label: 'CDSL', value: DPType.CDSL },
];


export const accountTypeOptions = [
  { label: 'Savings', value: AccountType.SAVINGS },
  { label: 'Current', value: AccountType.CURRENT },
  { label: 'NRE', value: AccountType.NRE },
  { label: 'NRO', value: AccountType.NRO },
];

// ID Type
export enum IdType {
  PAN = 'PAN',
  AADHAAR = 'Aadhaar',
  PASSPORT = 'Passport',
}

export const idTypeOptions = [
  { label: 'PAN', value: IdType.PAN },
  { label: 'Aadhaar', value: IdType.AADHAAR },
  { label: 'Passport', value: IdType.PASSPORT },
];

// Nominee Relationship
export enum Relationship {
  SPOUSE = 'Spouse',
  CHILD = 'Child',
  OTHER = 'Other',
}

export const relationshipOptions = [
  { label: 'Spouse', value: Relationship.SPOUSE },
  { label: 'Child', value: Relationship.CHILD },
  { label: 'Other', value: Relationship.OTHER },
];
