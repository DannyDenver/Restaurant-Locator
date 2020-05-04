export function cleanString(str: string) {
    return str.replace(/[^a-z0-9]/gi, '').replace(/\s+/g, '').toLowerCase();
  }

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1);
}