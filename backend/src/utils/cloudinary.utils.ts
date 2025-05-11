export function extractPublicIdFromUrl(url: string): string {
  const parts = url.split('/');
  const fileWithExt = parts.pop();
  const folder = parts.pop();
  const fileName = fileWithExt?.split('.')[0];
  return `${folder}/${fileName}`;
}
