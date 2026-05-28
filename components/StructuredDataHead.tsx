'use client'

import { usePathname } from 'next/navigation'
import {
  buildBreadcrumbListSchema,
  shouldRenderBreadcrumbSchema,
} from '@/lib/breadcrumbs'
import {
  buildToolPageSchema,
} from '@/lib/tool-page-schema'
import {
  buildOrganizationSchema,
  buildWebsiteSchema,
  serializeJsonLd,
} from '@/lib/site-schema'

function JsonLdScript({
  id,
  schema,
}: {
  id: string
  schema: Record<string, unknown>
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(schema),
      }}
    />
  )
}

export default function StructuredDataHead() {
  const pathname = usePathname()

  const schemas = [
    <JsonLdScript
      key="organization"
      id="organization-schema"
      schema={buildOrganizationSchema()}
    />,
    <JsonLdScript
      key="website"
      id="website-schema"
      schema={buildWebsiteSchema()}
    />,
  ]

  if (shouldRenderBreadcrumbSchema(pathname)) {
    schemas.push(
      <JsonLdScript
        key="breadcrumb"
        id="breadcrumb-schema"
        schema={buildBreadcrumbListSchema(pathname)}
      />
    )
  }

  const toolPageSchema = buildToolPageSchema(pathname)

  if (toolPageSchema) {
    schemas.push(
      <JsonLdScript
        key="tool-page"
        id="tool-page-schema"
        schema={toolPageSchema}
      />
    )
  }

  return <>{schemas}</>
}
