const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection (using local MongoDB)
mongoose.connect('mongodb://localhost:27017/inquesta', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    dbConnected = true;
}).catch(err => {
    console.log('MongoDB connection error:', err);
    console.log('Using fallback data instead');
    dbConnected = false;
});

// Event Schema
const eventSchema = new mongoose.Schema({
    day: Number,
    category: String, // 'technical' or 'non-technical'
    name: String,
    description: String,
    rules: [String],
    rounds: [{
        roundNumber: Number,
        description: String
    }],
    participantCategory: String,
    date: String
});

const Event = mongoose.model('Event', eventSchema);

// Fallback events data (used when MongoDB is not available)
const fallbackEvents = [
    // Day 1 - School Students - Technical Events
    {
        _id: '1',
        day: 1,
        category: 'technical',
        name: 'Poster Making',
        description: 'Create an innovative and visually appealing poster on the given theme.',
        rules: [
            'Individual participation only',
            'Theme will be given on the spot',
            'A3 size paper will be provided',
            'Bring your own colors and materials',
            'Time limit: 2 hours'
        ],
        rounds: [
            { roundNumber: 1, description: 'Participants must prepare and submit their poster within the given time' },
            { roundNumber: 2, description: 'Participants must present their poster and explain the concept' }
        ],
        participantCategory: 'School Students',
        date: '23/03/2026'
    },
    {
        _id: '2',
        day: 1,
        category: 'technical',
        name: 'Paper Presentation',
        description: 'Present your research paper on innovative technical topics.',
        rules: [
            'Team of 1-3 members',
            'Paper should be original work',
            '10 minutes presentation + 5 minutes Q&A',
            'Submit abstract one week before the event'
        ],
        rounds: [
            { roundNumber: 1, description: 'Abstract submission and screening' },
            { roundNumber: 2, description: 'Final presentation in front of judges' }
        ],
        participantCategory: 'School Students',
        date: '23/03/2026'
    },
    {
        _id: '3',
        day: 1,
        category: 'technical',
        name: 'Quiz',
        description: 'Test your technical knowledge in this exciting quiz competition.',
        rules: [
            'Team of 2 members',
            'Multiple rounds: Preliminary and Final',
            'Questions from general science and technology',
            'Use of electronic devices not allowed'
        ],
        rounds: [
            { roundNumber: 1, description: 'Preliminary written round - 30 questions' },
            { roundNumber: 2, description: 'Final round - Buzzer round and rapid fire' }
        ],
        participantCategory: 'School Students',
        date: '23/03/2026'
    },
    {
        _id: '4',
        day: 1,
        category: 'technical',
        name: 'Coding Challenge',
        description: 'Showcase your programming skills in this coding competition.',
        rules: [
            'Individual participation',
            'Languages allowed: C, C++, Java, Python',
            '3 problems to solve in 2 hours',
            'Internet access not allowed'
        ],
        rounds: [
            { roundNumber: 1, description: 'Solve 3 coding problems within time limit' },
            { roundNumber: 2, description: 'Top performers will face additional challenge problems' }
        ],
        participantCategory: 'School Students',
        date: '23/03/2026'
    },
    // Day 1 - School Students - Non-Technical Events
    {
        _id: '5',
        day: 1,
        category: 'non-technical',
        name: 'Connecting Words',
        description: 'A fun word game that tests your vocabulary and thinking ability.',
        rules: [
            'Team of 2 members',
            'Connect words based on clues given',
            'Time limit per round: 30 seconds',
            'Minimum 20 words to connect'
        ],
        rounds: [
            { roundNumber: 1, description: 'Preliminary round - Connect 10 words' },
            { roundNumber: 2, description: 'Final round - Connect 20 words with tricky clues' }
        ],
        participantCategory: 'School Students',
        date: '23/03/2026'
    },
    {
        _id: '6',
        day: 1,
        category: 'non-technical',
        name: 'Quiz',
        description: 'A fun general knowledge quiz to test your awareness.',
        rules: [
            'Individual participation',
            'Questions from current affairs, sports, movies, and general knowledge',
            'Multiple choice questions',
            'No negative marking'
        ],
        rounds: [
            { roundNumber: 1, description: 'Written round - 25 questions' },
            { roundNumber: 2, description: 'Oral round - Top 10 contestants' }
        ],
        participantCategory: 'School Students',
        date: '23/03/2026'
    },
    {
        _id: '7',
        day: 1,
        category: 'non-technical',
        name: 'Myth or Faith',
        description: 'An interesting event to separate myths from facts.',
        rules: [
            'Team of 2 members',
            'Statements will be given - identify if myth or fact',
            '60 seconds to discuss each statement',
            'Maximum 15 statements to identify'
        ],
        rounds: [
            { roundNumber: 1, description: 'Identify 10 statements as myth or fact' },
            { roundNumber: 2, description: 'Final showdown with 5 challenging statements' }
        ],
        participantCategory: 'School Students',
        date: '23/03/2026'
    },
    // Day 2 - Intra College Students
    {
        _id: '8',
        day: 2,
        category: 'technical',
        name: 'Hackathon',
        description: 'A 24-hour coding marathon to build innovative solutions.',
        rules: [
            'Team of 3-4 members',
            'Problem statements will be given on the spot',
            'Bring your own laptops',
            'Internet will be provided'
        ],
        rounds: [
            { roundNumber: 1, description: 'Build a working prototype in 24 hours' },
            { roundNumber: 2, description: 'Present your solution to the judges and Q&A' }
        ],
        participantCategory: 'Intra College Students',
        date: '24/03/2026'
    },
    {
        _id: '9',
        day: 2,
        category: 'technical',
        name: 'Debugging',
        description: 'Find and fix the bugs in the given code.',
        rules: [
            'Individual participation',
            '5 programs with intentional bugs',
            'Time limit: 1 hour'
        ],
        rounds: [
            { roundNumber: 1, description: 'Debug 5 programs in given time' },
            { roundNumber: 2, description: 'Speed round - Debug 3 programs in 15 minutes' }
        ],
        participantCategory: 'Intra College Students',
        date: '24/03/2026'
    },
    {
        _id: '10',
        day: 2,
        category: 'non-technical',
        name: 'Debate',
        description: 'Express your views and argue your point effectively.',
        rules: [
            'Individual participation',
            'Topics from current issues',
            '3 minutes per speaker'
        ],
        rounds: [
            { roundNumber: 1, description: 'Preliminary round - Random topics' },
            { roundNumber: 2, description: 'Final round - Selected topics' }
        ],
        participantCategory: 'Intra College Students',
        date: '24/03/2026'
    },
    // Day 3 - Inter College Students
    {
        _id: '11',
        day: 3,
        category: 'technical',
        name: 'Code Golf',
        description: 'Write the shortest code to solve a problem.',
        rules: [
            'Individual participation',
            'Solve problem in minimum lines of code',
            'Multiple languages allowed'
        ],
        rounds: [
            { roundNumber: 1, description: 'Solve 3 problems in minimum code' },
            { roundNumber: 2, description: 'Championship round - 1 complex problem' }
        ],
        participantCategory: 'Inter College Students',
        date: '25/03/2026'
    },
    {
        _id: '12',
        day: 3,
        category: 'technical',
        name: 'Web Designing',
        description: 'Create an attractive and functional website.',
        rules: [
            'Team of 2 members',
            'Topic given on the spot',
            'HTML, CSS, JS only',
            '3 hours time limit'
        ],
        rounds: [
            { roundNumber: 1, description: 'Design a responsive website' },
            { roundNumber: 2, description: 'Present and explain your design' }
        ],
        participantCategory: 'Inter College Students',
        date: '25/03/2026'
    },
    {
        _id: '13',
        day: 3,
        category: 'non-technical',
        name: 'Treasure Hunt',
        description: 'Find the hidden treasure through clues and puzzles.',
        rules: [
            'Team of 4 members',
            'Multiple check points',
            'Solve puzzles to get next clue'
        ],
        rounds: [
            { roundNumber: 1, description: 'Preliminary - Find 5 clues' },
            { roundNumber: 2, description: 'Final - Complete the treasure hunt' }
        ],
        participantCategory: 'Inter College Students',
        date: '25/03/2026'
    },
    // Day 4 - Polytechnic College Students
    {
        _id: '14',
        day: 4,
        category: 'technical',
        name: 'Circuit Debugging',
        description: 'Find and fix faults in electronic circuits.',
        rules: [
            'Individual participation',
            '5 circuits with faults',
            'Identify all faults correctly',
            'Time limit: 1 hour'
        ],
        rounds: [
            { roundNumber: 1, description: 'Debug 3 basic circuits' },
            { roundNumber: 2, description: 'Debug 2 advanced circuits' }
        ],
        participantCategory: 'Polytechnic College Students',
        date: '26/03/2026'
    },
    {
        _id: '15',
        day: 4,
        category: 'technical',
        name: 'CAD Modeling',
        description: 'Create 3D models using CAD software.',
        rules: [
            'Individual participation',
            'AutoCAD or SolidWorks',
            'Given 2D drawings to convert to 3D'
        ],
        rounds: [
            { roundNumber: 1, description: 'Model 2 simple parts' },
            { roundNumber: 2, description: 'Assemble and present 3D model' }
        ],
        participantCategory: 'Polytechnic College Students',
        date: '26/03/2026'
    },
    {
        _id: '16',
        day: 4,
        category: 'non-technical',
        name: 'Adzap',
        description: 'Create and perform advertisements for random products.',
        rules: [
            'Team of 4 members',
            'Product given on the spot',
            '2 minutes to perform'
        ],
        rounds: [
            { roundNumber: 1, description: 'Prepare advertisement' },
            { roundNumber: 2, description: 'Perform in front of audience' }
        ],
        participantCategory: 'Polytechnic College Students',
        date: '26/03/2026'
    },
    {
        _id: '17',
        day: 4,
        category: 'non-technical',
        name: 'Dumb Charades',
        description: 'Act out words without speaking.',
        rules: [
            'Team of 3 members',
            'Act out movie names, phrases',
            '60 seconds per turn'
        ],
        rounds: [
            { roundNumber: 1, description: 'Preliminary round' },
            { roundNumber: 2, description: 'Final - Top teams' }
        ],
        participantCategory: 'Polytechnic College Students',
        date: '26/03/2026'
    }
];

