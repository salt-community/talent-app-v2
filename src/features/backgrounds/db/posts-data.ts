export type HighlightedDeveloper = { 
  id: string; 
  headline: string; 
  imageUrl: string; 
  title: string; 
  excerpt: string; 
  avatarUrl: string; 
  name: string; 
  date: string; 
  questions: { 
    id: string; 
    question: string; 
    answer: string; 
  }[]; 
};

export const highlightedDevelopers: HighlightedDeveloper[] = [
  {
    id: "1",
    headline:
      "Goal-oriented developer with a passion for creating impactful solutions",
    imageUrl: "/victor.png",
    title: "MeiliSearch in Action",
    excerpt:
      "By integrating MeiliSearch into the Talent App, Victor Reyes has transformed how users find information, delivering faster and more accurate search results.",
    avatarUrl: "/avatar.png",
    name: "Victor Reyes",
    date: "Dec 20, 2024",

    questions: [
      {
        id: "q1",
        question:
          "What motivated you to integrate MeiliSearch into the Talent App?",
        answer:
          "I've always been fascinated by the power of fast, relevant search. In previous projects, I noticed how crucial it was for users to find the information they need without delay. When I learned about MeiliSearch—how lightweight it is, how quickly you can get it running, and how precise it is at returning results—I knew it was the perfect fit for improving our Talent App's search functionality. That initial spark of curiosity drove me to explore its capabilities and see how they could enhance our user experience.",
      },
      {
        id: "q2",
        question:
          "How did the integration process influence your perspective on creating search features?",
        answer:
          "Working with MeiliSearch taught me a lot about balancing simplicity with scalability. It's straightforward to implement yet powerful enough to handle significant amounts of data. This experience has shown me that designing effective search isn't just about getting results; it's about creating an intuitive, fast, and flexible user experience. When users can quickly locate the right talent profiles, project briefs, or resources, it makes the entire application feel more dynamic and user-friendly.",
      },
      {
        id: "q3",
        question:
          "In what ways did MeiliSearch improve the Talent App for end users?",
        answer:
          "Before integrating MeiliSearch, our search was functional but not always intuitive—users sometimes struggled to find exactly what they were looking for. With MeiliSearch, queries became a lot faster, and the ranking of results feels more natural. Users can now find relevant profiles and resources almost instantly, which boosts engagement and satisfaction. A good search engine reduces frustration; it helps people connect with the content they need—and that's a huge step in making the Talent App a go-to platform for both recruiters and candidates.",
      },
      {
        id: "q4",
        question:
          "What advice would you offer to other developers interested in implementing a search solution?",
        answer:
          "First, keep the user's journey front and center. Ask yourself: How will people search? What kind of information will they need? How do I ensure the results are relevant and quick to load? Then, don't be afraid to experiment. MeiliSearch is quite developer-friendly, so you can spin up a test environment and quickly see if it meets your use case. Finally, remember that search is an ongoing effort—analyzing queries, optimizing indexing, and refining filters all go a long way in delivering the best possible user experience.",
      },
    ],
  },
  {
    id: "2",
    headline: "Passionate about solving real-world problems through code",
    imageUrl: "/adrienn.png",
    title: "Designing for Inclusion in Technology",
    excerpt:
      "Exploring the role of accessibility in modern design and how inclusive practices shape better user experiences.",
    avatarUrl: "/avatar.png",
    name: "Adrienn Pozsgai",
    date: "Dec 20, 2024",
    questions: [
      {
        id: "q1",
        question: "What inspired your focus on accessibility in technology?",
        answer:
          "My background in special education showed me the transformative power of technology for people with disabilities. It fueled my drive to design for inclusivity.",
      },
      {
        id: "q2",
        question: "How does accessibility influence modern design?",
        answer:
          "It ensures no one is left behind. Accessibility improves usability for all users and creates better overall experiences.",
      },
      {
        id: "q3",
        question:
          "How did your experience at SALT impact your approach to accessibility?",
        answer:
          "SALT’s emphasis on teamwork, especially through mob programming, taught me the importance of collaboration. Accessibility is about considering diverse perspectives, and that aligns perfectly with the inclusive coding practices I learned at SALT.",
      },
      {
        id: "q4",
        question:
          "Why do you think accessibility is essential in modern design?",
        answer:
          "Accessibility is not just a feature; it’s a mindset. By designing for inclusivity, we make technology usable for all—not just those with disabilities but everyone. It’s about removing barriers and ensuring that no one is left out.",
      },
      {
        id: "q5",
        question: "What message would you share with aspiring developers?",
        answer:
          "Believe in your ability to grow and embrace challenges as opportunities. Focus on learning from every experience, and never underestimate the impact of inclusive design. It’s a skill that not only improves your work but also makes a real difference in people’s lives.",
      },
    ],
  },
  {
    id: "3",
    headline: "Focusing on building a secure and logical access system",
    imageUrl: "/marten.png",
    title: "Building Access Management from Scratch",
    excerpt:
      "Mårten is tackling the challenge of creating a secure and logical access system while helping bring the Talent App to life from the ground up.",
    avatarUrl: "/avatar.png",
    name: "Mårten Söderlind",
    date: "Dec 20, 2024",
    questions: [
      {
        id: "q1",
        question:
          "What motivated you to build the access management system from scratch?",
        answer:
          "Starting from scratch allowed us to create a system tailored to the Talent App’s needs, ensuring both security and simplicity.",
      },
      {
        id: "q2",
        question: "What’s the most important aspect of access management?",
        answer:
          "Understanding user roles and permissions is crucial. A robust system ensures that every user has the appropriate level of access without compromising security.",
      },
      {
        id: "q3",
        question: "What challenges did you face during development?",
        answer:
          "Balancing security with usability was a challenge. We wanted a system that was secure but also intuitive for users and easy to maintain.",
      },
      {
        id: "q4",
        question: "What advice would you give for designing access systems?",
        answer:
          "Keep it simple and scalable. Plan for future growth and ensure the system can adapt to new requirements while staying user-friendly.",
      },
    ],
  },
];
