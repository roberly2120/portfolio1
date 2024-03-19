import ProjectCards from './ProjectCards';
import { Heading, VStack, Form } from '@chakra-ui/react';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../State';
import { updateDocument } from '../Data/firestoreOperations';
import { updateProject } from '../Data/serverFunctions';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    useDisclosure
  } from '@chakra-ui/react'

export default function Projects () {
    const { globalState, setGlobalState } = useContext(AppContext);
    const { projectToEdit, shouldFetch } = globalState;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        if (clickCount === 5) {
            setClickCount(0);
            setGlobalState({ ...globalState, adminModalOpen: true });
        }
    }, [clickCount, setGlobalState])

    const cancelClose = () => {
        onClose();
        setGlobalState({ ...globalState, projectToEdit: null });
    }
    const handleHeadingClick = () => {
        setClickCount(prevCount => prevCount + 1);
    }
    const handleProjectUpdate = async (project) => {
        await updateProject(project);
        const updatedProjects = globalState.projects.map(project => {
            if (project.id === projectToEdit.id) {
                return projectToEdit;
            }
            return project;
        });
        setGlobalState(prevState => ({ ...prevState, projectToEdit: null, shouldFetch: true }));
    }
    return (
        <>
        <VStack>
            <Heading as='h1' size='2xl' mb='20px' mt="20px" onClick={handleHeadingClick}>Projects</Heading>
            <Modal isOpen={projectToEdit != null} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
        <ModalHeader>Edit Project</ModalHeader>
        <ModalCloseButton onClick={() => cancelClose()}/>
        <ModalBody>
            <form>
                <VStack spacing={4}>
                    <FormControl id="title">
                        <FormLabel>Title</FormLabel>
                        <Input type="text" value={projectToEdit?.title ?? ''} onChange={e => setGlobalState({ ...globalState, projectToEdit:({ ...projectToEdit, title: e.target.value })})} />
                    </FormControl>
                    <FormControl id="description">
                        <FormLabel>Description</FormLabel>
                        <Textarea value={projectToEdit?.description ?? ''} onChange={e => setGlobalState({ ...globalState, projectToEdit:({ ...projectToEdit, description: e.target.value })})} />
                    </FormControl>
                    <FormControl id="image">
                        <FormLabel>Image URL</FormLabel>
                        <Input type="text" value={projectToEdit?.image ?? ''} onChange={e => setGlobalState({ ...globalState, projectToEdit:({ ...projectToEdit, image: e.target.value })})} />
                    </FormControl>
                    <FormControl id="repository">
                        <FormLabel>Repository URL</FormLabel>
                        <Input type="text" value={projectToEdit?.repository ?? ''} onChange={e => setGlobalState({ ...globalState, projectToEdit:({ ...projectToEdit, repository: e.target.value })})} />
                    </FormControl>
                    <FormControl id="deployed_url">
                        <FormLabel>Deployed URL</FormLabel>
                        <Input type="text" value={projectToEdit?.deployed_url ?? ''} onChange={e => setGlobalState({ ...globalState, projectToEdit:({ ...projectToEdit, deployed_url: e.target.value })})} />
                    </FormControl>
                </VStack>
            </form>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleProjectUpdate(projectToEdit)}>
                Save Changes
            </Button>
            <Button variant="ghost" onClick={() => cancelClose()}>Cancel</Button>
        </ModalFooter>
    </ModalContent>
</Modal>

            <ProjectCards />
            </VStack>
        </>
    )
}