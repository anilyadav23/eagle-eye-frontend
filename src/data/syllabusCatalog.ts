export interface SubjectItem {
  code: string;
  name: string;
  color: string;
  type?: 'Written Paper' | 'Practical / Sessional' | 'Elective' | 'MNC';
  credits?: number;
}

export const ECC_SUBJECT_CATALOG: Record<string, SubjectItem[]> = {
  // III SEMESTER (B.E II YEAR)
  '3rd Semester': [
    // Written Papers
    { code: '3ECC41A(ECE)', name: 'Advanced Engineering Mathematics-I', color: 'indigo', type: 'Written Paper', credits: 2 },
    { code: '3ECC42A(ECE)', name: 'Network Theory', color: 'sky', type: 'Written Paper', credits: 3 },
    { code: '3ECC43A(ECE)', name: 'Digital Electronics-I', color: 'emerald', type: 'Written Paper', credits: 4 },
    { code: '3ECC44A(ECE)', name: 'Solid State Electronic Devices', color: 'amber', type: 'Written Paper', credits: 3 },
    { code: '3ECC45A(ECE)', name: 'Data Structures', color: 'purple', type: 'Written Paper', credits: 4 },
    { code: '3ECC46A(ECE)', name: 'Object Oriented Programming', color: 'cyan', type: 'Written Paper', credits: 4 },
    // Practicals & Sessionals
    { code: '3ECC41B(ECE)', name: 'Network Lab', color: 'sky', type: 'Practical / Sessional', credits: 1 },
    { code: '3ECC42B(ECE)', name: 'Digital Electronics Lab-I', color: 'emerald', type: 'Practical / Sessional', credits: 1 },
    { code: '3ECC43B(ECE)', name: 'Electronic Devices Lab', color: 'amber', type: 'Practical / Sessional', credits: 1 },
    { code: '3ECC44B(ECE)', name: 'Data Structures Lab', color: 'purple', type: 'Practical / Sessional', credits: 1 },
    { code: '3ECC45B(ECE)', name: 'Object Oriented Programming Lab', color: 'cyan', type: 'Practical / Sessional', credits: 1 },
    { code: '3ECC81C', name: 'Co-curricular Activities (NCC/NSS/NSO/Yoga/Scout)', color: 'emerald', type: 'MNC' }
  ],

  // IV SEMESTER (B.E II YEAR)
  '4th Semester': [
    // Written Papers
    { code: '4ECC41A(ECE)', name: 'Advanced Engineering Mathematics-II', color: 'indigo', type: 'Written Paper', credits: 2 },
    { code: '4ECC42A(ECE)', name: 'Digital Electronics-II', color: 'emerald', type: 'Written Paper', credits: 3 },
    { code: '4ECC43A(ECE)', name: 'Electronics Circuits', color: 'amber', type: 'Written Paper', credits: 4 },
    { code: '4ECC44A(ECE)', name: 'Discrete Structures', color: 'purple', type: 'Written Paper', credits: 4 },
    { code: '4ECC45A(ECE)', name: 'Principles of Programming Languages', color: 'sky', type: 'Written Paper', credits: 4 },
    { code: '4ECC-OEC', name: 'Open Elective-I (Inter-Department)', color: 'teal', type: 'Elective', credits: 3 },
    // Practicals & Sessionals
    { code: '4ECC41B(ECE)', name: 'Digital Electronics Lab-II', color: 'emerald', type: 'Practical / Sessional', credits: 1 },
    { code: '4ECC42B(ECE)', name: 'Electronics Circuits Lab', color: 'amber', type: 'Practical / Sessional', credits: 1 },
    { code: '4ECC43B(ECE)', name: 'Programming Languages Lab', color: 'sky', type: 'Practical / Sessional', credits: 1 },
    { code: '4ECC44B(ECE)', name: 'Logic Design Simulation & Testing Lab', color: 'indigo', type: 'Practical / Sessional', credits: 1 },
    { code: '4ECC45B(ECE)', name: 'Electronics Workshop', color: 'purple', type: 'Practical / Sessional', credits: 1 },
    { code: '4ECC81C', name: 'Co-curricular Activities', color: 'emerald', type: 'MNC' }
  ],

  // V SEMESTER (B.E III YEAR)
  '5th Semester': [
    // Written Papers
    { code: '5ECC41A(ECE)', name: 'Analog Communication Engineering', color: 'sky', type: 'Written Paper', credits: 3 },
    { code: '5ECC42A(ECE)', name: 'Computer Organisation', color: 'indigo', type: 'Written Paper', credits: 3 },
    { code: '5ECC43A(ECE)', name: 'Design of Databases', color: 'emerald', type: 'Written Paper', credits: 4 },
    { code: '5ECC44A(ECE)', name: 'Integrated Circuits Fabrication Technology', color: 'amber', type: 'Written Paper', credits: 4 },
    { code: '5ECC45A(ECE)', name: 'Computer Graphics & Devices', color: 'purple', type: 'Written Paper', credits: 4 },
    { code: '5ECC-OEC', name: 'Open Elective-II (Inter-Department)', color: 'teal', type: 'Elective', credits: 3 },
    // Practicals & Sessionals
    { code: '5ECC41B(ECE)', name: 'Analog Communication Lab', color: 'sky', type: 'Practical / Sessional', credits: 1 },
    { code: '5ECC42B(ECE)', name: 'Databases Lab', color: 'emerald', type: 'Practical / Sessional', credits: 1 },
    { code: '5ECC43B(ECE)', name: 'Integrated Circuits Lab', color: 'amber', type: 'Practical / Sessional', credits: 1 },
    { code: '5ECC44B(ECE)', name: 'Computer Graphics Lab', color: 'purple', type: 'Practical / Sessional', credits: 1 },
    { code: '5ECC45B(ECE)', name: 'Computer Workshop', color: 'cyan', type: 'Practical / Sessional', credits: 1 },
    { code: '5ECC81C', name: 'Co-curricular Activities', color: 'emerald', type: 'MNC' }
  ],

  // VI SEMESTER (B.E III YEAR)
  '6th Semester': [
    // Written Papers
    { code: '6ECC41A(ECE)', name: 'Digital Communication Systems', color: 'sky', type: 'Written Paper', credits: 4 },
    { code: '6ECC42A(ECE)', name: 'Microprocessor & Microcomputers', color: 'indigo', type: 'Written Paper', credits: 4 },
    { code: '6ECC43A(ECE)', name: 'Design of Operating Systems', color: 'emerald', type: 'Written Paper', credits: 4 },
    { code: '6ECC44A(ECE)', name: 'Multimedia Technology', color: 'purple', type: 'Written Paper', credits: 4 },
    { code: '6ECC45A(ECE)', name: 'Business Information Systems', color: 'amber', type: 'Written Paper', credits: 3 },
    { code: '6ECC-OEC', name: 'Open Elective-III (Inter-Department)', color: 'teal', type: 'Elective', credits: 3 },
    // Practicals & Sessionals
    { code: '6ECC41B(ECE)', name: 'Digital Communication Lab', color: 'sky', type: 'Practical / Sessional', credits: 1 },
    { code: '6ECC42B(ECE)', name: 'Microprocessor Lab', color: 'indigo', type: 'Practical / Sessional', credits: 1 },
    { code: '6ECC43B(ECE)', name: 'Operating Systems Lab', color: 'emerald', type: 'Practical / Sessional', credits: 1 },
    { code: '6ECC44B(ECE)', name: 'Multimedia Lab', color: 'purple', type: 'Practical / Sessional', credits: 1 },
    { code: '6ECC45B(ECE)', name: 'Business Automation Lab', color: 'amber', type: 'Practical / Sessional', credits: 1 },
    { code: '6ECC81C', name: 'Co-curricular Activities', color: 'emerald', type: 'MNC' }
  ],

  // VII SEMESTER (B.E IV YEAR)
  '7th Semester': [
    // Written Papers
    { code: '7ECC41A(ECE)', name: 'Computer Communication & Data Networks', color: 'sky', type: 'Written Paper', credits: 4 },
    { code: '7ECC42A(ECE)', name: 'VLSI Design Techniques', color: 'emerald', type: 'Written Paper', credits: 4 },
    { code: '7ECC43A(ECE)', name: 'Real Time & Embedded System', color: 'indigo', type: 'Written Paper', credits: 4 },
    { code: '7ECC44A(ECE)', name: 'Parallel Processing Technology', color: 'purple', type: 'Written Paper', credits: 4 },
    { code: '7ECC-PEC1', name: 'Core Elective-I', color: 'amber', type: 'Elective', credits: 3 },
    { code: '7ECC-PEC2', name: 'Core Elective-II', color: 'teal', type: 'Elective', credits: 3 },
    // Practicals & Sessionals
    { code: '7ECC41B(ECE)', name: 'Computer Networking Lab', color: 'sky', type: 'Practical / Sessional', credits: 1 },
    { code: '7ECC42B(ECE)', name: 'VLSI Simulation Lab', color: 'emerald', type: 'Practical / Sessional', credits: 1 },
    { code: '7ECC43B(ECE)', name: 'Embedded Systems Lab', color: 'indigo', type: 'Practical / Sessional', credits: 1 },
    { code: '7ECC44B(ECE)', name: 'Advance Computer Lab', color: 'purple', type: 'Practical / Sessional', credits: 1 },
    { code: '7ECC75B(ECE)', name: 'Project Phase-I', color: 'amber', type: 'Practical / Sessional', credits: 4 },
    { code: '7ECC81C', name: 'Co-curricular Activities', color: 'emerald', type: 'MNC' }
  ],

  // VIII SEMESTER (B.E IV YEAR - Project & Capstone)
  '8th Semester': [
    { code: '8ECC41A(ECE)', name: 'Optical Fiber Communications', color: 'sky', type: 'Written Paper', credits: 4 },
    { code: '8ECC42A(ECE)', name: 'Wireless & Mobile Communication', color: 'indigo', type: 'Written Paper', credits: 4 },
    { code: '8ECC-PEC3', name: 'Core Elective-III', color: 'amber', type: 'Elective', credits: 3 },
    { code: '8ECC-PEC4', name: 'Core Elective-IV', color: 'teal', type: 'Elective', credits: 3 },
    { code: '8ECC75B(ECE)', name: 'Major Project Phase-II / Industrial Internship', color: 'emerald', type: 'Practical / Sessional', credits: 8 },
    { code: '8ECC81C', name: 'Co-curricular / Seminar & Comprehensive Viva', color: 'purple', type: 'MNC' }
  ]
};

