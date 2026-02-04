export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} hours`;
}

export function formatCreationDate(dateString: string): string {
  const [day, month, year] = dateString.split('/');
  return `${day}.${month}.${year}`;
}
