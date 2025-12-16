import React, { useState } from "react";

type SectionKey =
  | "primary"
  | "contact"
  | "address"
  | "relatives"
  | "identity"
  | "education"
  | "experience";

type SectionConfig = {
  key: SectionKey;
  index: number;
  title: string;
  progress: number;
};

const sections: SectionConfig[] = [
  { key: "primary", index: 1, title: "Primary Details", progress: 80 },
  { key: "contact", index: 2, title: "Contact Information", progress: 100 },
  { key: "address", index: 3, title: "Address Information", progress: 90 },
  { key: "relatives", index: 4, title: "Relations / Dependents", progress: 60 },
  { key: "identity", index: 5, title: "Identity Documents & Verification", progress: 100 },
  { key: "education", index: 6, title: "Education Background", progress: 70 },
  { key: "experience", index: 7, title: "Work Experience", progress: 85 },
];

const MePage: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    primary: true,
    contact: true,
    address: true,
    relatives: true,
    identity: true,
    education: true,
    experience: true,
  });

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#F3F4F8]">
      {/* Top Banner
      <div className="relative bg-[#0B2559] h-40 md:h-52 w-full overflow-hidden">
        <img
          src="/Dashboard/ProfileBannerPattern.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        />
      </div> */}    

      {/* Main content - FULL WIDTH, no side padding */}
      <div className="-mt-16 pb-10" style={{ padding: "16px"}}>
        {/* Profile Header Card */}
        <div className="bg-white  rounded-t-none px-4 md:px-10 py-4 md:py-6 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center w-full">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-none border-[4px] border-[#FFE500] overflow-hidden bg-gray-100">
              <img
                src="/Dashboard/UserPic.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-white">
                  Vaishno Medavaram
                </h1>
                <p className="text-sm text-white/80">
                  Center of Excellence
                </p>
                <p className="text-sm text-white/80 font-medium">
                  Head of COE
                </p>
              </div>

              {/* Dept / RM like in screenshot */}
              <div className="text-xs text-white/80 text-right space-y-1">
                <p>
                  <span className="font-semibold">Dept:</span> Center of Excellence
                </p>
                <p>
                  <span className="font-semibold">RM:</span> John Doe
                </p>
              </div>
            </div>

            {/* Contact pills row */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill>vaishno@aidenai.com</Pill>
              <Pill>(999) 999 999</Pill>
              <Pill>Aiden AI, USA/India</Pill>
              <Pill>9999</Pill>
            </div>
          </div>
        </div>

        {/* Tabs bar (full width, no side padding) */}
        <div className="bg-white border-b border-neutral-200 w-full">
          <div className="flex text-sm font-medium">
            {["Summary", "Profile", "Job", "Documents", "Assets"].map((tab, idx) => (
              <button
                key={tab}
                className={`flex-1 text-center py-3 border-b-2 ${
                  idx === 1
                    ? "border-[#1D4ED8] text-[#1D4ED8] bg-[#E5EDF9]"
                    : "border-transparent text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Sections (full width) */}
        <div className="mt-4 space-y-6" style={{padding:"10px"}}>
          {/* Primary Details */}
          <SectionCard
            config={sections[0]}
            open={openSections.primary}
            onToggle={() => toggleSection("primary")}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{padding:"20px"}}>
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-neutral-700" >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="Vaishno"
                  placeholder="First Name"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-none bg-white text-[15px]"
                  style ={{padding:"8px",borderRadius:"7px"}}
                />
              </div>

              {/* Middle Name */}
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-neutral-700">
                  Middle Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="-Not Set-"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-none bg-white text-[15px]"
                  style ={{padding:"8px",borderRadius:"7px"}}
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-neutral-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="Medavaram"
                  placeholder="Last Name"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-none bg-white text-[15px]"
                  style ={{padding:"8px",borderRadius:"7px"}}
                />
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-neutral-700">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <select defaultValue="B+" className="w-full px-3 py-2 border border-neutral-300 rounded-none bg-white text-sm">
                  <option>B+</option>
                  <option>B-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>

              {/* Marital Status */}
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-neutral-700">
                  Marital Status <span className="text-red-500">*</span>
                </label>
                <select defaultValue="Single" className="w-full px-3 py-2 border border-neutral-300 rounded-none bg-white text-sm">
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                </select>
              </div>

              {/* Nationality */}
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-neutral-700">
                  Nationality <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="Indian"
                  placeholder="Nationality"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-none bg-white text-[15px]"
                  style ={{padding:"8px",borderRadius:"7px"}}
                />
              </div>

              {/* Employee ID */}
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-neutral-700">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="AID-2741"
                  placeholder="Employee ID"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-none bg-white text-[15px]"
                    style ={{padding:"8px",borderRadius:"7px"}}
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-neutral-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4 pt-2" >
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="Female" />
                    <span className="text-sm">Female</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="Male" defaultChecked />
                    <span className="text-sm">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="Other" />
                    <span className="text-sm">Other</span>
                  </label>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-neutral-700">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue="17 Feb 1997"
                  placeholder="DD Mon YYYY"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-none bg-white text-[15px]"
                  style ={{padding:"8px",borderRadius:"7px"}}
                />
              </div>
            </div>
          </SectionCard>

          {/* Contact Information */}
          <SectionCard
            config={sections[1]}
            open={openSections.contact}
            onToggle={() => toggleSection("contact")}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Field label="Official Email" value="rohan@aidenai.com" required />
              <Field label="Personal Email" value="-Not Set-" required />
              <Field label="Phone Number" value="(999) 999 999" required />
              <Field label="Emergency Contact" value="(999) 999 999" required />
            </div>
          </SectionCard>

          {/* Address Information */}
          <SectionCard
            config={sections[2]}
            open={openSections.address}
            onToggle={() => toggleSection("address")}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Field label="Current Address" value="Flat 309, Gowra Palladium, Raidurg" />
              <Field label="City" value="Hyderabad" />
              <Field label="State" value="Telangana" />
              <Field label="Postal Code" value="500081" />
              <Field label="Country" value="India" />
            </div>
          </SectionCard>

          {/* Relations / Dependents */}
          <SectionCard
            config={sections[3]}
            open={openSections.relatives}
            onToggle={() => toggleSection("relatives")}
          >
            <div className="mb-4">
              <button className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md bg-[#0B2559] text-white">
                ADD RELATION +
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DependentCard
                title="Relation 1: Father"
                name="Rajesh Mehta"
                phone="+91 9988776655"
                age="63"
                livesWith="No"
              />
              <DependentCard
                title="Relation 1: Sibling"
                name="Aryan Mehta"
                phone="+91 9988776655"
                age="28"
                livesWith="No"
              />
            </div>
          </SectionCard>

          {/* Identity Documents & Verification */}
          <SectionCard
            config={sections[4]}
            open={openSections.identity}
            onToggle={() => toggleSection("identity")}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <IdentityField
                label="Aadhaar Number"
                value="XXXX-XXXX-3456"
              />
              <IdentityField
                label="PAN Number"
                value="ABCDE1234F"
              />
              <IdentityField
                label="Passport Number"
                value="M435677B (Expires: 17 May 2031)"
              />
            </div>
          </SectionCard>

          {/* Education Background */}
          <SectionCard
            config={sections[5]}
            open={openSections.education}
            onToggle={() => toggleSection("education")}
          >
            <div className="mb-4">
              <button className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md bg-[#0B2559] text-white">
                ADD +
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-neutral-200 rounded-none p-4 text-xs">
                <p className="font-semibold mb-2">Education 1</p>
                <p>
                  <span className="font-semibold">Degree:</span> B.Tech – Computer Science
                </p>
                <p>
                  <span className="font-semibold">Institution:</span> IIT Gwalior
                </p>
                <p>
                  <span className="font-semibold">Passing Year:</span> 2019
                </p>
                <p>
                  <span className="font-semibold">Grade:</span> 8.3 CGPA
                </p>
              </div>

              <div className="border border-neutral-200 rounded-none p-4 text-xs">
                <p className="font-semibold mb-2">Education 2</p>
                <p>
                  <span className="font-semibold">Certification:</span> Deep Learning Specialization
                </p>
                <p>
                  <span className="font-semibold">Provider:</span> Coursera : Andrew Ng
                </p>
                <p>
                  <span className="font-semibold">Year:</span> 2021
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Work Experience */}
          <SectionCard
            config={sections[6]}
            open={openSections.experience}
            onToggle={() => toggleSection("experience")}
          >
            <div className="mb-4">
              <button className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md bg-[#0B2559] text-white">
                ADD +
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ExperienceCard
                title="Experience 1"
                role="AI Engineer"
                company="Aiden"
                duration="July 2021 – Present"
                responsibilities={[
                  "Built internal GenAI chatbot prototypes",
                  "Developed ML classification models",
                  "Created scalable feature pipelines",
                ]}
              />
              <ExperienceCard
                title="Experience 2"
                role="ML Developer"
                company="TechNova Systems"
                duration="June 2019 – June 2021"
                responsibilities={[
                  "Built forecasting models",
                  "Developed ETL pipelines",
                  "Supported model deployment workflows",
                ]}
              />
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

/* ---------- Reusable Components ---------- */

const SectionCard: React.FC<{
  config: SectionConfig;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ config, open, onToggle, children }) => {
  return (
    <div className="bg-white border-t border-b border-neutral-200">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 md:px-10 py-3 md:py-4"
        style={{padding:"15px"}}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#E9F0FF] text-[#1D4ED8] text-xs font-semibold">
            {config.index}
          </span>
          <span className="text-sm md:text-base font-semibold text-neutral-900">
            {config.title}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* Progress bar on right like screenshot */}
          <div className="hidden md:flex flex-col items-end gap-1">
            <span className="text-[11px] text-neutral-500">
              {config.progress}%
            </span>
            <div className="w-40 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#22C55E] rounded-full"
                style={{ width: `${config.progress}%` }}
              />
            </div>
          </div>
          {/* Arrow */}
          <span
            className={`inline-block transform transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            <img
              src="/Dashboard/RightArrow.svg"
              alt="Toggle"
              className="w-4 h-4"
            />
          </span>
        </div>
      </button>

      {/* Body */}
      {open && (
        <div className="px-4 md:px-10 pb-5 pt-2 border-t border-neutral-200">
          {children}
        </div>
      )}
    </div>
  );
};

const Field: React.FC<{ label: string; value: string; required?: boolean }> = ({
  label,
  value,
  required,
}) => (
  <div className="space-y-1">
    <p className="text-[11px] font-semibold text-neutral-700">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </p>
    <div className="w-full text-sm text-neutral-900 border border-neutral-300 rounded-none px-3 py-2 bg-white" style={{padding:"10px"}}>
      {value}
    </div>
  </div>
);

const DependentCard: React.FC<{
  title: string;
  name: string;
  phone: string;
  age: string;
  livesWith: string;
}> = ({ title, name, phone, age, livesWith }) => (
  <div className="border border-neutral-200 rounded-none p-4 text-xs">
    <p className="font-semibold mb-2">{title}</p>
    <p>
      <span className="font-semibold">Name:</span> {name}
    </p>
    <p>
      <span className="font-semibold">Phone:</span> {phone}
    </p>
    <p>
      <span className="font-semibold">Age:</span> {age}
    </p>
    <p>
      <span className="font-semibold">Lives With Employee:</span> {livesWith}
    </p>
  </div>
);

const IdentityField: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="space-y-1">
    <p className="text-[11px] font-semibold text-neutral-700">
      {label} <span className="text-red-500">*</span>
    </p>
    <div className="flex items-center gap-2">
      <div className="flex-1 text-sm text-neutral-900 border border-neutral-300 rounded-none px-3 py-2 bg-white">
        {value}
      </div>
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-none bg-green-100">
        <span className="w-3 h-3 rounded-none bg-green-500" />
      </span>
    </div>
  </div>
);

const ExperienceCard: React.FC<{
  title: string;
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
}> = ({ title, role, company, duration, responsibilities }) => (
  <div className="border border-neutral-200 rounded-none p-4 text-xs space-y-2">
    <p className="font-semibold">{title}</p>
    <p>
      <span className="font-semibold">Role:</span> {role}
    </p>
    <p>
      <span className="font-semibold">Company:</span> {company}
    </p>
    <p>
      <span className="font-semibold">Duration:</span> {duration}
    </p>
    <div className="mt-2">
      <p className="font-semibold mb-1">Responsibilities:</p>
      <ul className="list-disc pl-5 space-y-1">
        {responsibilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[11px] text-white">
    {children}
  </div>
);

export default MePage;
