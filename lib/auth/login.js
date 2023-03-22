import { client } from '/lib/supabaseClient'
import {useCallback, useEffect, useState} from 'react'

const signInWithSNS = async (providerId) => {
  await client.auth.signInWithOAuth({
    provider: providerId,
  })
}

const signOut = async () => {
  await client.auth.signOut()
  location.href = '/'
}

const useSession = () => {
  const [ session, setSession ] = useState({})

  useEffect(() => {
    void refresh()
  }, [])

  const refresh = useCallback(async () => {
    const { data } = await client.auth.getSession()
    setSession(data.session)
  }, [])

  return session
}

export {
  signInWithSNS,
  signOut,
  useSession,
}