import { getPageContent } from '@/lib/content'
import { PetitionSection } from '@/components/petition/PetitionWidget';
import { VolunteerForm } from './VolunteerForm'

export default async function VolunteerPage() {
  const content = await getPageContent('volunteerPage')
  return (
    <>
      <VolunteerForm content={content} />
      <PetitionSection className="pb-14" />
    </>
  )
}
