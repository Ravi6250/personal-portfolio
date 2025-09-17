const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');

// Import all necessary models
const About = require('./models/About');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const User = require('./models/User');

// --- DATA TO BE SEEDED ---

const aboutData = {
  content: "MCA graduate with hands-on experience in building full-stack applications including an LMS platform and a worker job-matching system. Skilled in React.js, Node.js, Express.js, SQL, and MongoDB, with practical knowledge of secure authentication, payment integration, and REST API development. Seeking a Full-Stack/Web Developer role to apply technical expertise in developing scalable, user-focused applications."
};

const skillsData = [
  { name: 'C++', category: 'Programming Languages' },
  { name: 'JavaScript', category: 'Programming Languages' },
  { name: 'HTML5', category: 'Frontend' },
  { name: 'CSS3', category: 'Frontend' },
  { name: 'React.js', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'MySQL', category: 'Databases' },
  { name: 'MongoDB', category: 'Databases' },
  { name: 'Git', category: 'Developer Tools' },
  { name: 'GitHub', category: 'Developer Tools' },
  { name: 'VS Code', category: 'Developer Tools' },
  { name: 'Data Structures', category: 'Core Concepts' },
  { name: 'OOP', category: 'Core Concepts' }
];

const projectsData = [
  {
    title: "Shramik - Web Based Application",
    description: "Built a web application to connect unorganized workers with job providers. Developed user interfaces using HTML, CSS, and JavaScript. Implemented backend with Node.js and used MySQL for data management. Integrated Stripe for secure payment processing.",
    techUsed: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL", "Stripe"],
    liveLink: "https://shramik-ravi.vercel.app",
    githubLink: "https://github.com/Ravi6250/Shramik.git"
  },
  {
    title: "Learning Adda - Web Based LMS",
    description: "Built a full-stack learning platform enabling course creation, student enrollment, and progress tracking. Integrated frontend using React.js with backend APIs built in Node.js, and used Clerk for secure authentication.",
    techUsed: ["React.js", "Node.js", "Express.js", "MongoDB", "Clerk", "GitHub"],
    liveLink: "#", // No live link provided, so using '#'
    githubLink: "https://github.com/Ravi6250/Learning-Adda.git"
  },
  {
    title: "MERN Stack - Personal Finance Tracker",
    description: "A full-stack personal finance tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project was created as a skills assignment and demonstrates full CRUD functionality.",
    techUsed: ["React.js", "React Router", "Chakra UI", "Axios", "Node.js", "Express.js", "MongoDB with Mongoose ODM"],
    liveLink: "#", // No live link provided, so using '#'
    githubLink: "https://github.com/Ravi6250/finance-tracker.git"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // Seed About section
    await About.deleteMany({});
    await About.create(aboutData);
    console.log('About data seeded.');

    // Seed Skills section
    await Skill.deleteMany({});
    await Skill.insertMany(skillsData);
    console.log('Skills data seeded.');

    // Seed Projects section
    await Project.deleteMany({});
    await Project.insertMany(projectsData);
    console.log('Projects data seeded.');
    
    // Seed Admin User
    await User.deleteMany({});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt); // Change "password123" to your own password
    await User.create({
      username: "admin",
      password: hashedPassword
    });
    console.log('Admin user seeded.');

  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

seedDatabase();