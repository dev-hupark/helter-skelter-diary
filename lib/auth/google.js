import { client } from '/lib/supabaseClient'

const signInWithGoogle = async () => {
  await client.auth.signInWithOAuth({
    provider: 'google',
  })
}

const signOut = async () => {
  await client.auth.signOut()
  location.href = '/'
}

export {
  signInWithGoogle,
  signOut
}