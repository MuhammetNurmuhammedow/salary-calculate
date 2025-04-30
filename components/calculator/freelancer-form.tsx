"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { SalaryResult, calculateSalary, DeductionRates, getDefaultDeductionRates } from "@/lib/utils/calculations";
import { SalaryDetails } from "@/components/calculator/salary-details";

export function FreelancerForm() {
  const [grossIncome, setGrossIncome] = useState(5000);
  const [deductionRates, setDeductionRates] = useState<DeductionRates>(
    getDefaultDeductionRates()
  );
  const [results, setResults] = useState<SalaryResult | null>(null);

  useEffect(() => {
    if (grossIncome > 0) {
      const newResults = calculateSalary(grossIncome, deductionRates);
      setResults(newResults);
    }
  }, [grossIncome, deductionRates]);

  const handleIncomeChange = (value: string) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setGrossIncome(parsedValue);
    }
  };

  const handleRateChange = (type: keyof DeductionRates, value: number[]) => {
    setDeductionRates((prev) => ({
      ...prev,
      [type]: value[0],
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Erkin Işçi Gelir Hasaplaýjysy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="grossIncome">Doly Aýlyk</Label>
            <Input
              id="grossIncome"
              type="number"
              value={grossIncome}
              onChange={(e) => handleIncomeChange(e.target.value)}
              min="0"
              step="100"
            />
          </div>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="taxRate">Salgyt Mukdary</Label>
                <span className="text-sm">{deductionRates.tax}%</span>
              </div>
              <Slider
                id="taxRate"
                min={0}
                max={40}
                step={0.5}
                value={[deductionRates.tax]}
                onValueChange={(value) => handleRateChange("tax", value)}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="retirementRate">Pensiýa Mukdary</Label>
                <span className="text-sm">{deductionRates.retirement}%</span>
              </div>
              <Slider
                id="retirementRate"
                min={0}
                max={30}
                step={0.5}
                value={[deductionRates.retirement]}
                onValueChange={(value) => handleRateChange("retirement", value)}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="insuranceRate">Ätiýaçlandyryş Mukdary</Label>
                <span className="text-sm">{deductionRates.insurance}%</span>
              </div>
              <Slider
                id="insuranceRate"
                min={0}
                max={20}
                step={0.5}
                value={[deductionRates.insurance]}
                onValueChange={(value) => handleRateChange("insurance", value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {results && (
        <SalaryDetails
          results={results}
          deductionRates={deductionRates}
          name="Freelancer Income"
        />
      )}
    </div>
  );
}