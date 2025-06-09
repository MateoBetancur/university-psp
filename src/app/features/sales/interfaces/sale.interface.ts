export interface Sale {
  id: string; // ID único para poder eliminar después si quieres
  employeeName: string;
  role: string;
  amount: number;
  date: string; // formato ISO string
}
