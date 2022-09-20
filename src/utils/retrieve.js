// utils -> retrieve

import fetch from 'cross-fetch'

export default async (url, opts=null) => {
  const res = await fetch(url, {
    agent: opts?.agent || null,
    headers: {
      'user-agent': opts.headers || 'Mozilla/5.0 (X11; Linux x86_64; rv:104.0) Gecko/20100101 Firefox/104.0'
    }
  })
  const status = res.status
  if (status >= 400) {
    throw new Error(`Request failed with error code ${status}`)
  }
  const contentType = res.headers.get('content-type') || 'text/html'
  if (!contentType.includes('text/')) {
    throw new Error(`Content type must be "text/html", not "${contentType}"`)
  }
  return res.text()
}
