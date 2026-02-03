import { mockedAuthorsList } from './mockCoursesList';

export function getAuthorNames(authorIds: string[]): string[] {
  return authorIds.map((id) => {
    const author = mockedAuthorsList.find((author) => author.id === id);
    return author ? author.name : 'Author';
  });
}
