import { collection, getDocs, query, where, documentId } from 'firebase/firestore';
import { db } from '../firebase';

const CACHE = new Map(); // id -> doc data
const chunk = (arr, n) => arr.reduce((a, _, i) => (i % n ? a : a.concat([arr.slice(i, i + n)])), []);

export async function fetchPlayersByIds(ids) {
  if (!ids?.length) return [];
  const missing = ids.filter(id => !CACHE.has(id));
  if (missing.length) {
    const col = collection(db, 'players');
    const chunks = chunk(missing, 10); // Firestore 'in' limit = 10
    for (const c of chunks) {
      const q = query(col, where(documentId(), 'in', c));
      const snap = await getDocs(q);
      snap.docs.forEach(d => CACHE.set(d.id, { id: d.id, ...d.data() }));
    }
  }
  // preserve incoming order
  return ids.map(id => CACHE.get(id)).filter(Boolean);
}

/**
 * Clear the player cache
 */
export function clearPlayerCache() {
  CACHE.clear();
}
