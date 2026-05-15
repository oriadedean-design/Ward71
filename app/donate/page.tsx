import { client } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import DonateClient from './DonateClient'

export default async function DonatePage() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ candidatePhoto }`)
  const heroImageUrl = settings?.candidatePhoto
    ? urlFor(settings.candidatePhoto).width(224).height(224).fit('crop').url()
    : null

  return <DonateClient heroImageUrl={heroImageUrl} />
}
