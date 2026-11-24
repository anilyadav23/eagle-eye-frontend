export interface SubjectItem {
  code: string;
  name: string;
  color: string;
  type?: 'Written Paper' | 'Practical / Sessional' | 'Elective' | 'MNC';
  credits?: number;
}

// -------------------------------------------------------------
// 1. ELECTRONICS & COMMUNICATION ENGINEERING (ECE)
// -------------------------------------------------------------
export const ECE_SUBJECT_CATALOG: Record<string, SubjectItem[]> = {
  // III SEMESTER (B.TECH II YEAR ECE)
  '3rd Semester': [
    // Theory Papers
    { code: '3ECE41A(ECE)', name: 'Advanced Engineering Mathematics-I', color: 'indigo', type: 'Written Paper', credits: 2 },
    { code: '3ECE42A(ECE)', name: 'Network Theory', color: 'sky', type: 'Written Paper', credits: 3 },
    { code: '3ECE43A(ECE)', name: 'Digital Electronics-I', color: 'emerald', type: 'Written Paper', credits: 4 },
    { code: '3ECE44A(ECE)', name: 'Electronic Circuits-I', color: 'amber', type: 'Written Paper', credits: 4 },
    { code: '3ECE45A(ECE)', name: 'Solid State Electronic Devices', color: 'purple', type: 'Written Paper', credits: 3 },
    { code: '3ECE46A(ECE)', name: 'Electronic Instruments & Measurements', color: 'cyan', type: 'Written Paper', credits: 3 },
    // Practicals and Sessionals
    { code: '3ECE41B(ECE)', name: 'Network Laboratory', color: 'sky', type: 'Practical / Sessional', credits: 1 },
    { code: '3ECE42B(ECE)', name: 'Digital Electronics Lab-I', color: 'emerald', type: 'Practical / Sessional', credits: 1 },
    { code: '3ECE43B(ECE)', name: 'Electronic Circuits Lab-I', color: 'amber', type: 'Practical / Sessional', credits: 1 },
    { code: '3ECE44B(ECE)', name: 'Instruments & Measurement Lab', color: 'cyan', type: 'Practical / Sessional', credits: 1 },
    { code: '3ECE45B(ECE)', name: 'Logic System Design-I', color: 'indigo', type: 'Practical / Sessional', credits: 1 },
    { code: '3ECE46B(ECE)', name: 'Computer Programming', color: 'purple', type: 'Practical / Sessional', credits: 1 }
  ],

  // IV SEMESTER (B.TECH II YEAR ECE)
  '4th Semester': [
    // Theory Papers
    { code: '4ECE41A(ECE)', name: 'Advanced Engineering Mathematics-II', color: 'indigo', type: 'Written Paper', credits: 2 },
    { code: '4ECE42A(ECE)', name: 'Digital Electronics-II', color: 'emerald', type: 'Written Paper', credits: 3 },
    { code: '4ECE43A(ECE)', name: 'Industrial Electronics', color: 'amber', type: 'Written Paper', credits: 4 },
    { code: '4ECE44A(ECE)', name: 'Electronics Circuits-II', color: 'rose', type: 'Written Paper', credits: 4 },
    { code: '4ECE45A(ECE)', name: 'R.F. Circuits & Systems', color: 'sky', type: 'Written Paper', credits: 3 },
    { code: '4ECE-OEC', name: 'Open Elective-I (Inter-Department)', color: 'teal', type: 'Elective', credits: 3 },
    // Practicals and Sessionals
    { code: '4ECE41B(ECE)', name: 'Digital Electronics Lab-II', color: 'emerald', type: 'Practical / Sessional', credits: 1 },
    { code: '4ECE42B(ECE)', name: 'Industrial Electronics Lab', color: 'amber', type: 'Practical / Sessional', credits: 1 },
    { code: '4ECE43B(ECE)', name: 'Electronics Circuits Lab-II', color: 'rose', type: 'Practical / Sessional', credits: 1 },
    { code: '4ECE44B(ECE)', name: 'R.F. Circuits Lab', color: 'sky', type: 'Practical / Sessional', credits: 1 },
    { code: '4ECE45B(ECE)', name: 'Logic System Design Lab-II', color: 'indigo', type: 'Practical / Sessional', credits: 1 },
    { code: '4ECE81C', name: 'Co-curricular Activities', color: 'emerald', type: 'MNC' }
  ],

  // V SEMESTER (B.TECH III YEAR ECE)
  '5th Semester': [
    // Theory Papers
    { code: '5ECE41A(ECE)', name: 'Analog Communication Engineering', color: 'sky', type: 'Written Paper', credits: 3 },
    { code: '5ECE42A(ECE)', name: 'Computer Organisation', color: 'indigo', type: 'Written Paper', credits: 3 },
    { code: '5ECE43A(ECE)', name: 'Theory & Applications of Integrated Circuits', color: 'emerald', type: 'Written Paper', credits: 4 },
    { code: '5ECE44A(ECE)', name: 'Radiation & Wave Propagation-I', color: 'amber', type: 'Written Paper', credits: 4 },
    { code: '5ECE45A(ECE)', name: 'Feedback Systems / Signal Engineering', color: 'purple', type: 'Elective', credits: 3 },
    { code: '5ECE-OEC', name: 'Open Elective-II (Inter-Department)', color: 'teal', type: 'Elective', credits: 3 },
    // Practicals and Sessionals
    { code: '5ECE41B(ECE)', name: 'Analog Communication Lab', color: 'sky', type: 'Practical / Sessional', credits: 1 },
    { code: '5ECE42B(ECE)', name: 'Integrated Circuits Lab', color: 'emerald', type: 'Practical / Sessional', credits: 1 },
    { code: '5ECE43B(ECE)', name: 'Radiation & Wave Propagation Lab-I', color: 'amber', type: 'Practical / Sessional', credits: 1 },
    { code: '5ECE44B(ECE)', name: 'Feedback System Lab', color: 'purple', type: 'Practical / Sessional', credits: 1 },
    { code: '5ECE45B(ECE)', name: 'Electronics Workshop', color: 'cyan', type: 'Practical / Sessional', credits: 1 },
    { code: '5ECE71B(ECE)', name: 'Practical Training-I (45 Days)', color: 'blue', type: 'Practical / Sessional', credits: 1 }
  ],

  // VI SEMESTER (B.TECH III YEAR ECE)
  '6th Semester': [
    // Theory Papers
    { code: '6ECE41A(ECE)', name: 'Digital Communication Systems', color: 'sky', type: 'Written Paper', credits: 4 },
    { code: '6ECE42A(ECE)', name: 'Microprocessor & Microcomputers', color: 'indigo', type: 'Written Paper', credits: 4 },
    { code: '6ECE43A(ECE)', name: 'Radiation & Wave Propagation-II', color: 'amber', type: 'Written Paper', credits: 3 },
    { code: '6ECE44A(ECE)', name: 'Digital Signal Processing', color: 'emerald', type: 'Written Paper', credits: 3 },
    { code: '6ECE45A(ECE)', name: 'Microwave Engineering', color: 'purple', type: 'Written Paper', credits: 4 },
    { code: '6ECE-OEC', name: 'Open Elective-III', color: 'teal', type: 'Elective', credits: 3 },
    // Practicals and Sessionals
    { code: '6ECE41B(ECE)', name: 'Digital Communication Lab', color: 'sky', type: 'Practical / Sessional', credits: 1 },
    { code: '6ECE42B(ECE)', name: 'Microprocessor Lab', color: 'indigo', type: 'Practical / Sessional', credits: 1 },
    { code: '6ECE43B(ECE)', name: 'Radiation & Wave Propagation Lab-II', color: 'amber', type: 'Practical / Sessional', credits: 1 },
    { code: '6ECE44B(ECE)', name: 'DSP LAB', color: 'emerald', type: 'Practical / Sessional', credits: 1 },
    { code: '6ECE45B(ECE)', name: 'Microwave Lab', color: 'purple', type: 'Practical / Sessional', credits: 1 },
    { code: '6ECE81C', name: 'Co-curricular Activities', color: 'emerald', type: 'MNC' }
  ],

  // VII SEMESTER (B.TECH IV YEAR ECE)
  '7th Semester': [
    // Theory Papers
    { code: '7ECE41A(ECE)', name: 'Computer Communication & Data Networks', color: 'sky', type: 'Written Paper', credits: 4 },
    { code: '7ECE42A(ECE)', name: 'Advanced Communication Systems', color: 'emerald', type: 'Written Paper', credits: 4 },
    { code: '7ECE43A(ECE)', name: 'Advanced Computer Technology', color: 'indigo', type: 'Written Paper', credits: 4 },
    { code: '7ECE44A(ECE)', name: 'Mobile Communication', color: 'purple', type: 'Written Paper', credits: 3 },
    { code: '7ECE-PEC1', name: 'Core Elective-I', color: 'amber', type: 'Elective', credits: 4 },
    { code: '7ECE-PEC2', name: 'Core Elective-II', color: 'teal', type: 'Elective', credits: 4 },
    // Practicals and Sessionals
    { code: '7ECE41B(ECE)', name: 'Computer Networking Lab ECE', color: 'sky', type: 'Practical / Sessional', credits: 1 },
    { code: '7ECE42B(ECE)', name: 'Advanced Communication Systems Lab', color: 'emerald', type: 'Practical / Sessional', credits: 1 },
    { code: '7ECE43B(ECE)', name: 'Advanced Computer Lab', color: 'indigo', type: 'Practical / Sessional', credits: 1 },
    { code: '7ECE74B(ECE)', name: 'Minor Project', color: 'amber', type: 'Practical / Sessional', credits: 1 },
    { code: '7ECE71B(ECE)', name: 'Practical training-II', color: 'blue', type: 'Practical / Sessional', credits: 1 }
  ],

  // VIII SEMESTER (B.TECH IV YEAR ECE)
  '8th Semester': [
    { code: '8ECE41A(ECE)', name: 'Optical Fiber Communications', color: 'sky', type: 'Written Paper', credits: 4 },
    { code: '8ECE42A(ECE)', name: 'Wireless Sensor & Ad-hoc Networks', color: 'indigo', type: 'Written Paper', credits: 4 },
    { code: '8ECE-PEC3', name: 'Core Elective-III', color: 'amber', type: 'Elective', credits: 4 },
    { code: '8ECE-PEC4', name: 'Core Elective-IV', color: 'teal', type: 'Elective', credits: 4 },
    { code: '8ECE75B(ECE)', name: 'Major Project Phase-II / Industrial Internship', color: 'emerald', type: 'Practical / Sessional', credits: 8 },
    { code: '8ECE81C', name: 'Comprehensive Seminar & Viva', color: 'purple', type: 'MNC' }
  ]
};

