import React, {useState} from 'react'
import styled from '@emotion/styled'
import 'react-day-picker/dist/style.css'
import CustomDayPiker from 'components/ui/CustomDayPiker'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Index = () => {
  const [selected, setSelected] = useState(new Date())
  return (
    <Wrapper>
      <CustomDayPiker />
    </Wrapper>
  )
}

export default Index