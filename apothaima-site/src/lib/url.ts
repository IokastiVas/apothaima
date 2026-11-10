/** Όλα τα εσωτερικά links περνάνε από εδώ, ώστε να αλλάζει εύκολα η βάση αν χρειαστεί. */
export function url(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
