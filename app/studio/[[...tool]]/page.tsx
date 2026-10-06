'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-static'

// The Studio sits inside the site's root layout; this fixed layer gives it the
// whole screen so the site header, banners and footer don't crowd the editor.
export default function StudioPage() {
  return (
    <div className="fixed inset-0 z-[100] bg-white">
      <NextStudio config={config} />
    </div>
  )
}
