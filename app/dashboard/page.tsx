"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { useAuth } from "@/components/providers/auth-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, UserCircle2 } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);
  
  if (isLoading) {
    return <div>Ýüklenýär...</div>;
  }
  
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Hoş geldiňiz, {user.firstName}!</h1>
          <p className="text-muted-foreground">
            Siz şu ýagdaýa girdiňiz {user.role}.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-card hover:bg-card/80 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                {user.role === "company" ? (
                  <>
                    <Building className="h-5 w-5" />
                    <span>Kompaniýalar Üçin</span>
                  </>
                ) : (
                  <>
                    <UserCircle2 className="h-5 w-5" />
                    <span>Erkin Işçiler Üçin</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {user.role === "company"
                  ? "Manage your employees' salaries and calculate deductions."
                  : "Calculate your income deductions as a self-employed individual."}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}