"use client";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Employee } from "@/lib/utils/calculations";
import { formatCurrency } from "@/lib/utils/format";

interface EmployeeListProps {
  employees: Employee[];
  onRemoveEmployee: (id: string) => void;
  onViewDetails: (employee: Employee) => void;
}

export function EmployeeList({ 
  employees, 
  onRemoveEmployee,
  onViewDetails
}: EmployeeListProps) {
  if (employees.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Henize işgäri goşulman. Hasaplamany görmek üçin işgäri goşuň.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Işgärler</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ady</TableHead>
                <TableHead className="text-right">Doly</TableHead>
                <TableHead className="text-right">Alýany</TableHead>
                <TableHead className="text-right">Salgytlar</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.fullName}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(employee.grossSalary)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(employee.results.net)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(employee.results.totalDeductions)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewDetails(employee)}
                      >
                        Detallar
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onRemoveEmployee(employee.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Öçürmek</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}