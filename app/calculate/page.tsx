"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { useAuth } from "@/components/providers/auth-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeForm } from "@/components/calculator/employee-form";
import { EmployeeList } from "@/components/calculator/employee-list";
import { FreelancerForm } from "@/components/calculator/freelancer-form";
import { SalaryDetails } from "@/components/calculator/salary-details";
import { Employee } from "@/lib/utils/calculations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CalculatePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);
  
  const handleAddEmployee = (employee: Employee) => {
    setEmployees((prev) => [...prev, employee]);
  };
  
  const handleRemoveEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((employee) => employee.id !== id));
  };
  
  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
  };
  
  const closeDialog = () => {
    setSelectedEmployee(null);
  };
  
  if (isLoading) {
    return <div>Ýüklenýär...</div>;
  }
  
  if (!user) {
    return null;
  }
  
  const activeTab = user.role;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Aýlyk Hasaplaýjysy</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Maaş kesintilerini hasaplaň we detallaýyn bölünişikleri görmek
          </p>
        </div>
        
        <Tabs defaultValue={activeTab} className="mb-6 md:mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="company">Kompaniýa</TabsTrigger>
            <TabsTrigger value="freelancer">Erkin Işçi</TabsTrigger>
          </TabsList>
          
          <TabsContent value="company" className="pt-4 md:pt-6">
            <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <EmployeeForm onAddEmployee={handleAddEmployee} />
              </div>
              
              <div className="lg:col-span-2">
                <EmployeeList
                  employees={employees}
                  onRemoveEmployee={handleRemoveEmployee}
                  onViewDetails={handleViewDetails}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="freelancer" className="pt-4 md:pt-6">
            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
              <FreelancerForm />
            </div>
          </TabsContent>
        </Tabs>
        
        <Dialog open={!!selectedEmployee} onOpenChange={() => closeDialog()}>
          <DialogContent className="max-w-[90vw] md:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedEmployee?.fullName || "Employee Details"}
              </DialogTitle>
            </DialogHeader>
            {selectedEmployee && (
              <SalaryDetails
                results={selectedEmployee.results}
                deductionRates={selectedEmployee.deductionRates}
                name="Salary Breakdown"
              />
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}