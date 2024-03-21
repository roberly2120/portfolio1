import React from 'react';
import { Box, Text, HStack, VStack, Image, Heading, Button, useBreakpointValue } from '@chakra-ui/react';

export default function Intro(props) {
    const { drawerOpen } = props;
    const imageSize = useBreakpointValue({ base: "150px", md: "250px"});

    return (
        
        <Box>
            <HStack spacing={50}>
                <VStack>
                    <Heading>
                        Hi, I'm Ryan!
                    </Heading>
                    <Text fontSize={20}>
                        Front-End Developer
                    </Text>
                    <Button size="lg" colorScheme="green" onClick={drawerOpen}>
                        Contact Info
                    </Button>
                </VStack>
                <Image src={process.env.PUBLIC_URL + '/headshot.jpg'} width="150px" h="auto" borderRadius="10px"/>
            </HStack>
        </Box>
    )

}