// Complete Academic Syllabus Catalog matching official departmental schemes
export const MASTER_BRANCH_SUBJECT_CATALOG: Record<string, Record<string, SubjectItem[]>> = {
  'Electronics & Communication Engineering': ECC_SUBJECT_CATALOG,
  'ECC': ECC_SUBJECT_CATALOG,
  'ECE': ECC_SUBJECT_CATALOG,
  'Electronics & Computer Control (ECC)': ECC_SUBJECT_CATALOG,
  'Computer Science & Engineering': {
    '1st Semester': [
      { code: 'CS101', name: 'Programming Fundamentals in C', color: 'sky', type: 'Written Paper', credits: 4 },
      { code: 'MA101', name: 'Engineering Mathematics-I', color: 'indigo', type: 'Written Paper', credits: 4 },
      { code: 'PH101', name: 'Engineering Physics', color: 'emerald', type: 'Written Paper', credits: 4 },
      { code: 'CS102', name: 'Digital Logic & Design', color: 'amber', type: 'Written Paper', credits: 3 }
    ],
    '2nd Semester': [
      { code: 'CS201', name: 'Object Oriented Programming (C++)', color: 'sky', type: 'Written Paper', credits: 4 },
      { code: 'MA201', name: 'Engineering Mathematics-II', color: 'indigo', type: 'Written Paper', credits: 4 },
      { code: 'CS202', name: 'Discrete Mathematical Structures', color: 'emerald', type: 'Written Paper', credits: 4 },
      { code: 'CS203', name: 'Data Structures & Algorithms Basics', color: 'amber', type: 'Written Paper', credits: 4 }
    ],
    '3rd Semester': [
      { code: '3CS41A', name: 'Advanced Engineering Mathematics', color: 'indigo', type: 'Written Paper', credits: 3 },
      { code: '3CS42A', name: 'Data Structures & Algorithms', color: 'sky', type: 'Written Paper', credits: 4 },
      { code: '3CS43A', name: 'Digital Electronics', color: 'emerald', type: 'Written Paper', credits: 3 },
      { code: '3CS44A', name: 'Database Management Systems', color: 'amber', type: 'Written Paper', credits: 4 },
      { code: '3CS45A', name: 'Object Oriented Programming using Java', color: 'purple', type: 'Written Paper', credits: 4 },
      { code: '3CS41B', name: 'Data Structures Lab', color: 'sky', type: 'Practical / Sessional', credits: 1 },
      { code: '3CS42B', name: 'Database Systems Lab', color: 'amber', type: 'Practical / Sessional', credits: 1 },
      { code: '3CS43B', name: 'Java Programming Lab', color: 'purple', type: 'Practical / Sessional', credits: 1 }
    ],
    '4th Semester': [
      { code: '4CS41A', name: 'Discrete Mathematics', color: 'indigo', type: 'Written Paper', credits: 3 },
      { code: '4CS42A', name: 'Operating Systems', color: 'emerald', type: 'Written Paper', credits: 4 },
      { code: '4CS43A', name: 'Computer Organization & Architecture', color: 'sky', type: 'Written Paper', credits: 4 },
      { code: '4CS44A', name: 'Design & Analysis of Algorithms', color: 'purple', type: 'Written Paper', credits: 4 },
      { code: '4CS41B', name: 'Operating Systems Lab', color: 'emerald', type: 'Practical / Sessional', credits: 1 },
      { code: '4CS42B', name: 'Algorithms Lab', color: 'purple', type: 'Practical / Sessional', credits: 1 }
    ],
    '5th Semester': [
      { code: '5CS41A', name: 'Theory of Computation', color: 'indigo', type: 'Written Paper', credits: 4 },
      { code: '5CS42A', name: 'Computer Networks', color: 'sky', type: 'Written Paper', credits: 4 },
      { code: '5CS43A', name: 'Software Engineering', color: 'emerald', type: 'Written Paper', credits: 3 },
      { code: '5CS44A', name: 'Artificial Intelligence & Machine Learning', color: 'purple', type: 'Written Paper', credits: 4 },
      { code: '5CS41B', name: 'Computer Networks Lab', color: 'sky', type: 'Practical / Sessional', credits: 1 },
      { code: '5CS42B', name: 'AI & ML Lab', color: 'purple', type: 'Practical / Sessional', credits: 1 }
    ]
  }
};
