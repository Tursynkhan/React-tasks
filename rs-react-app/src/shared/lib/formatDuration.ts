export function formatDuration(minutes?: number) {
  if (!minutes || minutes <= 0) return '';
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  if (!hour) return `${minute}min`;
  if (!minute) return `${hour}h`;
  return `${hour}h ${minute}min`;
}
