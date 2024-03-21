import React, { useContext } from 'react';
import { useMediaQuery, Card, Text, CardBody, CardFooter, Button, Stack, StackDivider, Box, Image, Heading, Flex } from '@chakra-ui/react';
import { AppContext } from '../State';
import { deleteProject } from '../Data/serverFunctions';


export default function ProjectCard(props) {
    const { title, description, image, repository, deployed_url, id } = props.project;
    const { globalState, setGlobalState } = useContext(AppContext);
    const { adminIsAuthorized, projectToEdit } = globalState;
    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

    const handleDelete = async (collectionName, docId) => {
        try {
            await deleteProject(collectionName, docId);
            const newProjects = globalState.projects.filter(project => project.id !== docId);
            setGlobalState({ ...globalState, projects: newProjects });
        } catch (error) {
            console.error("Error removing document: ", error);
            throw error;
        }
    }
    const handleFillProjectForm = (project) => {
        setGlobalState({ ...globalState, projectToEdit: project });
        console.log(projectToEdit)
    }

    return (
        <>
            <Card className='project-card' border="1px" borderColor="gray.400" w={isLargerThan768 ? "" : "90%"}>
                <CardBody>
                    <Stack divider={<StackDivider borderColor="gray.400" />} spacing={3}>
                        <Box>
                            <Heading size="md" textTransform='uppercase'>
                                {title}
                            </Heading>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Image
                                src={image}
                                alt={`image for ${title}`}
                                borderRadius='lg'
                                boxSize='200px'
                            />
                        </Box>
                        <Box h="90px">
                            <Text>
                                {description}
                            </Text>
                        </Box>
                        <CardFooter display="flex" flexDirection="column">
                            <Flex justify='space-evenly' width='100%' mb="10px">
                                <Button colorScheme="blue" onClick={() => window.open(repository)}>View Repository</Button>
                                <Button colorScheme="blue" onClick={() => window.open(deployed_url)}>View Deployed</Button>
                            </Flex>
                            {adminIsAuthorized &&
                                <Flex justify='space-evenly' width='100%'>
                                    <Button colorScheme="blue" onClick={() => handleFillProjectForm(props.project)}>Edit</Button>
                                    <Button colorScheme="red" onClick={() => handleDelete('projects', `${id}`)}>Delete</Button>
                                </Flex>
                            }
                        </CardFooter>
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}

