import { sanityFetch } from '@/sanity/live';
import { mergeContent } from '@/lib/content';
import { DONATION_GOAL_ID, donationGoalDefaults } from '@/lib/content/donationGoal';

// Online donations are summed from the records the Stripe webhook writes, so
// the total can't drift or double-count, and refunds drop out automatically.
// <SanityLive /> refreshes this as soon as a new record is created.
const PROGRESS_QUERY = `{
  "goal": *[_id == $goalId][0],
  "online": math::sum(*[_type == "donationRecord" && status == "completed"].amount),
  "onlineDonors": count(*[_type == "donationRecord" && status == "completed"])
}`;

export async function getDonationProgress() {
  let goal = donationGoalDefaults;
  let online = 0;
  let onlineDonors = 0;
  try {
    const { data } = await sanityFetch({ query: PROGRESS_QUERY, params: { goalId: DONATION_GOAL_ID } });
    const result = data as { goal?: unknown; online?: number | null; onlineDonors?: number | null } | null;
    goal = mergeContent(donationGoalDefaults, result?.goal);
    online = result?.online ?? 0;
    onlineDonors = result?.onlineDonors ?? 0;
  } catch (error) {
    console.error('Failed to load donation progress:', error);
  }

  const raised = Math.round((online + (goal.offlineAmount || 0)) * 100) / 100;
  const target = goal.targetAmount > 0 ? goal.targetAmount : donationGoalDefaults.targetAmount;
  return {
    raised,
    target,
    donors: onlineDonors + (goal.offlineDonorCount || 0),
    percentage: Math.min(100, Math.max(0, (raised / target) * 100)),
    showDonorCount: goal.showDonorCount,
    text: goal.text,
  };
}
