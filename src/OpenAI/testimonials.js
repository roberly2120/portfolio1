import OpenAI from 'openai';

const key = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true});


export const generateTestimonial = async (globalState, setGlobalState) => {
    // const prompt = "Generate a humorous and obviously exaggerated recommendation or testimonial for me, Ryan, a web developer. You can use the pronoun 'he'. Make it wildly over-the-top, like how I heroically coded an app to save the world from a threat you can decide on. something outrageous. keep it relatively brief, like a single small paragraph and return it in JSON format like this: {testimonial: 'your testimonial here'}"
    const prompt2 = "Generate three short, humorous, and obviously exaggerated testimonials about my skills as a web developer. Make each one unique and wildly imaginative. my name is Ryan and you can use the pronoun 'he'. please return them in JSON format like this: {testimonial1: 'your testimonial here', testimonial2: 'your testimonial here', testimonial3: 'your testimonial here'}"


    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `${prompt2}`}],
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
