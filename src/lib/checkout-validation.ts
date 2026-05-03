export type CheckoutFields = {
  name: string;
  phone: string;
  address: string;
};

export type CheckoutFieldErrors = Partial<
  Record<keyof CheckoutFields, string>
>;

const PHONE_DIGITS_MIN = 8;

function countDigits(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

export function validateCheckout(fields: CheckoutFields): CheckoutFieldErrors {
  const errors: CheckoutFieldErrors = {};
  const name = fields.name.trim();
  const phone = fields.phone.trim();
  const address = fields.address.trim();

  if (name.length < 2) {
    errors.name = "Please enter your full name (at least 2 characters).";
  } else if (name.length > 120) {
    errors.name = "Name is too long.";
  }

  if (phone.length < 6) {
    errors.phone = "Please enter a phone number.";
  } else if (countDigits(phone) < PHONE_DIGITS_MIN) {
    errors.phone = `Phone must include at least ${PHONE_DIGITS_MIN} digits.`;
  }

  if (address.length < 8) {
    errors.address = "Please enter a complete street address.";
  } else if (address.length > 500) {
    errors.address = "Address is too long.";
  }

  return errors;
}
