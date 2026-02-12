import { type Author } from '@/entities/course/model/types';

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} hours`;
}

export function formatCreationDate(dateString: string): string {
  const [day, month, year] = dateString.split('/');
  return `${day}.${month}.${year}`;
}

export function formatAuthors(authors: Author[]): string {
  if (!authors || authors.length === 0) return 'No authors';

  return authors
    .map((author) => (typeof author === 'string' ? author : author.name))
    .join(', ');
}

export function formatDateToString(date: Date = new Date()): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
