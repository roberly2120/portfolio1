import React from 'react';
import Intro from './HomePage Components/Intro';
import Skills from './HomePage Components/Skills';
import ProjectsButton from './HomePage Components/ProjectsButton';

import { Center, VStack, StackDivider, Text, Box } from '@chakra-ui/react';
import { Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";

export default function HomePage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const mb = "20px"
    const mt = "20px"

    return (
        <div>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay>
                    <DrawerContent bg="gray.50">
                        <DrawerCloseButton />
                        <DrawerHeader textAlign="center">Contact Info</DrawerHeader>
                        <DrawerBody>
                            <Box>
                                <VStack divider={<StackDivider borderColor="gray.300"/>}>
                                    <Text fontSize={20}>
                                        <a href="mailto:ryanjoberly@gmail.com">RyanjOberly@Gmail.com</a>
                                    </Text>
                                    <Text fontSize={20}>
                                        (303) - 547 - 0124
                                    </Text>
                                    <Button colorScheme="linkedin">
                                        <a href="https://www.linkedin.com/in/ryan-oberly/" target="_blank">LinkedIn</a>
                                    </Button>
                                    <Button colorScheme="github">
                                        <a href="https://github.com/roberly2120" target="_blank">Github</a>
                                    </Button>
                                </VStack>
                            </Box>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
            <Center mt="50px" mb="50px">
                <VStack divider={<StackDivider borderColor="gray.300" />}>
                    <Box mb={mb} mt={mt}>
                        <Intro drawerOpen={onOpen} />
                    </Box>
                    <Box mb={mb} mt={mt}>
                        <Skills />
                    </Box>
                    <Box mb={mb} mt={mt}>
                        <ProjectsButton />
                    </Box>
                </VStack>
            </Center>
        </div>
    )
}