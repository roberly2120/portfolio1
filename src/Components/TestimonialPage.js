import React from 'react';
import { AppContext } from '../State';
import { generateTestimonial } from '../OpenAI/testimonials';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Spinner, Box, Text, Heading, Button, Flex } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';

export default function TestimonialPage() {
    const { globalState, setGlobalState } = React.useContext(AppContext);
    const { testimonials } = globalState;
    
    const handleTestimonialGeneration = async () => {
        setGlobalState({ ...globalState, testimonials: [] });
        try {
            await generateTestimonial(globalState, setGlobalState);
        } catch (err) {
            console.error("Error generating testimonial: ", err);
        }
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    if (testimonials.length === 0) {
        return (
            <Flex justifyContent="center" alignItems="center" height="100vh">
                <Spinner />
            </Flex>
        )
    }
    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "50px" }}>
                <Heading as="h1" mb={8} mt={8}>
                    Completely Real, Not AI-Generated Testimonials
                </Heading>
                <Slider {...settings} style={{ width: "40%" }}>
                    {testimonials.map((testimonial, idx) => (

                        <Box
                            key={idx}
                            border="1px solid gray"
                            w="280px" // this hasn't worked. the 'style' in Slider is the only thing that is changing the width. 
                            h="300px" // Fixed height
                            borderRadius="10px"
                            boxShadow="lg"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            p={4}
                        >
                            <Text textAlign="center">{testimonial}</Text>
                        </Box>

                    ))}
                </Slider>
                <Text mt={12} mb={4}>Not Convinced?</Text>
                <ArrowDownIcon w={8} h={8} />
                <Button mt={4} onClick={handleTestimonialGeneration}>Generate New Testimonials</Button>
            </div>

        </>
    );

}