"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SalaryResult,
  DeductionRates,
} from "@/lib/utils/calculations";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatPercentage } from "@/lib/utils/format";

interface SalaryDetailsProps {
  results: SalaryResult;
  deductionRates: DeductionRates;
  name?: string;
}

export function SalaryDetails({
  results,
  deductionRates,
  name = "Salary Breakdown",
}: SalaryDetailsProps) {
  const netPercentage = (results.net / results.gross) * 100;
  const taxPercentage = (results.tax / results.gross) * 100;
  const retirementPercentage = (results.retirement / results.gross) * 100;
  const insurancePercentage = (results.insurance / results.gross) * 100;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Doly Aýlyk</span>
              <span className="font-medium">{formatCurrency(results.gross)}</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Tutumlar</h4>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Salgyt ({formatPercentage(deductionRates.tax)})</span>
                <span className="font-medium">{formatCurrency(results.tax)}</span>
              </div>
              <Progress value={taxPercentage} className="h-2 bg-muted" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pensiýa ({formatPercentage(deductionRates.retirement)})</span>
                <span className="font-medium">{formatCurrency(results.retirement)}</span>
              </div>
              <Progress value={retirementPercentage} className="h-2 bg-muted" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ätiýaçlandyryş ({formatPercentage(deductionRates.insurance)})</span>
                <span className="font-medium">{formatCurrency(results.insurance)}</span>
              </div>
              <Progress value={insurancePercentage} className="h-2 bg-muted" />
            </div>
            
            <div className="pt-2 border-t">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Ähli Tutumlar</span>
                <span className="font-medium">{formatCurrency(results.totalDeductions)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 pt-2 border-t">
            <div className="flex justify-between">
              <span className="font-medium">Hakyky Gazanç</span>
              <span className="font-bold text-lg">
                {formatCurrency(results.net)}
              </span>
            </div>
            <Progress value={netPercentage} className="h-3" />
            <p className="text-xs text-muted-foreground text-right">
              {formatPercentage(netPercentage)} Doly hakda
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}