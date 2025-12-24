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

const textInputClass = "w-full h-[40px] pl-4 pr-3 border border-neutral-300 rounded-[7px] bg-white text-[15px]";

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
    primary: false,
    contact: false,
    address: false,
    relatives: false,
    identity: false,
    education: false,
    experience: false,
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'job' | 'documents'>("profile");

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  

  return (

    <div style={{padding:"32px",backgroundColor:"#f0F2F5"}}>
      {/* Top Banner */}
      <div className="relative h-[190px] md:h-[190px] w-full overflow-hidden" style={{marginBottom:"32px"}}>
        <img
          src="me/banner.png"
          alt=""
          className="absolute inset-0 h-[190px] md:h-[190px] object-cover rounded-b-[45px]"
        />
        {/* Banner bottom tabs */}
        <div className="absolute left-20 right-0 bottom-0 z-40 flex items-start gap-6 justify-start pb-2">
          {/* PROFILE TAB */}
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-1 rounded-t-lg text-[14px]  font-semibold ${activeTab === 'profile' ? 'bg-[#ECFFD5] text-black' : 'text-white/90 hover:text-black'} shadow`}
            style={{
              padding: "5px 10px 5px 10px",
              borderBottom: activeTab === 'profile' ? '4px solid #909F7E' : 'none',
              boxShadow: activeTab === 'profile' ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
            }}
          >
            Profile
          </button>
          {/* JOB TAB */}
          <button
            type="button"
            onClick={() => setActiveTab('job')}
            className={`px-4 py-1 rounded-t-lg text-[14px] font-semibold ${activeTab === 'job' ? 'bg-[#ECFFD5] text-black' : 'text-white/90 hover:text-black'} shadow`}
            style={{
              padding: "5px 10px 5px 10px",
              borderBottom: activeTab === 'job' ? '4px solid #909F7E' : 'none',
              boxShadow: activeTab === 'job' ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
            }}
          >
            Job
          </button>
          {/* DOCUMENTS TAB */}
          <button
            type="button"
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-1 rounded-t-lg text-[14px] font-semibold ${activeTab === 'documents' ? 'bg-[#ECFFD5] text-black' : 'text-white/90 hover:text-black'} shadow`}
            style={{
              padding: "5px 10px 5px 10px",
              borderBottom: activeTab === 'documents' ? '4px solid #909F7E' : 'none',
              boxShadow: activeTab === 'documents' ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
            }}
          >
            Documents
          </button>
        </div>
      </div>    

      {/* Tabs bar (full width, no side padding) - moved below hero/banner
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
      </div> */}

      {/* Main content - FULL WIDTH, no side padding */}
      <div className="-mt-16 pb-10 bg-white rounded-[20px]" style={{ padding: "24px"}}>
        {/* Profile Header Card */}
        <div className=" rounded px-4 md:px-10 py-4 md:py-6 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center w-full">
          {/* Avatar */}
          

          {/* Info */}
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3" style={{paddingBottom:"15px"}}>
              <div>
                <h1 className="text-[21px] md:text-2xl font-semibold">
                  {localStorage.getItem('user_name') || 'User'}
                </h1>
                {/* <p className="text-sm text-black/80">
                  Center of Excellence
                </p> */}
                <p className="text-[12px] text-black/60 font-[5px]">
                  Head of COE
                </p>
                <div className="mt-4 flex flex-wrap gap-2" style={{paddingTop:"20px"}}>
                  <span className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md border border-black/20 text-[11px] text-white/80 bg-[#076363]" style={{padding:"5px 5px 5px 5px"}}><img src='/me/mail.png' style={{height:'12px'} }/>{localStorage.getItem('user_email') || ''}</span>
                  <span className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md bg-[#7B24EB] border border-black/20 text-[11px] text-white/80" style={{padding:"5px 5px 5px 5px"}}><img src='/me/phone.png' style={{height:'15px'} }/>(999) 999 999</span>
                  <span className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md bg-[#FF6B0E] border border-black/20 text-[11px] text-white/80" style={{padding:"5px 5px 5px 5px"}}><img src='/me/location.png' style={{height:'15px'} }/>Aiden AI, USA/India</span>
                  <span className="inline-flex items-center gap-2 px-2 py-1.5 rounded-md bg-[#0EA3FF] border border-black/20 text-[11px] text-white/80" style={{padding:"5px 5px 5px 5px"}}><img src='/me/idcard.png' style={{height:'15px'} }/>9999</span>
                </div>
              </div>

              {/* Dept / RM like in screenshot */}
              {/* <div className="text-xs text-black/80 text-right space-y-1">
                <p>
                  <span className="font-semibold">Dept:</span> Center of Excellence
                </p>
                <p>
                  <span className="font-semibold">RM:</span> John Doe
                </p>
              </div> */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 md:w-full md:h-full rounded-full border-2 border-blue-600 overflow-hidden bg-[#1F89EF] text-white flex items-center justify-center font-semibold">
                  {(localStorage.getItem('user_name') || 'U').split(' ').map(s=>s[0]).join('').slice(0,2)}
                </div>
              </div>
            </div>

            {/* Contact pills row */}
            
          </div>
        </div>


        {/* Sections (full width) */}
        <div className="mt-4 space-y-6 ">
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
                  defaultValue={(localStorage.getItem('user_name') || '').split(' ')[0] || ''}
                  placeholder="First Name"
                  className={textInputClass}
                  style={{paddingLeft:"10px"}}
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
                  className={textInputClass}
                  style={{paddingLeft:"10px"}}
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-neutral-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={(localStorage.getItem('user_name') || '').split(' ').slice(1).join(' ') || ''}
                  placeholder="Last Name"
                  className={textInputClass}
                  style={{paddingLeft:"10px"}}
                />
              </div>

              {/* Blood Group */}
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-neutral-700">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <select defaultValue="B+" className="w-full px-3 py-2 border border-neutral-300 rounded-[7px] bg-white text-sm" style={{height:"40px",padding:"0px 10px 0px 10px"}}>
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
                <select defaultValue="Single" className="w-full px-3 py-2 border border-neutral-300 rounded-[7px] bg-white text-sm " style={{height:"40px",padding:"0px 10px 0px 10px"}}>
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
                  className={textInputClass}
                  style={{paddingLeft:"10px"}}
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
                  className={textInputClass}
                  style={{paddingLeft:"10px"}}
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-semibold text-neutral-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4 pt-2" style={{paddingTop:"10px"}}>
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
                  className={textInputClass}
                  style={{paddingLeft:"10px"}}
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
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6" style={{padding:"24px"}}>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{padding:"24px"}}>
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
            <div className="mb-4" style={{padding:"24px"}}>
              <button className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-[#e1e1e1] text-white font-[mulish]" style={{padding:"10px",borderRadius:"25px",height:"25px"}}>
                Add Relation +
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{padding:"0px 24px 24px 24px"}}>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{padding:"24px"}}>
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
            <div className="mb-4" style={{padding:"24px"}}>
              <button className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md bg-[#0B2559] text-white" style={{borderRadius:"25px",padding:"5px 20px 5px 20px"}}>
                ADD +
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{padding:"0px 24px 24px 24px"}}>
              <div>
                <p className="text-xs md:text-sm font-semibold text-[#1F89EF] mb-2" style={{paddingBottom:"5px"}}>Education 1</p>
                <div className="border border-neutral-200 rounded-[7px] p-4 text-xs" style={{padding:"10px"}}>
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
              </div>

              <div>
                <p className="text-xs md:text-sm font-semibold text-[#1F89EF] mb-2" style={{paddingBottom:"5px"}}>Education 2</p>
                <div className="border border-neutral-200 rounded-[7px] p-4 text-xs" style={{padding:"10px"}}>
                  <p>
                    <span className="font-semibold">Certification:</span> Deep Learning Specialization
                  </p>
                  <p>
                    <span className="font-semibold">Provider:</span> Coursera : Andrew Ng
                  </p>
                  <p>
                    <span className="font-semibold">Year:</span> 2021
                  </p>
                   <p>
                    <span className="font-semibold">Grade:</span> 8.5 CGPA
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Work Experience */}
          <SectionCard
            config={sections[6]}
            open={openSections.experience}
            onToggle={() => toggleSection("experience")}
          >
            <div className="mb-4" style={{padding:"24px"}}>
              <button className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-[7px] bg-[#e1e1e1] text-white" style={{borderRadius:"25px",padding:"5px 20px 5px 20px"}}>
                ADD +
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{padding:"0px 24px 24px 24px"}}>
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
    <div className="bg-white border border-neutral-200 rounded-[8px]" style={{marginBottom:"24px"}}>
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 md:px-10 py-3 md:py-4"
        style={{padding:"15px"}}
      >
        <div className="flex items-center gap-3">
          {/* <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#E9F0FF] text-[#1D4ED8] text-xs font-semibold">
            {config.index}
          </span> */}
          <span className="text-sm md:text-base font-semibold text-[#1F89EF]">
            {config.title}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* Progress bar on right like screenshot */}
          {/* <div className="hidden md:flex flex-col items-end gap-1">
            <span className="text-[11px] text-neutral-500">
              {config.progress}%
            </span>
            <div className="w-40 h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#22C55E] rounded-full"
                style={{ width: `${config.progress}%` }}
              />
            </div>
          </div> */}
          {/* Arrow */}
          <span
            className={`inline-block transform transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            <img
              src="/me/expandIcon.png"
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
    <input
      type="text"
      value={value}
      readOnly
      className={textInputClass}
      style={{paddingLeft:"10px"}}
    />
  </div>
);

const DependentCard: React.FC<{
  title: string;
  name: string;
  phone: string;
  age: string;
  livesWith: string;
}> = ({ title, name, phone, age, livesWith }) => (
  <div>
    {/* Title outside the card */}
    <p className="text-xs md:text-sm font-semibold text-[#1F89EF] mb-2 " style={{paddingBottom:"5px"}}>{title}</p>
    {/* Card body */}
    <div className="border border-neutral-200 rounded-[7px] p-4 text-xs" style={{padding:"5px"}}>
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
    <div className="relative">
      <input
        type="text"
        value={value}
        className={`${textInputClass} pr-10`}
        style={{ paddingLeft: "10px" }}
      />
      <span className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
        <span className="w-3 h-3 rounded-full bg-green-500" />
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
  <div>
    {/* Title outside the card */}
    <p className="text-xs md:text-sm font-semibold text-[#1F89EF] mb-2" style={{paddingBottom:"5px"}}>{title}</p>
    {/* Card body */}
    <div className="border border-neutral-200 rounded-[7px] p-4 text-xs space-y-2" style={{padding:"5px"}}>
      <p>
        <span className="font-semibold">Role:</span> {role}
      </p>
      <p>
        <span className="font-semibold">Company:</span> {company}
      </p>
      <p>
        <span className="font-semibold">Duration:</span> {duration}
      </p>
      <div className="mt-2" >
        <p className="font-semibold mb-1">Responsibilities:</p>
        <ul className="list-disc list-inside pl-2 space-y-1" style={{paddingLeft:"5px"}}>
          {responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default MePage;
