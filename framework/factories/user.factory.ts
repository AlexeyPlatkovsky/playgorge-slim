import { faker } from "@faker-js/faker";

export interface UserData {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  mobileNumber: string;
  company: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
}

export function buildUser(overrides: Partial<UserData> & { seed?: number } = {}): UserData {
  if (overrides.seed !== undefined) {
    faker.seed(overrides.seed);
  }
  const firstName = overrides.firstName ?? faker.person.firstName();
  const lastName = overrides.lastName ?? faker.person.lastName();
  return {
    name: overrides.name ?? `${firstName} ${lastName}`,
    email:
      overrides.email ??
      (overrides.seed !== undefined
        ? `playforge-${faker.string.alphanumeric(12)}@example.com`
        : `playforge-${String(Date.now())}-${faker.string.alphanumeric(6)}@example.com`),
    password: overrides.password ?? "Playforge123!",
    firstName,
    lastName,
    address: overrides.address ?? faker.location.streetAddress(),
    city: overrides.city ?? faker.location.city(),
    country: overrides.country ?? "United States",
    state: overrides.state ?? faker.location.state(),
    zipCode: overrides.zipCode ?? faker.location.zipCode(),
    mobileNumber: overrides.mobileNumber ?? faker.phone.number({ style: "national" }),
    company: overrides.company ?? faker.company.name(),
    birthDay: overrides.birthDay ?? String(faker.number.int({ max: 28, min: 1 })),
    birthMonth: overrides.birthMonth ?? String(faker.number.int({ max: 12, min: 1 })),
    birthYear: overrides.birthYear ?? String(faker.number.int({ max: 2000, min: 1970 }))
  };
}

export async function createUser(overrides: Partial<UserData> & { seed?: number } = {}): Promise<UserData> {
  const user = buildUser(overrides);
  const body = new URLSearchParams({
    address1: user.address,
    address2: "",
    birth_date: user.birthDay,
    birth_month: user.birthMonth,
    birth_year: user.birthYear,
    city: user.city,
    company: user.company,
    country: user.country,
    email: user.email,
    firstname: user.firstName,
    lastname: user.lastName,
    mobile_number: user.mobileNumber,
    name: user.name,
    password: user.password,
    state: user.state,
    title: "Mr",
    zipcode: user.zipCode
  });

  const response = await fetch("https://automationexercise.com/api/createAccount", {
    body: body.toString(),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "POST"
  });

  const json = (await response.json()) as { message: string; responseCode: number };
  if (json.responseCode !== 201) {
    throw new Error(`createUser failed (${String(json.responseCode)}): ${json.message}`);
  }

  return user;
}

export async function deleteUser(email: string, password: string): Promise<void> {
  const body = new URLSearchParams({ email, password });
  await fetch("https://automationexercise.com/api/deleteAccount", {
    body: body.toString(),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "DELETE"
  });
}
