import OpenAI from 'openai';

const key = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true });


export const generateTestimonial = async (globalState, setGlobalState, retries = 3) => {


const prompt = `I'm an AI tasked with generating three short, humorous, and slightly exaggerated testimonials about a web developer named Ryan, for whom the pronouns 'he' and 'him' are acceptable. Each testimonial should be distinct, creatively imaginative, yet grounded enough to suggest genuine respect and admiration, with a professional yet whimsical touch. Please include ryan's mastery of at least one of the following: React, JavaScript, CSS, HTML, Express, Node, or OpenAI. The conclusion of each testimonial should feature a name that is amusing and slightly unconventional, yet not excessively fanciful or childish, like 'Quentin Ashfordley' or 'Isabella Windthorpe'. It's crucial that these testimonials are formatted correctly in JSON structure without any trailing commas, especially after the last item, to ensure smooth parsing. The format should be as follows:

{
  "testimonial1": "First testimonial goes here followed by a hyphen and a space and then a slightly unusual but professionally amusing name",
  "testimonial2": "Second testimonial goes here followed by a hyphen and a space and then a slightly unusual but professionally amusing name",
  "testimonial3": "Third testimonial goes here followed by a hyphen and a space and then a slightly unusual but professionally amusing name"
}

Note: Please ensure there are no trailing commas after the final testimonial to avoid JSON parsing errors. Replace "First testimonial goes here", "Second testimonial goes here", and "Third testimonial goes here" with the actual testimonials.
`


try {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `${prompt}` }],
        model: "gpt-3.5-turbo",
        presence_penalty: 0.6,
    })
    // console.log(completion.choices[0].message.content)
    const res = JSON.parse(completion.choices[0].message.content)
    setGlobalState(prevState => ({
        ...prevState,
        testimonials: [res.testimonial1, res.testimonial2, res.testimonial3]
    }));
} catch (error) {
    console.error("Error generating testimonial:", error);
    if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        await generateTestimonial(globalState, setGlobalState, retries - 1);
    } else {
        // Show an error message to the user
        console.error("Failed to generate testimonial after 3 attempts");
    }
}
}
