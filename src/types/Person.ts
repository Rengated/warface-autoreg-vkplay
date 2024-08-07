export interface Person {
  firstName: string;
  surname: string;
  gender: string;
  birthDate: string;
  password: string;
  email: string;
  testing: {
    security: boolean;
    phone: boolean;
  };
  cookies?: string;
}
