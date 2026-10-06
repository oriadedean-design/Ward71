import { sanityFetch } from '@/sanity/live';
import { mergeContent } from '@/lib/content';
import { DONATION_GOAL_ID, donationGoalDefaults } from '@/lib/content/donationGoal';

export async function getDonationProgress() {
  let goal = donationGoalDefaults;
  try {
    const { data } = await sanityFetch({ query: `*[_id == $goalId][0]`, params: { goalId: DONATION_GOAL_ID } });
    goal = mergeContent(donationGoalDefaults, data);
  } catch (error) {
    console.error('Failed to load donation goal:', error);
  }

  const raised = Math.max(0, Number(goal.raisedAmount) || 0);
  const target = goal.targetAmount > 0 ? goal.targetAmount : donationGoalDefaults.targetAmount;
  return {
    raised,
    target,
    donors: Math.max(0, Number(goal.donorCount) || 0),
    percentage: Math.min(100, (raised / target) * 100),
    showDonorCount: goal.showDonorCount,
    text: goal.text,
  };
}
