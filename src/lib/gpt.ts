import { cfWorkerUrl } from '@/utils/url'

export const connectToGPT = async (systemMsg: string, useMsg: string) => {
  const res = await fetch(`${cfWorkerUrl}/gpt`, {
    method: 'POST',
    body: JSON.stringify({
      systemMsg: systemMsg,
      userMsg: useMsg,
    }),
  })
  const data = await res.json()
  return data.choices[0].message.content
}
