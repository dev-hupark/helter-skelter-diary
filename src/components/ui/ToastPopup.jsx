import React from 'react'
import * as Toast from '@radix-ui/react-toast'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const Provider = styled(Toast.Provider)`
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`

const Root = styled(Toast.Root)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 10px;
  display: grid;
  grid-template-areas: 'title action' 'description action';
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;
  
  &[data-state='open'] {
    animation: show 100ms ease-in;
    // animation: show 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  &[data-state='closed'] {
    animation: hide 100ms ease-in;
  }
  
  &[data-swipe='cancel'] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }
  
`

const Title = styled(Toast.Title)`
  grid-area: title;
  font-weight: 500;
  text-align: center;
  font-size: 15px;
`

const Viewport = styled(Toast.Viewport)`
  --viewport-padding: 25px;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
`
const ToastPopup = ({open, setOpen, message}) => (
  <Provider swipeDirection="right" duration={1500}>
    <Root className="ToastRoot" open={open} onOpenChange={setOpen}>
      <Title className="ToastTitle"> {message}</Title>
    </Root>
    <Viewport className="ToastViewport" />
  </Provider>
)

ToastPopup.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  message: PropTypes.string
}

export default ToastPopup