// -------------------------------------------------------------
// 2. ELECTRICAL & ELECTRONICS ENGINEERING (EEE)
// -------------------------------------------------------------
export const EEE_SUBJECT_CATALOG: Record<string, SubjectItem[]> = {
  // III SEMESTER (B.TECH II YEAR EEE)
  '3rd Semester': [
    // Theory Papers
    { code: '3EEE41A(ECE)', name: 'Advanced Engineering Mathematics-I', color: 'indigo', type: 'Written Paper', credits: 2 },
    { code: '3EEE42A(ECE)', name: 'Network Theory', color: 'sky', type: 'Written Paper', credits: 3 },
    { code: '3EEE43A(ECE)', name: 'Digital Electronics-I', color: 'emerald', type: 'Written Paper', credits: 4 },
    { code: '3EEE44A(ECE)', name: 'Electronics Devices & Circuits-I', color: 'amber', type: 'Written Paper', credits: 3 },
    { code: '3EEE45A(ECE)', name: 'Direct Current Machines', color: 'rose', type: 'Written Paper', credits: 4 },
    { code: '3EEE46A(ECE)', name: 'Measurement & Instruments', color: 'cyan', type: 'Written Paper', credits: 3 },
    // Practicals and Sessionals
    { code: '3EEE41B(ECE)', name: 'Network Lab', color: 'sky', type: 'Practical / Sessional', credits: 1 },
    { code: '3EEE42B(ECE)', name: 'Digital Electronics lab-I', color: 'emerald', type: 'Practical / Sessional', credits: 1 },
    { code: '3EEE43B(ECE)', name: 'Electronic Devices & Circuits Lab-I', color: 'amber', type: 'Practical / Sessional', credits: 1 },
    { code: '3EEE44B(ECE)', name: 'D.C. Machines Lab', color: 'rose', type: 'Practical / Sessional', credits: 1 },
    { code: '3EEE45B(ECE)', name: 'Measurement Lab', color: 'cyan', type: 'Practical / Sessional', credits: 1 },
    { code: '3EEE46B(ECE)', name: 'Computer Programming Lab-I', color: 'purple', type: 'Practical / Sessional', credits: 1 }
  ],

  // IV SEMESTER (B.TECH II YEAR EEE)
  '4th Semester': [
    // Theory Papers
    { code: '4EEE41A(ECE)', name: 'Advanced Engineering Mathematics-II', color: 'indigo', type: 'Written Paper', credits: 2 },
    { code: '4EEE42A(ECE)', name: 'Digital Electronics-II', color: 'emerald', type: 'Written Paper', credits: 3 },
    { code: '4EEE43A(ECE)', name: 'Industrial Electronics', color: 'amber', type: 'Written Paper', credits: 4 },
    { code: '4EEE44A(ECE)', name: 'Electronics Devices & Circuits-II', color: 'rose', type: 'Written Paper', credits: 4 },
    { code: '4EEE45A(ECE)', name: 'Electrical Circuit Theory', color: 'sky', type: 'Written Paper', credits: 4 },
    { code: '4EEE-OEC', name: 'Open Elective-I (Inter-Department)', color: 'teal', type: 'Elective', credits: 3 },
    // Practicals and Sessionals
    { code: '4EEE41B(ECE)', name: 'Digital Electronics Lab-II', color: 'emerald', type: 'Practical / Sessional', credits: 1 },
    { code: '4EEE42B(ECE)', name: 'Industrial Electronics & PLC Lab', color: 'amber', type: 'Practical / Sessional', credits: 1 },
    { code: '4EEE43B(ECE)', name: 'Electronics Devices & Circuits Lab-II', color: 'rose', type: 'Practical / Sessional', credits: 1 },
    { code: '4EEE44B(ECE)', name: 'Electrical Circuits Lab', color: 'sky', type: 'Practical / Sessional', credits: 1 },
    { code: '4EEE45B(ECE)', name: 'Computer Programming Lab-II', color: 'purple', type: 'Practical / Sessional', credits: 1 },
    { code: '4EEE81C(ECE)', name: 'Co-curricular Activities', color: 'emerald', type: 'MNC' }
  ],

  // V SEMESTER (B.TECH III YEAR EEE)
  '5th Semester': [
    // Theory Papers
    { code: '5EEE41A(ECE)', name: 'Radiation & Wave Propagation', color: 'sky', type: 'Written Paper', credits: 3 },
    { code: '5EEE42A(ECE)', name: 'Alternating Current Machines-I', color: 'amber', type: 'Written Paper', credits: 4 },
    { code: '5EEE43A(ECE)', name: 'Computer Organisation and Microprocessor', color: 'indigo', type: 'Written Paper', credits: 4 },
    { code: '5EEE44A(ECE)', name: 'Control Systems', color: 'purple', type: 'Written Paper', credits: 3 },
    { code: '5EEE45A(ECE)', name: 'Analog & Digital Comm. Engineering', color: 'emerald', type: 'Written Paper', credits: 3 },
    { code: '5EEE-OEC', name: 'Open Elective-II (Inter-Department)', color: 'teal', type: 'Elective', credits: 3 },
    // Practicals and Sessionals
    { code: '5EEE41B(ECE)', name: 'A.C. Machines Lab-I', color: 'amber', type: 'Practical / Sessional', credits: 1 },
    { code: '5EEE42B(ECE)', name: 'Microprocessor Lab', color: 'indigo', type: 'Practical / Sessional', credits: 1 },
    { code: '5EEE43B(ECE)', name: 'Control System Lab', color: 'purple', type: 'Practical / Sessional', credits: 1 },
    { code: '5EEE44B(ECE)', name: 'Analog & Digital Comm. Lab', color: 'emerald', type: 'Practical / Sessional', credits: 1 },
    { code: '5EEE45B(ECE)', name: 'Electronics Workshop', color: 'cyan', type: 'Practical / Sessional', credits: 1 },
    { code: '5EEE71B(ECE)', name: 'Practical Training-I (45 Days)', color: 'blue', type: 'Practical / Sessional', credits: 1 }
  ],

  // VI SEMESTER (B.TECH III YEAR EEE)
  '6th Semester': [
    // Theory Papers
    { code: '6EEE41A(ECE)', name: 'Alternating Current Machines-II', color: 'amber', type: 'Written Paper', credits: 4 },
    { code: '6EEE42A(ECE)', name: 'Electrical Power Transmission & Distribution', color: 'sky', type: 'Written Paper', credits: 4 },
    { code: '6EEE43A(ECE)', name: 'Modern Control Systems', color: 'purple', type: 'Written Paper', credits: 3 },
    { code: '6EEE44A(ECE)', name: 'Electrical Power Switch gear & Protection', color: 'rose', type: 'Written Paper', credits: 4 },
    { code: '6EEE45A(ECE)', name: 'Power System Operation & Control', color: 'indigo', type: 'Written Paper', credits: 3 },
    { code: '6EEE-OEC', name: 'Open Elective-III', color: 'teal', type: 'Elective', credits: 3 },
    // Practicals and Sessionals
    { code: '6EEE41B(ECE)', name: 'A.C. Machines Lab-II', color: 'amber', type: 'Practical / Sessional', credits: 1 },
    { code: '6EEE42B(ECE)', name: 'Power Transmission & Distribution Lab', color: 'sky', type: 'Practical / Sessional', credits: 1 },
    { code: '6EEE43B(ECE)', name: 'Modern Control Systems Lab', color: 'purple', type: 'Practical / Sessional', credits: 1 },
    { code: '6EEE44B(ECE)', name: 'Power System Operation & Protection Lab', color: 'rose', type: 'Practical / Sessional', credits: 1 },
    { code: '6EEE45B(ECE)', name: 'Electrical Workshop', color: 'cyan', type: 'Practical / Sessional', credits: 1 },
    { code: '6EEE81C', name: 'Co-curricular Activities', color: 'emerald', type: 'MNC' }
  ],

  // VII SEMESTER (B.TECH IV YEAR EEE)
  '7th Semester': [
    // Theory Papers
    { code: '7EEE41A(ECE)', name: 'Computer Communication Data Networks', color: 'sky', type: 'Written Paper', credits: 4 },
    { code: '7EEE42A(ECE)', name: 'Advance Communication Systems', color: 'emerald', type: 'Written Paper', credits: 3 },
    { code: '7EEE43A(ECE)', name: 'Power Electronics', color: 'rose', type: 'Written Paper', credits: 4 },
    { code: '7EEE44A(ECE)', name: 'Control System Design', color: 'purple', type: 'Written Paper', credits: 3 },
    { code: '7EEE-PEC1', name: 'Core Elective-I', color: 'amber', type: 'Elective', credits: 4 },
    { code: '7EEE-PEC2', name: 'Core Elective-II', color: 'teal', type: 'Elective', credits: 4 },
    // Practicals and Sessionals
    { code: '7EEE41B(ECE)', name: 'Computer Networking Lab (EEE)', color: 'sky', type: 'Practical / Sessional', credits: 1 },
    { code: '7EEE42B(ECE)', name: 'Power Electronics Lab', color: 'rose', type: 'Practical / Sessional', credits: 1 },
    { code: '7EEE43B(ECE)', name: 'Control System Design Lab', color: 'purple', type: 'Practical / Sessional', credits: 1 },
    { code: '7EEE74B(ECE)', name: 'Minor Project', color: 'amber', type: 'Practical / Sessional', credits: 2 },
    { code: '7EEE71B(ECE)', name: 'Practical training-II', color: 'blue', type: 'Practical / Sessional', credits: 1 }
  ],

  // VIII SEMESTER (B.TECH IV YEAR EEE)
  '8th Semester': [
    { code: '8EEE41A(ECE)', name: 'Utilization of Electrical Power & Drives', color: 'rose', type: 'Written Paper', credits: 4 },
    { code: '8EEE42A(ECE)', name: 'High Voltage Engineering', color: 'amber', type: 'Written Paper', credits: 4 },
    { code: '8EEE-PEC3', name: 'Core Elective-III', color: 'sky', type: 'Elective', credits: 4 },
    { code: '8EEE-PEC4', name: 'Core Elective-IV', color: 'teal', type: 'Elective', credits: 4 },
    { code: '8EEE75B(ECE)', name: 'Major Project Phase-II / Industrial Internship', color: 'emerald', type: 'Practical / Sessional', credits: 8 },
    { code: '8EEE81C', name: 'Seminar and Comprehensive Viva', color: 'purple', type: 'MNC' }
  ]
};

