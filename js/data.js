const subjects = [
  { year: 1, name: "Programming Fundamentals", description: "Learn problem solving and coding basics using C or Python." },
  { year: 1, name: "Calculus 1", description: "Limits, derivatives, and integrals used in engineering analysis." },
  { year: 1, name: "Physics for Engineers", description: "Mechanics, electricity, and magnetism." },
  { year: 1, name: "Introduction to Computer Engineering", description: "Overview of the field, ethics, and career paths." },

  { year: 2, name: "Data Structures and Algorithms", description: "Arrays, linked lists, trees, graphs, and sorting." },
  { year: 2, name: "Circuits and Electronics", description: "Analysis of electrical circuits, diodes, and transistors." },
  { year: 2, name: "Digital Logic Design", description: "Logic gates, flip-flops, and building digital circuits." },
  { year: 2, name: "Differential Equations", description: "Mathematical modeling of engineering systems." },

  { year: 3, name: "Computer Architecture", description: "How CPUs, memory, and buses work internally." },
  { year: 3, name: "Microprocessors and Embedded Systems", description: "Programming microcontrollers like Arduino and ARM boards." },
  { year: 3, name: "Operating Systems", description: "Processes, memory management, and file systems." },
  { year: 3, name: "Computer Networks", description: "Protocols, TCP/IP, and network design." },

  { year: 4, name: "Capstone Project", description: "Design and build a complete hardware/software system." },
  { year: 4, name: "Artificial Intelligence", description: "Machine learning basics and intelligent systems." },
  { year: 4, name: "Cybersecurity", description: "Protecting systems, networks, and data." },
  { year: 4, name: "VLSI Design", description: "Designing integrated circuits and chips." }
];

const careers = [
  { icon: "🔌", name: "Embedded Systems Engineer", description: "Builds software for devices like cars, drones, and appliances." },
  { icon: "💻", name: "Software Engineer", description: "Designs and develops applications and systems software." },
  { icon: "🔧", name: "Hardware Engineer", description: "Designs processors, circuit boards, and electronic devices." },
  { icon: "🌐", name: "Network Engineer", description: "Builds and maintains computer networks and infrastructure." },
  { icon: "🛡️", name: "Cybersecurity Analyst", description: "Protects organizations from digital threats." },
  { icon: "🤖", name: "Robotics Engineer", description: "Combines mechanics, electronics, and software to build robots." },
  { icon: "📡", name: "IoT Developer", description: "Connects physical devices to the internet." },
  { icon: "🧠", name: "AI / Machine Learning Engineer", description: "Builds systems that learn from data." }
];

const roadmap = [
  {
    stage: "Year 1",
    name: "Build your foundation",
    description: "Learn one programming language well (Python or C), refresh your math, and get comfortable with VS Code and Git. Make small projects like a calculator or a quiz game."
  },
  {
    stage: "Year 2",
    name: "Learn how hardware thinks",
    description: "Study circuits and digital logic, then build real things: LED circuits, a simple Arduino project, and data structure practice in code. Start a GitHub portfolio."
  },
  {
    stage: "Year 3",
    name: "Go deeper and specialize",
    description: "Take on embedded systems, networks, and operating systems. Join a club or competition, try an internship, and pick a direction such as embedded, networking, AI, or security."
  },
  {
    stage: "Year 4",
    name: "Show what you can do",
    description: "Finish your capstone, polish your portfolio and resume, and practice for interviews. Consider one certification that matches your chosen direction."
  },
  {
    stage: "After graduation",
    name: "Launch your career",
    description: "Apply for entry-level roles or further study. Check the licensure or professional registration requirements for computer engineers in your country."
  }
];

