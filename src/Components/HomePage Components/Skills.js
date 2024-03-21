import { Heading, HStack, VStack, Text, Box, StackDivider } from '@chakra-ui/react';

export default function Skills() {
    const skills = ['React', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Express.js', 'VSCode', 'Github', 'Chakra-UI',
        'OpenAI', 'Firebase', 'Vercel', 'Postman', 'Axios',
    ];
    const rows = [];

    for (let i = 0; i < skills.length; i += 3) {
        const row = skills.slice(i, i + 3);
        rows.push(row);
    }

    return (
        <>
            <Box>
                <Heading borderBottom="1px solid gray" mb="10px">
                    Skills
                </Heading>
            </Box>
            <VStack>
                {rows.map((row, idx) => (
                    <HStack key={idx} divider={<StackDivider borderColor="gray.400" />}>
                        {row.map((skill, idx) => (
                            <Text key={idx} fontWeight={skill === "React" ? "bold" : "normal"} fontSize={20}>{skill}</Text>
                        ))}
                    </HStack>
                ))}
            </VStack>
        </>
    );

}