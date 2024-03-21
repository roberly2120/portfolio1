import { Button, Heading, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function ProjectsButton() {
    return (
        <>
            <VStack>
                <Heading mb="10px">
                    ~ Projects ~
                </Heading>
                <Link to='/projects' style={{ textDecoration: 'none' }}>
                    <Button size="lg" colorScheme='green' href="/projects">
                        View Projects
                    </Button>
                </Link>
            </VStack>
        </>
    )
}