"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  calculateSalary,
  DeductionRates,
  Employee,
  generateEmployeeId,
  getDefaultDeductionRates,
} from "@/lib/utils/calculations";

interface EmployeeFormProps {
  onAddEmployee: (employee: Employee) => void;
}

export function EmployeeForm({ onAddEmployee }: EmployeeFormProps) {
  const [fullName, setFullName] = useState("");
  const [grossSalary, setGrossSalary] = useState("");
  const [deductionRates, setDeductionRates] = useState<DeductionRates>(
    getDefaultDeductionRates()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !grossSalary) return;
    
    const parsedSalary = parseFloat(grossSalary);
    if (isNaN(parsedSalary) || parsedSalary <= 0) return;
    
    const results = calculateSalary(parsedSalary, deductionRates);
    
    const newEmployee: Employee = {
      id: generateEmployeeId(),
      fullName,
      grossSalary: parsedSalary,
      deductionRates: { ...deductionRates },
      results,
    };
    
    onAddEmployee(newEmployee);
    setFullName("");
    setGrossSalary("");
    setDeductionRates(getDefaultDeductionRates());
  };

  const handleRateChange = (
    type: keyof DeductionRates,
    value: string
  ) => {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue) || parsedValue < 0) return;
    
    setDeductionRates((prev) => ({
      ...prev,
      [type]: parsedValue,
    }));
  };

  return (
    <Card>
      <CardHeader className="pb-4 md:pb-6">
        <CardTitle className="text-lg md:text-xl">Işgär goşmak</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Doly Ady</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="grossSalary">Doly Aýlyk</Label>
            <Input
              id="grossSalary"
              type="number"
              value={grossSalary}
              onChange={(e) => setGrossSalary(e.target.value)}
              placeholder="5000"
              min="0"
              step="100"
              required
              className="w-full"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor="taxRate">Salgyt Möçberi (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={deductionRates.tax}
                onChange={(e) => handleRateChange("tax", e.target.value)}
                min="0"
                max="100"
                step="0.1"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="retirementRate">Pensiýa Üçin (%)</Label>
              <Input
                id="retirementRate"
                type="number"
                value={deductionRates.retirement}
                onChange={(e) => handleRateChange("retirement", e.target.value)}
                min="0"
                max="100"
                step="0.1"
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="insuranceRate">Ätiýaçlandyryş Üçin (%)</Label>
              <Input
                id="insuranceRate"
                type="number"
                value={deductionRates.insurance}
                onChange={(e) => handleRateChange("insurance", e.target.value)}
                min="0"
                max="100"
                step="0.1"
                className="w-full"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            Işgär goşmak
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}