let dbConnected = false;

// Seed data function
const seedDatabase = async () => {
    const count = await Event.countDocuments();
    if (count === 0) {
        const events = [
            // Day 1 - School Students - Technical Events
            {
                day: 1,
                category: 'technical',
                name: 'Poster Making',
                description: 'Create an innovative and visually appealing poster on the given theme.',
                rules: [
                    'Individual participation only',
                    'Theme will be given on the spot',
                    'A3 size paper will be provided',
                    'Bring your own colors and materials',
                    'Time limit: 2 hours'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Participants must prepare and submit their poster within the given time' },
                    { roundNumber: 2, description: 'Participants must present their poster and explain the concept' }
                ],
                participantCategory: 'School Students',
                date: '23/03/2026'
            },
            {
                day: 1,
                category: 'technical',
                name: 'Paper Presentation',
                description: 'Present your research paper on innovative technical topics.',
                rules: [
                    'Team of 1-3 members',
                    'Paper should be original work',
                    '10 minutes presentation + 5 minutes Q&A',
                    'Submit abstract one week before the event'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Abstract submission and screening' },
                    { roundNumber: 2, description: 'Final presentation in front of judges' }
                ],
                participantCategory: 'School Students',
                date: '23/03/2026'
            },
            {
                day: 1,
                category: 'technical',
                name: 'Quiz',
                description: 'Test your technical knowledge in this exciting quiz competition.',
                rules: [
                    'Team of 2 members',
                    'Multiple rounds: Preliminary and Final',
                    'Questions from general science and technology',
                    'Use of electronic devices not allowed'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Preliminary written round - 30 questions' },
                    { roundNumber: 2, description: 'Final round - Buzzer round and rapid fire' }
                ],
                participantCategory: 'School Students',
                date: '23/03/2026'
            },
            {
                day: 1,
                category: 'technical',
                name: 'Coding Challenge',
                description: 'Showcase your programming skills in this coding competition.',
                rules: [
                    'Individual participation',
                    'Languages allowed: C, C++, Java, Python',
                    '3 problems to solve in 2 hours',
                    'Internet access not allowed'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Solve 3 coding problems within time limit' },
                    { roundNumber: 2, description: 'Top performers will face additional challenge problems' }
                ],
                participantCategory: 'School Students',
                date: '23/03/2026'
            },
            // Day 1 - School Students - Non-Technical Events
            {
                day: 1,
                category: 'non-technical',
                name: 'Connecting Words',
                description: 'A fun word game that tests your vocabulary and thinking ability.',
                rules: [
                    'Team of 2 members',
                    'Connect words based on clues given',
                    'Time limit per round: 30 seconds',
                    'Minimum 20 words to connect'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Preliminary round - Connect 10 words' },
                    { roundNumber: 2, description: 'Final round - Connect 20 words with tricky clues' }
                ],
                participantCategory: 'School Students',
                date: '23/03/2026'
            },
            {
                day: 1,
                category: 'non-technical',
                name: 'Quiz',
                description: 'A fun general knowledge quiz to test your awareness.',
                rules: [
                    'Individual participation',
                    'Questions from current affairs, sports, movies, and general knowledge',
                    'Multiple choice questions',
                    'No negative marking'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Written round - 25 questions' },
                    { roundNumber: 2, description: 'Oral round - Top 10 contestants' }
                ],
                participantCategory: 'School Students',
                date: '23/03/2026'
            },
            {
                day: 1,
                category: 'non-technical',
                name: 'Myth or Faith',
                description: 'An interesting event to separate myths from facts.',
                rules: [
                    'Team of 2 members',
                    'Statements will be given - identify if myth or fact',
                    '60 seconds to discuss each statement',
                    'Maximum 15 statements to identify'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Identify 10 statements as myth or fact' },
                    { roundNumber: 2, description: 'Final showdown with 5 challenging statements' }
                ],
                participantCategory: 'School Students',
                date: '23/03/2026'
            },
            // Day 2 - Intra College Students - Technical Events
            {
                day: 2,
                category: 'technical',
                name: 'Hackathon',
                description: 'A 24-hour coding marathon to build innovative solutions.',
                rules: [
                    'Team of 3-4 members',
                    'Problem statements will be given on the spot',
                    'Bring your own laptops',
                    'Internet will be provided',
                    'Present your solution to judges'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Build a working prototype in 24 hours' },
                    { roundNumber: 2, description: 'Present your solution to the judges and Q&A' }
                ],
                participantCategory: 'Intra College Students',
                date: '24/03/2026'
            },
            {
                day: 2,
                category: 'technical',
                name: 'Debugging',
                description: 'Find and fix the bugs in the given code.',
                rules: [
                    'Individual participation',
                    '5 programs with intentional bugs',
                    'Time limit: 1 hour',
                    'First to debug correctly wins'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Debug 5 programs in given time' },
                    { roundNumber: 2, description: 'Speed round - Debug 3 programs in 15 minutes' }
                ],
                participantCategory: 'Intra College Students',
                date: '24/03/2026'
            },
            {
                day: 2,
                category: 'technical',
                name: 'Technical Paper Presentation',
                description: 'Present your research on cutting-edge technical topics.',
                rules: [
                    'Team of 1-3 members',
                    'Submit paper one week before',
                    '15 minutes presentation + 10 minutes Q&A',
                    'PowerPoint presentation required'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Paper submission and evaluation' },
                    { roundNumber: 2, description: 'Present in front of panel of judges' }
                ],
                participantCategory: 'Intra College Students',
                date: '24/03/2026'
            },
            {
                day: 2,
                category: 'technical',
                name: 'Project Exhibition',
                description: 'Showcase your innovative technical projects.',
                rules: [
                    'Team of 2-4 members',
                    'Bring working prototype',
                    'Poster presentation required',
                    'Judges will visit each stall'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Set up your project stall' },
                    { roundNumber: 2, description: 'Present to judges and visitors' }
                ],
                participantCategory: 'Intra College Students',
                date: '24/03/2026'
            },
            // Day 2 - Intra College Students - Non-Technical Events
            {
                day: 2,
                category: 'non-technical',
                name: 'Debate',
                description: 'Express your views and argue your point effectively.',
                rules: [
                    'Individual participation',
                    'Topics from current issues',
                    '3 minutes per speaker',
                    'Motion and counter-motion format'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Preliminary round - Random topics' },
                    { roundNumber: 2, description: 'Final round - Selected topics' }
                ],
                participantCategory: 'Intra College Students',
                date: '24/03/2026'
            },
            {
                day: 2,
                category: 'non-technical',
                name: 'Photography',
                description: 'Capture moments and tell a story through your lens.',
                rules: [
                    'Individual participation',
                    'Theme: "Life in Colors"',
                    'Submit 3 best photographs',
                    'Mobile cameras allowed'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Photo submission with description' },
                    { roundNumber: 2, description: 'Top 10 present their best work' }
                ],
                participantCategory: 'Intra College Students',
                date: '24/03/2026'
            },
            {
                day: 2,
                category: 'non-technical',
                name: 'Short Film Making',
                description: 'Create a short film on the given theme.',
                rules: [
                    'Team of 3-5 members',
                    'Maximum duration: 5 minutes',
                    'Theme will be announced on the spot',
                    'Edit and submit within 24 hours'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Shoot and edit your film in 24 hours' },
                    { roundNumber: 2, description: 'Screening and awards ceremony' }
                ],
                participantCategory: 'Intra College Students',
                date: '24/03/2026'
            },
            // Day 3 - Inter College Students - Technical Events
            {
                day: 3,
                category: 'technical',
                name: 'Code Golf',
                description: 'Write the shortest code to solve a problem.',
                rules: [
                    'Individual participation',
                    'Solve problem in minimum lines of code',
                    'Multiple languages allowed',
                    'Compilation and execution test'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Solve 3 problems in minimum code' },
                    { roundNumber: 2, description: 'Championship round - 1 complex problem' }
                ],
                participantCategory: 'Inter College Students',
                date: '25/03/2026'
            },
            {
                day: 3,
                category: 'technical',
                name: 'Web Designing',
                description: 'Create an attractive and functional website.',
                rules: [
                    'Team of 2 members',
                    'Topic given on the spot',
                    'HTML, CSS, JS only',
                    '3 hours time limit'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Design a responsive website' },
                    { roundNumber: 2, description: 'Present and explain your design' }
                ],
                participantCategory: 'Inter College Students',
                date: '25/03/2026'
            },
            {
                day: 3,
                category: 'technical',
                name: 'Quiz',
                description: 'Advanced technical quiz for engineering students.',
                rules: [
                    'Team of 2 members',
                    'Questions from all engineering branches',
                    'Preliminary and final round',
                    'Technical and general rounds'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Written preliminary - 40 questions' },
                    { roundNumber: 2, description: 'Final buzzer round' }
                ],
                participantCategory: 'Inter College Students',
                date: '25/03/2026'
            },
            {
                day: 3,
                category: 'technical',
                name: 'App Development',
                description: 'Build a mobile application for the given problem.',
                rules: [
                    'Team of 3 members',
                    'Build Android/iOS app',
                    'Present working prototype',
                    'Judges evaluate innovation and functionality'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Develop app in 12 hours' },
                    { roundNumber: 2, description: 'Present and demonstrate your app' }
                ],
                participantCategory: 'Inter College Students',
                date: '25/03/2026'
            },
            // Day 3 - Inter College Students - Non-Technical Events
            {
                day: 3,
                category: 'non-technical',
                name: 'Treasure Hunt',
                description: 'Find the hidden treasure through clues and puzzles.',
                rules: [
                    'Team of 4 members',
                    'Multiple check points',
                    'Solve puzzles to get next clue',
                    'First team to reach treasure wins'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Preliminary - Find 5 clues' },
                    { roundNumber: 2, description: 'Final - Complete the treasure hunt' }
                ],
                participantCategory: 'Inter College Students',
                date: '25/03/2026'
            },
            {
                day: 3,
                category: 'non-technical',
                name: 'Mock IPL Auction',
                description: 'Experience the thrill of IPL auction.',
                rules: [
                    'Team of 2 members',
                    'Each team gets virtual money',
                    'Bid for players',
                    'Build the best team'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Bidding round 1 - Base players' },
                    { roundNumber: 2, description: 'Bidding round 2 - Premium players' }
                ],
                participantCategory: 'Inter College Students',
                date: '25/03/2026'
            },
            {
                day: 3,
                category: 'non-technical',
                name: 'Just A Minute',
                description: 'Speak on a random topic for one minute without hesitation.',
                rules: [
                    'Individual participation',
                    'Random topics given',
                    'No hesitation, repetition, or deviation',
                    'Judges note errors'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Preliminary round - 3 topics' },
                    { roundNumber: 2, description: 'Final round - Top 10 speakers' }
                ],
                participantCategory: 'Inter College Students',
                date: '25/03/2026'
            },
            // Day 4 - Polytechnic College Students - Technical Events
            {
                day: 4,
                category: 'technical',
                name: 'Circuit Debugging',
                description: 'Find and fix faults in electronic circuits.',
                rules: [
                    'Individual participation',
                    '5 circuits with faults',
                    'Identify all faults correctly',
                    'Time limit: 1 hour'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Debug 3 basic circuits' },
                    { roundNumber: 2, description: 'Debug 2 advanced circuits' }
                ],
                participantCategory: 'Polytechnic College Students',
                date: '26/03/2026'
            },
            {
                day: 4,
                category: 'technical',
                name: 'CAD Modeling',
                description: 'Create 3D models using CAD software.',
                rules: [
                    'Individual participation',
                    'AutoCAD or SolidWorks',
                    'Given 2D drawings to convert to 3D',
                    'Accuracy and speed matter'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Model 2 simple parts' },
                    { roundNumber: 2, description: 'Assemble and present 3D model' }
                ],
                participantCategory: 'Polytechnic College Students',
                date: '26/03/2026'
            },
            {
                day: 4,
                category: 'technical',
                name: 'Robotics',
                description: 'Build and program robots to complete tasks.',
                rules: [
                    'Team of 3 members',
                    'Build line following robot',
                    'Complete the maze',
                    'Time and accuracy based'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Robot building and testing' },
                    { roundNumber: 2, description: 'Race through the maze' }
                ],
                participantCategory: 'Polytechnic College Students',
                date: '26/03/2026'
            },
            {
                day: 4,
                category: 'technical',
                name: 'PPT Presentation',
                description: 'Present technical topics with creative slides.',
                rules: [
                    'Team of 2 members',
                    '10-15 slides',
                    'Topics from engineering',
                    '7 minutes presentation'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Submit presentation' },
                    { roundNumber: 2, description: 'Present to judges and Q&A' }
                ],
                participantCategory: 'Polytechnic College Students',
                date: '26/03/2026'
            },
            // Day 4 - Polytechnic College Students - Non-Technical Events
            {
                day: 4,
                category: 'non-technical',
                name: 'Adzap',
                description: 'Create and perform advertisements for random products.',
                rules: [
                    'Team of 4 members',
                    'Product given on the spot',
                    '2 minutes to perform',
                    'Creativity and humor appreciated'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Prepare advertisement' },
                    { roundNumber: 2, description: 'Perform in front of audience' }
                ],
                participantCategory: 'Polytechnic College Students',
                date: '26/03/2026'
            },
            {
                day: 4,
                category: 'non-technical',
                name: 'Dumb Charades',
                description: 'Act out words without speaking.',
                rules: [
                    'Team of 3 members',
                    'Act out movie names, phrases',
                    '60 seconds per turn',
                    'Maximum correct guesses win'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Preliminary round' },
                    { roundNumber: 2, description: 'Final - Top teams' }
                ],
                participantCategory: 'Polytechnic College Students',
                date: '26/03/2026'
            },
            {
                day: 4,
                category: 'non-technical',
                name: 'Chef Hunt',
                description: 'Cook without fire and create delicious dishes.',
                rules: [
                    'Team of 2 members',
                    'No cooking fire allowed',
                    'Use available ingredients',
                    'Presentation matters'
                ],
                rounds: [
                    { roundNumber: 1, description: 'Prepare dish without fire' },
                    { roundNumber: 2, description: 'Present and get judged' }
                ],
                participantCategory: 'Polytechnic College Students',
                date: '26/03/2026'
            }
        ];

        await Event.insertMany(events);
        console.log('Database seeded with events');
    }
};

