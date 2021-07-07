import React from 'react'

import Typography from '@material-ui/core/Typography'
import Container from '../muiComponent/Container'
import Footer from '../footer/Footer'

import ContactForm from './ContactForm'




function Contact() {

  return (
    <Container 
      id="contact"
      >
      <Typography 
        variant="h3"
      >
        contact
      </Typography>
      <Typography
        color="primary"
        variant="body1"
      >
        Have a question or want to work together? 
      </Typography>
      <ContactForm />
      <Footer />
    </Container>
  )
}

export default Contact
