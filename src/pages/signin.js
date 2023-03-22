import Container from 'components/layout/Container'
import { signInWithSNS } from '/lib/auth/login'

const Signin = () => (
  <Container>
    <button onClick={() => signInWithSNS('google')}>구글</button>
  </Container>
)

export default Signin
