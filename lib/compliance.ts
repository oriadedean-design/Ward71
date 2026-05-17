// Single source of truth for campaign finance compliance rules.
// Update CONTRIBUTION_LIMITS before each election cycle.

export const CONTRIBUTION_LIMITS = {
  individualMax: 1200,           // CAD — per individual to a single candidate
  publicDisclosureThreshold: 100, // contributions above this are publicly disclosed
  receiptThreshold: 25,           // contributions above this receive a receipt
} as const;

export const ONTARIO_POSTAL_CODE_REGEX = /^[KLMNP]\d[A-Z][ -]?\d[A-Z]\d$/i;

export const CANADIAN_PROVINCES = [
  { value: 'ON', label: 'Ontario' },
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'YT', label: 'Yukon' },
] as const;

export function isOntarioPostalCode(postalCode: string): boolean {
  return ONTARIO_POSTAL_CODE_REGEX.test(postalCode.trim());
}

export function isValidContributionAmount(amount: number): { valid: boolean; error?: string } {
  if (amount < 5) {
    return { valid: false, error: 'The minimum contribution is $5.' };
  }
  if (amount > CONTRIBUTION_LIMITS.individualMax) {
    return {
      valid: false,
      error: `The maximum individual contribution to a single Toronto council candidate is $${CONTRIBUTION_LIMITS.individualMax}. Please enter an amount up to $${CONTRIBUTION_LIMITS.individualMax}.`,
    };
  }
  return { valid: true };
}

export function isValidCanadianPhone(phone: string): boolean {
  return phone.replace(/\D/g, '').length === 10;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidFullName(name: string): boolean {
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2 && parts.every(p => p.length > 0);
}
