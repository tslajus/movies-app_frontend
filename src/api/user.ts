import { post } from './shared/methods';

export async function userSignUp(name: string, email: string, password: string): Promise<{ success: true } | { success: false; message: string }> {
  try {
    await post<SignUp>('sign-up', { name, email, password });
    return { success: true };
  } catch (error: any) {
    return { success: false, message: 'Invalid credentials' };
  }
}

export async function userLogin(email: string, password: string): Promise<{ success: true; token: string } | { success: false; message: string }> {
  try {
    const response = await post<{ token: string }>('login', { email, password });
    return { success: true, token: response.data.token };
  } catch (error: any) {
    return { success: false, message: 'Invalid credentials' };
  }
}