// -------------------------------------------------------------
// 3. ELECTRONICS & COMPUTER CONTROL (ECC)
// -------------------------------------------------------------
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
    { code: '3ECC81C', name: 'Co-curricular Activities', color: 'emerald', type: 'MNC' }
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

  // VIII SEMESTER (B.E IV YEAR)
  '8th Semester': [
    { code: '8ECC41A(ECE)', name: 'Optical Fiber Communications', color: 'sky', type: 'Written Paper', credits: 4 },
    { code: '8ECC42A(ECE)', name: 'Wireless & Mobile Communication', color: 'indigo', type: 'Written Paper', credits: 4 },
    { code: '8ECC-PEC3', name: 'Core Elective-III', color: 'amber', type: 'Elective', credits: 3 },
    { code: '8ECC-PEC4', name: 'Core Elective-IV', color: 'teal', type: 'Elective', credits: 3 },
    { code: '8ECC75B(ECE)', name: 'Major Project Phase-II / Industrial Internship', color: 'emerald', type: 'Practical / Sessional', credits: 8 },
    { code: '8ECC81C', name: 'Co-curricular / Seminar & Comprehensive Viva', color: 'purple', type: 'MNC' }
  ]
};

// -------------------------------------------------------------
// MASTER BRANCH SUBJECT CATALOG
// Department: Electronics and Communication Engineering
// Branches: ECE, ECC, EEE
// -------------------------------------------------------------
export const MASTER_BRANCH_SUBJECT_CATALOG: Record<string, Record<string, SubjectItem[]>> = {
  // Electronics & Communication Engineering (ECE)
  'Electronics & Communication Engineering (ECE)': ECE_SUBJECT_CATALOG,
  'ECE': ECE_SUBJECT_CATALOG,
  'Electronics & Communication Engineering': ECE_SUBJECT_CATALOG,

  // Electronics & Computer Control (ECC)
  'Electronics & Computer Control (ECC)': ECC_SUBJECT_CATALOG,
  'ECC': ECC_SUBJECT_CATALOG,

  // Electrical & Electronics Engineering (EEE)
  'Electrical & Electronics Engineering (EEE)': EEE_SUBJECT_CATALOG,
  'EEE': EEE_SUBJECT_CATALOG,
  'Electrical & Electronics Engineering': EEE_SUBJECT_CATALOG
};

// Helper function to resolve curriculum subjects dynamically
export const getBranchSubjects = (branch: string = '', semester: string = '3rd Semester'): SubjectItem[] => {
  const cleanBranch = branch.trim();
  
  if (cleanBranch.includes('EEE') || cleanBranch.toLowerCase().includes('electrical')) {
    return EEE_SUBJECT_CATALOG[semester] || EEE_SUBJECT_CATALOG['3rd Semester'];
  }
  if (cleanBranch.includes('ECC') || cleanBranch.toLowerCase().includes('computer control')) {
    return ECC_SUBJECT_CATALOG[semester] || ECC_SUBJECT_CATALOG['3rd Semester'];
  }
  
  // Default to ECE
  return ECE_SUBJECT_CATALOG[semester] || ECE_SUBJECT_CATALOG['3rd Semester'];
};
