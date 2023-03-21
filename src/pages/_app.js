import React from 'react'

const CustomApp = ({ Component, pageProps }) => (
  /*<UserProvider>
    <Layout>*/
  <>
    <h1>layout</h1>
    <Component {...pageProps} />
  </>
    /*</Layout>
  </UserProvider>*/
)

export default CustomApp