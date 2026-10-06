import { getPageContent } from '@/lib/content'
import { VolunteerForm } from './VolunteerForm'

export default async function VolunteerPage() {
  const content = await getPageContent('volunteerPage')
  return <VolunteerForm content={content} />
}
