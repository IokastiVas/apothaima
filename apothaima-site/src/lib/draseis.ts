import { getCollection, type CollectionEntry } from 'astro:content';

export type Drasi = CollectionEntry<'draseis'>;

const MONTHS = ['Ιανουαρίου','Φεβρουαρίου','Μαρτίου','Απριλίου','Μαΐου','Ιουνίου','Ιουλίου','Αυγούστου','Σεπτεμβρίου','Οκτωβρίου','Νοεμβρίου','Δεκεμβρίου'];
const MONTHS_SHORT = ['ΙΑΝ','ΦΕΒ','ΜΑΡ','ΑΠΡ','ΜΑΪ','ΙΟΥΝ','ΙΟΥΛ','ΑΥΓ','ΣΕΠ','ΟΚΤ','ΝΟΕ','ΔΕΚ'];

export const TAG_LABEL: Record<string, string> = { aimodosia: 'Αιμοδοσία', allileggyi: 'Αλληλεγγύη' };

/** Όλες οι δράσεις, νεότερες πρώτα. */
export async function getDraseis(): Promise<Drasi[]> {
  const all = await getCollection('draseis');
  return all.sort((a, b) => b.data.startDate.getTime() - a.data.startDate.getTime());
}

function endOf(d: Drasi) {
  return d.data.endDate ?? d.data.startDate;
}

/** Χωρίζει σε επόμενες (σήμερα ή μετά) και παλιές. Υπολογίζεται στο build. */
export async function splitDraseis() {
  const all = await getDraseis();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcoming = all.filter((d) => endOf(d) >= today).reverse();
  const past = all.filter((d) => endOf(d) < today);
  return { all, upcoming, next: upcoming[0] ?? null, past };
}

export function formatDate(d: Drasi) {
  const s = d.data.startDate;
  const e = d.data.endDate;
  if (e && e.getTime() !== s.getTime()) {
    if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
      return `${s.getDate()}–${e.getDate()} ${MONTHS[s.getMonth()]} ${s.getFullYear()}`;
    }
    return `${s.getDate()} ${MONTHS[s.getMonth()]} – ${e.getDate()} ${MONTHS[e.getMonth()]} ${e.getFullYear()}`;
  }
  return `${s.getDate()} ${MONTHS[s.getMonth()]} ${s.getFullYear()}`;
}

export function dayMonth(d: Drasi) {
  return { day: d.data.startDate.getDate(), month: MONTHS_SHORT[d.data.startDate.getMonth()] };
}

export function groupByYear(list: Drasi[]) {
  const map = new Map<number, Drasi[]>();
  for (const d of list) {
    const y = d.data.startDate.getFullYear();
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(d);
  }
  return [...map.entries()];
}

export function cardTitle(d: Drasi) {
  return d.data.shortTitle ?? d.data.title;
}

export function altFor(d: Drasi) {
  return d.data.alt ?? `Φωτογραφία από τη δράση: ${cardTitle(d)}`;
}
