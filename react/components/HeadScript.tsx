import React from 'react'
import { Helmet } from 'react-helmet'
import { canUseDOM } from 'vtex.render-runtime'

export const HeadScript: React.FC = () =>
{
  if (!canUseDOM) { return null }

  return (
    <Helmet>
      <script
        src="https://cdn.roomvo.com/static/scripts/b2b/ceramicaitalia.js"
        type="text/javascript"
        async
      />
    </Helmet>
    )
}
