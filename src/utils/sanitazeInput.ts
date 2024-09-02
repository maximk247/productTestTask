// Убирает лишние пробелы
export function sanitizeInput(input: string): string {
  return input.replace(/^\s+/, '').replace(/\s{2,}/g, ' ');
}
