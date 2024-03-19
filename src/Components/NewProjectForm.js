import React, { useState, useEffect } from "react";
import { db } from "../Data/firebaseConfig";
import { readDocument, createDocument } from "../Data/firestoreOperations";
import { Box, Heading, Input, Button, Center, Switch, Stack, Textarea} from "@chakra-ui/react";
import bcrypt from "bcryptjs";

export default function Form() {
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isDope, setIsDope] = useState(false);
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        image: '',
        repository: '',
        deployed_url: '',
    });


    useEffect(() => {
        return () => {
            setIsPasswordValid(false)
            setPassword('')
        }
    }, [])
    // hashed password stored in the database
    // password doc id is 1234 which is really stupid

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDopeSwitchChange = () => {
        setIsDope(prev => !prev);
    }
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        const saltRounds = 8;
        // const hashedPassword = await bcrypt.hash(password, saltRounds);

        const storedHashedPassword = await readDocument('passwords', '1234')

        if (await bcrypt.compare(password, storedHashedPassword.password)) {
            setIsPasswordValid(true);
        } else {
            alert('Incorrect password');
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createDocument('projects', formValues);
            // console.log('Document written with ID: ', response.id);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    }
    
    return (
        <>
            {isPasswordValid ? (
                <Center>
                    <Stack spacing={3} width='400px'>
                        <Input 
                            placeholder='Project Title' 
                            size='md'
                            name='title'
                            value={formValues.title}
                            onChange={handleInputChange}
                        />
                        <Textarea 
                            placeholder='Description' 
                            size='md'
                            name='description'
                            value={formValues.description}
                            onChange={handleInputChange}
                        />
                        <Input 
                            placeholder='Image URL' 
                            size='md'
                            name='image'
                            value={formValues.imageUrl}
                            onChange={handleInputChange} 
                        />
                        <Input 
                            placeholder='Github Repo' 
                            size='md'
                            name='repository'
                            value={formValues.githubRepo}
                            onChange={handleInputChange} 
                        />
                        <Input 
                            placeholder='Deployed URL' 
                            size='md'
                            name='deployed_url'
                            value={formValues.deployedUrl}
                            onChange={handleInputChange} 
                        />
                        <Switch size='lg' colorScheme='teal' onChange={handleDopeSwitchChange} isChecked={isDope}>Is this project dope?</Switch>
                        <Button colorScheme='teal' size='md' isDisabled={!isDope} onClick={handleSubmit}>Submit</Button>
                    </Stack>
                    
                </Center>
                // is this project dope switch. if false, cannot submit form
            ) : (
                <Center>
                    <form onSubmit={handlePasswordSubmit}>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            mb='10px'
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Center>
            )}
        </>
    );
}
