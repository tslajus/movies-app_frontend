import { post } from './shared/methods';

export async function userSignUp(name: string, email: string, password: string): Promise<void> {
  await post<SignUp>('sign-up', { name, email, password });
}