const tools = [
  { icon: "📝", name: "VS Code", category: "Coding", description: "Free code editor for web, Python, C/C++, and more." },
  { icon: "🐙", name: "Git and GitHub", category: "Coding", description: "Track your code changes and build a public portfolio." },
  { icon: "🐍", name: "Python", category: "Programming language", description: "Beginner-friendly language for scripting, automation, and AI." },
  { icon: "⚙️", name: "C / C++", category: "Programming language", description: "Close to the hardware, used in embedded systems and operating systems." },
  { icon: "🔌", name: "Arduino IDE and boards", category: "Hardware", description: "Cheap microcontroller boards for learning electronics and embedded code." },
  { icon: "⚡", name: "Tinkercad Circuits", category: "Simulation", description: "Free online tool to build and test circuits and Arduino projects without parts." },
  { icon: "🧩", name: "Logisim Evolution", category: "Simulation", description: "Design and test digital logic circuits visually." },
  { icon: "🧪", name: "LTspice", category: "Simulation", description: "Free circuit simulator for analyzing analog electronics." },
  { icon: "🍓", name: "Raspberry Pi", category: "Hardware", description: "Small, affordable computer for Linux, IoT, and robotics projects." },
  { icon: "🐧", name: "Linux (Ubuntu)", category: "Operating system", description: "Common in servers and embedded systems. Practice the command line early." }
];

const certifications = [
  { icon: "🌐", name: "CompTIA Network+", issuer: "CompTIA", level: "Beginner", description: "Networking fundamentals. Good for network and IT support paths." },
  { icon: "🛡️", name: "CompTIA Security+", issuer: "CompTIA", level: "Intermediate", description: "Core cybersecurity knowledge for security-related roles." },
  { icon: "🔗", name: "Cisco CCNA", issuer: "Cisco", level: "Intermediate", description: "Routing, switching, and network fundamentals, widely recognized in networking." },
  { icon: "☁️", name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", level: "Beginner", description: "Entry-level cloud computing concepts." },
  { icon: "☁️", name: "Microsoft Azure Fundamentals (AZ-900)", issuer: "Microsoft", level: "Beginner", description: "Cloud basics on Microsoft Azure." },
  { icon: "🐍", name: "PCEP / PCAP Python Certification", issuer: "Python Institute", level: "Beginner", description: "Proves your Python programming skills." },
  { icon: "🔐", name: "Certified in Cybersecurity (CC)", issuer: "ISC2", level: "Beginner", description: "Entry-level security certification aimed at newcomers." },
  { icon: "🎓", name: "Certified Computer Engineer (CCpE)", issuer: "Computer Engineering Certification Board (CpECB)", level: "Beginner/Intermediate", description: "Designed for Computer Engineering graduates with less than 10 years of professional practice to validate their foundational competency and early-career experience." },
  { icon: "🎓", name: "Professional Computer Engineer (PCpE)", issuer: "Computer Engineering Certification Board (CpECB)", level: "Advanced", description: "Geared toward established computer engineering practitioners with at least 10 years of professional experience to recognize advanced expertise and senior leadership in the tech industry." },
];

const studyTips = [
  { icon: "⌨️", name: "Code a little every day", description: "Thirty minutes daily beats a six-hour cram once a week. Small habits build real skill." },
  { icon: "🔨", name: "Build projects, not just notes", description: "Turn what you learn into something working: a blinking LED, a small app, a mini game." },
  { icon: "🧠", name: "Understand, don't memorize", description: "Ask why a circuit or algorithm works. Understanding transfers to new problems; memorizing doesn't." },
  { icon: "📚", name: "Master the math early", description: "Calculus, algebra, and discrete math show up everywhere in computer engineering. Fix weak spots in Year 1." },
  { icon: "🤝", name: "Study with others", description: "Explaining a topic to a classmate is one of the best ways to find what you don't understand yet." },
  { icon: "📖", name: "Learn to read datasheets", description: "Real engineers read documentation. Practice with an Arduino or sensor datasheet." },
  { icon: "🐙", name: "Use Git from day one", description: "Save every project on GitHub. It becomes your portfolio by graduation." },
  { icon: "😴", name: "Protect your sleep and health", description: "Exams and debugging both go worse when you're exhausted. Rest is part of studying." }
];

const myProfile = {
  name: "Prince Jhoryl Zambrano",
  course: "BS Computer Engineering",
  school: "Unniversity of Caloocan City - College of Engineering",
  year: "1st Year",
  bio: "Beginner in coding. Currently studying C++. First Website. I choose CpE to expand my knowledge to technology and computer."
};

const myOrganizations = [
  { icon: "🏛️", name: "ICPEP SE - UCC Chapter", role: "Member", description: "A group of CpE 1st to 4th year students in UCC" },
];

const myProjects = [
  { icon: "🌐", name: "CompE Guide Website", tech: "HTML, CSS, JavaScript", description: "A website about computer engineering that I built and published on GitHub Pages. My very First website" }
];