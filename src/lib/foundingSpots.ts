import { getSupabase } from './portfolio/supabase';

/**
 * Founding-member spots left, via the founding_spots_remaining RPC (anon-key,
 * SECURITY DEFINER, returns a single clamped integer — never row data).
 * Returns null on any failure so callers omit the counter entirely instead of
 * showing a fake or fallback number.
 */
export async function fetchFoundingSpotsRemaining(): Promise<number | null> {
  try {
    const { data, error } = await getSupabase().rpc('founding_spots_remaining');
    if (error) return null;
    return typeof data === 'number' && Number.isInteger(data) && data >= 0 ? data : null;
  } catch {
    return null;
  }
}
