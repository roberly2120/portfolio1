import { Stack, StackDivider, Box, Flex, Heading, Link, Menu, MenuButton, MenuItem, MenuList, Button, useMediaQuery } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const [clickCount, setClickCount] = useState(0);
    const navigate = useNavigate();
    const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
   
    useEffect(() => {
        if(clickCount === 5) {
            setClickCount(0);
            navigate('/newproject');
        }
    }, [clickCount, navigate])

    const handleHeadingClick = () => {
        setClickCount(prevCount => prevCount + 1)
    };
    
    const menu = (
        <Menu>
            <MenuButton as={Button} rightIcon={<HamburgerIcon boxSize="24px"/>} color="blue.200" size="lg" background="none"/>
            <MenuList>
                <Stack divider={<StackDivider borderColor="gray.300" />}>
                    <MenuItem justifyContent="center" color="black" onClick={() => navigate('/')}>Home</MenuItem>
                    <MenuItem justifyContent="center" color="black" onClick={() => navigate('/projects')}>Projects</MenuItem>
                    <MenuItem justifyContent="center" color="black" onClick={() => navigate('/testimonials')}>Testimonials</MenuItem>
                </Stack>
            </MenuList>
        </Menu>
    );

    
    const links = (
        <Box mt="5px" display="flex">
            <Link href="/" mr={5} fontSize="xl" p={2} borderRadius="md" _hover={{ textDecoration: 'none', boxShadow: '0 0 0 1px white' }}>
                Home
            </Link>
            <Link href="/projects" mr={5} fontSize="xl" p={2} borderRadius="md" _hover={{ textDecoration: 'none', boxShadow: '0 0 0 1px white' }}>
                Projects
            </Link>
            <Link href="/testimonials" mr={5} fontSize="xl" p={2} borderRadius="md" _hover={{ textDecoration: 'none', boxShadow: '0 0 0 1px white' }}>
                Testimonials
            </Link>
        </Box>
    );

    return (
        <Box bg="purple.400" w="100%" p={4} color="white">
            <Flex justify="space-between">
                <Heading onClick={handleHeadingClick} style={{ cursor: 'default' }}>
                    Ryan Oberly
                </Heading>
                {isLargerThan700 ? links : menu}
            </Flex>
        </Box>
    );
}

export default Header;