import styled from '@emotion/styled'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'
import Container from 'components/layout/Container'

const Wrapper = styled.div`
`

const Layout = ({ children }) => (
  <Wrapper>
    <Header />
    <Container>
      {children}
    </Container>
    <Footer />
  </Wrapper>
)

export default Layout
