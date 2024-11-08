import React from "react";


export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-gray-100">
      <tr>{children}</tr>
    </thead>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}


export function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b">{children}</tr>;
}


interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number; 
}

export const TableCell: React.FC<TableCellProps> = ({ children, className, colSpan }) => {
  return (
    <td className={className} colSpan={colSpan}>
      {children}
    </td>
  );
};