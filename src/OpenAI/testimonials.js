import OpenAI from 'openai';

const key = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true });


export const generateTestimonial = async (globalState, setGlobalState) => {

    const prompt = `
I'm an AI and I need to generate three short, humorous, and obviously exaggerated testimonials about a web developer named Ryan for whom the pronouns 'he' and 'him' are acceptable. Each testimonial should be unique and wildly imaginative. Please format the testimonials in the following JSON structure:

{
  "testimonial1": "First testimonial goes here",
  "testimonial2": "Second testimonial goes here",
  "testimonial3": "Third testimonial goes here"
}

Please replace "First testimonial goes here", "Second testimonial goes here", and "Third testimonial goes here" with the actual testimonials.
`;


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
}
