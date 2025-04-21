export interface FormData {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  responsible: string;
  status: 'к выполнению' | 'выполняется' | 'выполнена' | 'отменена'; 
}
