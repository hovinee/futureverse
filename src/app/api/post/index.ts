import { getBaseUrl } from '@/utils/url'

export const signCourse = async (uid: string): Promise<Response> => {
  const customHeaders = new Headers()
  customHeaders.append(
    'X-Custom-Auth-Key',
    process.env.NEXT_PUBLIC_WORKER_AUTH_KEY!,
  )
  customHeaders.append('Content-Type', 'application/json')
  return await fetch(`${getBaseUrl}/api/post/sign-course?uid=${uid}`, {
    method: 'POST',
    headers: customHeaders,
    cache: 'no-cache',
  })
}

export const updateCourse = async (
  uid: string,
  totalTime: number,
  currentTime: number,
): Promise<Response> => {
  const customHeaders = new Headers()
  customHeaders.append(
    'X-Custom-Auth-Key',
    process.env.NEXT_PUBLIC_WORKER_AUTH_KEY!,
  )
  customHeaders.append('Content-Type', 'application/json')
  return await fetch(`${getBaseUrl}/api/post/update-course`, {
    method: 'POST',
    headers: customHeaders,
    cache: 'no-cache',
    body: JSON.stringify({
      uid: uid,
      totalTime: totalTime,
      currentTime: currentTime,
    }),
  })
}
