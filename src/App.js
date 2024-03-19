import React, { useEffect, useState } from 'react';
import { AppProvider, AppContext } from './State';
import './App.css';
import Projects from './Components/Projects';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './Components/HomePage';
import { readDocument } from './Data/firestoreOperations';
import Form from './Components/NewProjectForm';
import bcrypt from 'bcryptjs';
import TestimonialPage from './Components/TestimonialPage';
import { generateTestimonial } from './OpenAI/testimonials';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Button, useDisclosure, Box, Flex } from "@chakra-ui/react";

function App() {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
}

function AppContent() {
  const { globalState, setGlobalState } = React.useContext(AppContext);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [passwordInput, setPasswordInput] = useState('');


  useEffect(() => {
    const fetchTestimonials = async () => {
      if (globalState.testimonials.length === 0) {
        try {
          await generateTestimonial(globalState, setGlobalState);
        } catch (error) {
          console.error("Error generating testimonial: ", error);
        }
      }
    }
    const timeoutId = setTimeout(fetchTestimonials, 1000); // Delay of 1 second

    return () => clearTimeout(timeoutId); // Clean up on unmount
  }, [setGlobalState])

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const storedHashedPassword = await readDocument('passwords', '1234')

    if (await bcrypt.compare(passwordInput, storedHashedPassword.password)) {
      setGlobalState({ ...globalState, adminIsAuthorized: true, adminModalOpen: false });
    } else {
      alert('Incorrect password');
    }
  }

  return (
    <Flex direction="column" minHeight="100vh" className="App">
      <Header />
      <Box flex="1">
        <Modal isOpen={globalState.adminModalOpen} onClose={() => setGlobalState({ ...globalState, adminModalOpen: false })}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Admin Login</ModalHeader>
            <Input
              type="text"
              placeholder="Enter Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <Button type="submit" onClick={handlePasswordSubmit}>Submit</Button>
            <ModalCloseButton />
          </ModalContent>
        </Modal>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          {/* <Route path='/about' element={<About />} /> */}
          {/* <Route path='/contact' element={<ContactPage />} /> */}
          <Route path='/newproject' element={<Form />} />
          <Route path='/testimonials' element={<TestimonialPage />} />
        </Routes>
      </Box>
      <Footer />
    </Flex>
  );
}

export default App;