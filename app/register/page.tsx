import { Header } from "@/components/layout/header";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-8">
        <RegisterForm />
      </main>
    </div>
  );
}