// Seed API endpoint
app.post('/api/seed', async (req, res) => {
    try {
        const count = await Event.countDocuments();
        if (count === 0) {
            // Day 1 - School Students - Technical Events
            await Event.create([
                {
                    day: 1,
                    category: 'technical',
                    name: 'Poster Making',
                    description: 'Create an innovative and visually appealing poster on the given theme.',
                    rules: [
                        'Individual participation only',
                        'Theme will be given on the spot',
                        'A3 size paper will be provided',
                        'Bring your own colors and materials',
                        'Time limit: 2 hours'
                    ],
                    rounds: [
                        { roundNumber: 1, description: 'Participants must prepare and submit their poster within the given time' },
                        { roundNumber: 2, description: 'Participants must present their poster and explain the concept' }
                    ],
                    participantCategory: 'School Students',
                    date: '23/03/2026'
                },
                {
                    day: 1,
                    category: 'technical',
                    name: 'Paper Presentation',
                    description: 'Present your research paper on innovative technical topics.',
                    rules: [
                        'Team of 1-3 members',
                        'Paper should be original work',
                        '10 minutes presentation + 5 minutes Q&A'
                    ],
                    rounds: [
                        { roundNumber: 1, description: 'Abstract submission and screening' },
                        { roundNumber: 2, description: 'Final presentation in front of judges' }
                    ],
                    participantCategory: 'School Students',
                    date: '23/03/2026'
                },
                {
                    day: 1,
                    category: 'technical',
                    name: 'Quiz',
                    description: 'Test your technical knowledge in this exciting quiz competition.',
                    rules: [
                        'Team of 2 members',
                        'Multiple rounds: Preliminary and Final'
                    ],
                    rounds: [
                        { roundNumber: 1, description: 'Preliminary written round' },
                        { roundNumber: 2, description: 'Final buzzer round' }
                    ],
                    participantCategory: 'School Students',
                    date: '23/03/2026'
                },
                {
                    day: 1,
                    category: 'technical',
                    name: 'Coding Challenge',
                    description: 'Showcase your programming skills.',
                    rules: ['Individual participation', 'Time limit: 2 hours'],
                    rounds: [
                        { roundNumber: 1, description: 'Solve coding problems' },
                        { roundNumber: 2, description: 'Top performers round' }
                    ],
                    participantCategory: 'School Students',
                    date: '23/03/2026'
                },
                {
                    day: 1,
                    category: 'non-technical',
                    name: 'Connecting Words',
                    description: 'A fun word game that tests your vocabulary.',
                    rules: ['Team of 2 members'],
                    rounds: [
                        { roundNumber: 1, description: 'Preliminary round' },
                        { roundNumber: 2, description: 'Final round' }
                    ],
                    participantCategory: 'School Students',
                    date: '23/03/2026'
                },
                {
                    day: 1,
                    category: 'non-technical',
                    name: 'Quiz',
                    description: 'A fun general knowledge quiz.',
                    rules: ['Individual participation'],
                    rounds: [
                        { roundNumber: 1, description: 'Written round' },
                        { roundNumber: 2, description: 'Oral round' }
                    ],
                    participantCategory: 'School Students',
                    date: '23/03/2026'
                },
                {
                    day: 1,
                    category: 'non-technical',
                    name: 'Myth or Faith',
                    description: 'Separate myths from facts.',
                    rules: ['Team of 2 members'],
                    rounds: [
                        { roundNumber: 1, description: 'Identify statements' },
                        { roundNumber: 2, description: 'Final showdown' }
                    ],
                    participantCategory: 'School Students',
                    date: '23/03/2026'
                },
                // Day 2
                {
                    day: 2,
                    category: 'technical',
                    name: 'Hackathon',
                    description: 'A 24-hour coding marathon.',
                    rules: ['Team of 3-4 members'],
                    rounds: [
                        { roundNumber: 1, description: 'Build prototype' },
                        { roundNumber: 2, description: 'Present to judges' }
                    ],
                    participantCategory: 'Intra College Students',
                    date: '24/03/2026'
                },
                {
                    day: 2,
                    category: 'technical',
                    name: 'Debugging',
                    description: 'Find and fix bugs in code.',
                    rules: ['Individual participation'],
                    rounds: [
                        { roundNumber: 1, description: 'Debug programs' },
                        { roundNumber: 2, description: 'Speed round' }
                    ],
                    participantCategory: 'Intra College Students',
                    date: '24/03/2026'
                },
                {
                    day: 2,
                    category: 'non-technical',
                    name: 'Debate',
                    description: 'Express your views effectively.',
                    rules: ['Individual participation'],
                    rounds: [
                        { roundNumber: 1, description: 'Preliminary round' },
                        { roundNumber: 2, description: 'Final round' }
                    ],
                    participantCategory: 'Intra College Students',
                    date: '24/03/2026'
                },
                // Day 3
                {
                    day: 3,
                    category: 'technical',
                    name: 'Code Golf',
                    description: 'Write the shortest code.',
                    rules: ['Individual participation'],
                    rounds: [
                        { roundNumber: 1, description: 'Solve problems' },
                        { roundNumber: 2, description: 'Championship round' }
                    ],
                    participantCategory: 'Inter College Students',
                    date: '25/03/2026'
                },
                {
                    day: 3,
                    category: 'technical',
                    name: 'Web Designing',
                    description: 'Create an attractive website.',
                    rules: ['Team of 2 members', '3 hours'],
                    rounds: [
                        { roundNumber: 1, description: 'Design website' },
                        { roundNumber: 2, description: 'Present design' }
                    ],
                    participantCategory: 'Inter College Students',
                    date: '25/03/2026'
                },
                {
                    day: 3,
                    category: 'non-technical',
                    name: 'Treasure Hunt',
                    description: 'Find the hidden treasure.',
                    rules: ['Team of 4 members'],
                    rounds: [
                        { roundNumber: 1, description: 'Find clues' },
                        { roundNumber: 2, description: 'Complete hunt' }
                    ],
                    participantCategory: 'Inter College Students',
                    date: '25/03/2026'
                },
                // Day 4
                {
                    day: 4,
                    category: 'technical',
                    name: 'Circuit Debugging',
                    description: 'Fix faults in circuits.',
                    rules: ['Individual participation'],
                    rounds: [
                        { roundNumber: 1, description: 'Debug basic circuits' },
                        { roundNumber: 2, description: 'Debug advanced circuits' }
                    ],
                    participantCategory: 'Polytechnic College Students',
                    date: '26/03/2026'
                },
                {
                    day: 4,
                    category: 'technical',
                    name: 'CAD Modeling',
                    description: 'Create 3D models.',
                    rules: ['Individual participation'],
                    rounds: [
                        { roundNumber: 1, description: 'Model parts' },
                        { roundNumber: 2, description: 'Present model' }
                    ],
                    participantCategory: 'Polytechnic College Students',
                    date: '26/03/2026'
                },
                {
                    day: 4,
                    category: 'non-technical',
                    name: 'Adzap',
                    description: 'Create advertisements.',
                    rules: ['Team of 4 members'],
                    rounds: [
                        { roundNumber: 1, description: 'Prepare ad' },
                        { roundNumber: 2, description: 'Perform' }
                    ],
                    participantCategory: 'Polytechnic College Students',
                    date: '26/03/2026'
                },
                {
                    day: 4,
                    category: 'non-technical',
                    name: 'Dumb Charades',
                    description: 'Act without speaking.',
                    rules: ['Team of 3 members'],
                    rounds: [
                        { roundNumber: 1, description: 'Preliminary' },
                        { roundNumber: 2, description: 'Final' }
                    ],
                    participantCategory: 'Polytechnic College Students',
                    date: '26/03/2026'
                }
            ]);
            res.json({ message: 'Database seeded successfully!' });
        } else {
            res.json({ message: 'Database already has data!' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API Routes
app.get('/api/events', async (req, res) => {
    try {
        if (dbConnected) {
            const events = await Event.find();
            res.json(events);
        } else {
            res.json(fallbackEvents);
        }
    } catch (err) {
        res.json(fallbackEvents);
    }
});

app.get('/api/events/day/:day', async (req, res) => {
    try {
        if (dbConnected) {
            const events = await Event.find({ day: req.params.day });
            res.json(events);
        } else {
            const events = fallbackEvents.filter(e => e.day == req.params.day);
            res.json(events);
        }
    } catch (err) {
        const events = fallbackEvents.filter(e => e.day == req.params.day);
        res.json(events);
    }
});

app.get('/api/events/:id', async (req, res) => {
    try {
        if (dbConnected) {
            const event = await Event.findById(req.params.id);
            res.json(event);
        } else {
            const event = fallbackEvents.find(e => e._id === req.params.id);
            res.json(event);
        }
    } catch (err) {
        const event = fallbackEvents.find(e => e._id === req.params.id);
        res.json(event);
    }
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/day', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'day.html'));
});

app.get('/event', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'event.html'));
});

// Start server
app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
    if (dbConnected) {
        await seedDatabase();
    }
});
