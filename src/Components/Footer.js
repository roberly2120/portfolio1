import React from 'react';
import { Box, Text, VStack, Link } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
      <Box bg="purple.400" w="100%" p={4} color="white">
          <VStack justifyContent="start">
            <Text>Ryan Oberly</Text>
            <Link href="mailto:ryanjoberly@gmail.com" color="white">ryanjoberly@gmail.com</Link>
            <Link href="https://github.com/roberly2120" isExternal>
              <FaGithub size="24px" />
            </Link>
            <Link href="https://linkedin.com/in/ryan-oberly" isExternal>
              <FaLinkedin size="24px" />
            </Link>
          </VStack>
      </Box>
    );
  }