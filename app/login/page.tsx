import { Header } from "@/components/layout/header";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-8">
        <LoginForm />
      </main>
    </div>
  );
}