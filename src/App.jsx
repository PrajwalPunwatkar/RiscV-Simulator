import React, { useState, useEffect, useReducer, createContext, useContext, useRef, useCallback } from 'react';
import footer from './footer';

// --- SVG Icons for UI ---
const PlayIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
);
const PauseIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M6 3h4v18H6zM14 3h4v18h-4z" />
  </svg>
);
const NextIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M5 18V6l8.5 6L5 18zM14 6v12h2V6h-2z" />
  </svg>
);
const ResetIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);
const ZapIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);
const CpuIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="14" x2="23" y2="14"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);
const MemoryIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);
const FileTextIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);
const ChevronDownIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);
const ChevronUpIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);
const SlidersIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" y1="21" x2="4" y2="14"></line>
    <line x1="4" y1="10" x2="4" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12" y2="3"></line>
    <line x1="20" y1="21" x2="20" y2="16"></line>
    <line x1="20" y1="12" x2="20" y2="3"></line>
    <line x1="1" y1="14" x2="7" y2="14"></line>
    <line x1="9" y1="8" x2="15" y2="8"></line>
    <line x1="17" y1="16" x2="23" y2="16"></line>
  </svg>
);
const UploadIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);
const HistoryIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 12H1m10-9V1m10 11h2m-1.9 5.2.9.9M3.9 19.1l.9-.9M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"/>
    <path d="M12 8v4l2 2"/>
  </svg>
);


// --- NEW Global CSS Styles Component ---
const GlobalStyles = () => (
  <style>{`
    /* --- Reset & Base --- */
    body {
      background-color: #0f172a; /* slate-900 */
      color: #f1f5f9; /* slate-100 */
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
    }
    * {
      box-sizing: border-box;
    }
    /* Custom scrollbar for webkit browsers */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #1e293b; /* slate-800 */
    }
    ::-webkit-scrollbar-thumb {
      background: #475569; /* slate-600 */
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #64748b; /* slate-500 */
    }

    /* --- Main App Layout --- */
    .app-container {
      height: 100vh;
      width: 1520px;
      display: flex;
      flex-direction: column;
    }
    .main-content {
      flex-grow: 1;
      padding: 1rem;
      overflow: auto; /* Allows content to scroll */
    }
    .main-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    /* --- Header --- */
    .header-controls {
      flex-shrink: 0;
      background-color: #1e293b; /* slate-800 */
      padding: 0.75rem 1rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem; /* Increased gap */
    }
    .header-controls h1 {
      font-size: 1.25rem;
      font-weight: 700;
      color: white;
      margin: 0;
    }
    .control-buttons {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    /* --- Base Styles for Inputs/Buttons --- */
    .base-input {
      padding: 0.5rem;
      background-color: #020617; /* slate-900 */
      color: #cbd5e1; /* slate-300 */
      border: 1px solid #334155; /* slate-700 */
      border-radius: 0.375rem;
      font-family: monospace;
      font-size: 0.75rem;
    }
    .base-input:focus {
      outline: 2px solid #6366f1; /* indigo-500 */
      border-color: transparent;
    }
    textarea.base-input {
      width: 100%;
      min-height: 100px; /* Give textareas a bit more default height */
    }
    .btn {
      padding: 0.5rem;
      border-radius: 0.375rem;
      color: white;
      transition: background-color 0.2s;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem; /* Add gap for icon + text */
    }
    .btn svg {
      width: 1.25rem;
      height: 1.25rem;
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn-indigo { background-color: #4f46e5; }
    .btn-indigo:hover { background-color: #6366f1; }
    .btn-emerald { background-color: #059669; }
    .btn-emerald:hover { background-color: #10b981; }
    .btn-amber { background-color: #d97706; }
    .btn-amber:hover { background-color: #f59e0b; }
    .btn-sky { background-color: #0284c7; }
    .btn-sky:hover { background-color: #0ea5e9; }
    .btn-rose { background-color: #e11d48; }
    .btn-rose:hover { background-color: #f43f5e; }

    /* --- Panel --- */
    .panel {
      background-color: #1e293b; /* slate-800 */
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      display: flex;
      flex-direction: column;
    }
    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0.75rem;
      background-color: #334155; /* slate-700 */
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      text-align: left;
      cursor: pointer;
      border: none;
      color: inherit;
    }
    .panel-header-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .panel-header-title svg { width: 1.25rem; height: 1.25rem; }
    .panel-header-title h2 {
      font-size: 1rem;
      font-weight: 600;
      color: #cbd5e1; /* slate-300 */
      margin: 0;
    }
    .panel-content {
      padding: 0.75rem;
      overflow: auto;
    }
    
    /* --- Component-Specific --- */
    /* NEW Program Loader Panel */
    .program-loader-panel {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .memory-list {
      font-family: monospace;
      font-size: 0.875rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .memory-addr { color: #64748b; /* slate-500 */ }
    .memory-value { color: #f1f5f9; /* slate-100 */ margin-left: 0.5rem; }
    
    .register-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.25rem 1rem;
      font-family: monospace;
      font-size: 0.875rem;
    }
    .register-row {
      display: flex;
      justify-content: space-between;
      padding: 0.25rem;
      border-radius: 0.25rem;
    }
    .register-name { color: #64748b; /* slate-500 */ }
    .register-value { color: #f1f5f9; /* slate-100 */ }
    
    .hl-write { background-color: #065f46; color: white; /* emerald-700 */ }
    .hl-read { background-color: #0369a1; color: white; /* sky-700 */ }
    .hl-pc { background-color: #92400e; padding: 0.25rem; border-radius: 0.25rem; /* amber-700 */ }
    .hl-pc-text { color: #fcd34d; /* amber-300 */ margin-left: 0.75rem; }
    .hl-mem { background-color: #92400e; padding: 0.25rem; border-radius: 0.25rem; /* amber-700 */ }
    .hl-mem-text { color: #fcd34d; /* amber-300 */ margin-left: 0.75rem; }
    
    .key-value-list {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-family: monospace;
    }
    .key-value { display: flex; justify-content: space-between; }
    .key-value-label { color: #64748b; /* slate-500 */ width: 40%; }
    .key-value-value { width: 60%; color: #f1f5f9; /* slate-100 */ }
    .hl-value { color: #fcd34d; /* amber-300 */ }

    .control-signal-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.25rem 1rem;
      font-family: monospace;
      font-size: 0.875rem;
    }
    .signal-true { color: #34d399; /* emerald-400 */ }
    .signal-false { color: #f87171; /* rose-400 */ }
    
    /* --- Instruction History (NEW) --- */
    .history-list {
      max-height: 400px; /* Limit height and make scrollable */
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .history-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      border-bottom: 1px solid #334155; /* slate-700 */
      padding-bottom: 1rem;
    }
    .history-item:last-child {
      border-bottom: none;
    }
    .history-header {
      font-family: monospace;
      font-weight: 600;
    }
    .history-pc {
      color: #94a3b8; /* slate-400 */
    }
    .history-mnemonic {
      color: #f1f5f9; /* slate-100 */
      margin-left: 0.5rem;
    }

    /* --- Binary Breakdown --- */
    .binary-breakdown {
      margin-top: 0.75rem;
      padding: 0.5rem;
      background-color: #334155; /* slate-700 */
      border-radius: 0.375rem;
    }
    .binary-breakdown-title {
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      text-align: center;
      color: #7dd3fc; /* sky-200 */
    }
    .binary-breakdown-fields {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.25rem;
      overflow-x: auto;
    }
    .binary-field {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
      min-width: 0;
    }
    .binary-field-name { font-size: 0.75rem; color: #94a3b8; /* slate-400 */ text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
    .binary-field-value {
      font-family: monospace;
      font-size: 0.875rem;
      color: #6ee7b7; /* emerald-300 */
      letter-spacing: -0.05em; /* tracking-tighter */
      padding: 0.25rem;
      background-color: #020617; /* slate-900 */
      border-radius: 0.25rem;
      word-break: break-all;
    }
    .binary-field-bits { font-size: 0.75rem; color: #64748b; /* slate-500 */ }
    
    /* --- Media Queries for Layout --- */
    @media (min-width: 768px) { /* md */
      .main-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .span-col-2 {
        grid-column: span 2 / span 2;
      }
      .register-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (min-width: 1024px) { /* lg */
      .main-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      .span-col-2-lg {
         grid-column: span 2 / span 2;
      }
      .span-col-3-lg {
         grid-column: span 3 / span 3;
      }
    }
  `}</style>
);


// --- RISC-V Constants ---
// (Unchanged)
const OP_R = 0b0110011;
const OP_I = 0b0010011;
const OP_L = 0b0000011;
const OP_S = 0b0100011;
const OP_B = 0b1100011;
const OP_JALR = 0b1100111;
const OP_JAL = 0b1101111;
const OP_LUI = 0b0110111;
const OP_AUIPC = 0b0010111;
const F3_ADD_SUB = 0b000;
const F3_SLL = 0b001;
const F3_SLT = 0b010;
const F3_SLTU = 0b011;
const F3_XOR = 0b100;
const F3_SRL_SRA = 0b101;
const F3_OR = 0b110;
const F3_AND = 0b111;
const F3_LB = 0b000;
const F3_LH = 0b001;
const F3_LW = 0b010;
const F3_LBU = 0b100;
const F3_LHU = 0b101;
const F3_SB = 0b000;
const F3_SH = 0b001;
const F3_SW = 0b010;
const F3_BEQ = 0b000;
const F3_BNE = 0b001;
const F3_BLT = 0b100;
const F3_BGE = 0b101;
const F3_BLTU = 0b110;
const F3_BGEU = 0b111;
const F7_SUB_SRA = 0b0100000;
const F7_ADD_SRL = 0b0000000;
const ALU_ADD = 'ADD';
const ALU_SUB = 'SUB';
const ALU_SLL = 'SLL';
const ALU_SLT = 'SLT';
const ALU_SLTU = 'SLTU';
const ALU_XOR = 'XOR';
const ALU_SRL = 'SRL';
const ALU_SRA = 'SRA';
const ALU_OR = 'OR';
const ALU_AND = 'AND';
const ALU_COPY_A = 'COPY_A';
const ALU_LUI = 'LUI';
const ALU_AUIPC = 'AUIPC';
const ABI_NAMES = [
  'zero', 'ra', 'sp', 'gp', 'tp', 't0', 't1', 't2',
  's0', 's1', 'a0', 'a1', 'a2', 'a3', 'a4', 'a5',
  'a6', 'a7', 's2', 's3', 's4', 's5', 's6', 's7',
  's8', 's9', 's10', 's11', 't3', 't4', 't5', 't6'
];

// --- Simulation Core Logic ---
function signExtend(value, bits) {
  const m = 1 << (bits - 1);
  return (value ^ m) - m;
}

function decode(inst) {
  const opcode = inst & 0x7F;
  const rd = (inst >> 7) & 0x1F;
  const rs1 = (inst >> 15) & 0x1F;
  const rs2 = (inst >> 20) & 0x1F;
  const funct3 = (inst >> 12) & 0x7;
  const funct7 = (inst >> 25) & 0x7F;

  let mnemonic = 'unknown';
  let type = 'U';
  let imm = 0;

  switch (opcode) {
    case OP_R:
      type = 'R';
      switch (funct3) {
        case F3_ADD_SUB: mnemonic = (funct7 === F7_SUB_SRA) ? 'sub' : 'add'; break;
        case F3_SLL: mnemonic = 'sll'; break;
        case F3_SLT: mnemonic = 'slt'; break;
        case F3_SLTU: mnemonic = 'sltu'; break;
        case F3_XOR: mnemonic = 'xor'; break;
        case F3_SRL_SRA: mnemonic = (funct7 === F7_SUB_SRA) ? 'sra' : 'srl'; break;
        case F3_OR: mnemonic = 'or'; break;
        case F3_AND: mnemonic = 'and'; break;
        default: mnemonic = 'R-type?';
      }
      break;

    case OP_I:
      type = 'I';
      imm = signExtend(inst >>> 20, 12);
      switch (funct3) {
        case F3_ADD_SUB: mnemonic = 'addi'; break;
        case F3_SLL: mnemonic = 'slli'; imm = inst >>> 20; break; 
        case F3_SLT: mnemonic = 'slti'; break;
        case F3_SLTU: mnemonic = 'sltiu'; break;
        case F3_XOR: mnemonic = 'xori'; break;
        case F3_SRL_SRA:
          if (funct7 === F7_SUB_SRA) { mnemonic = 'srai'; imm = (inst >>> 20) & 0x1F; }
          else { mnemonic = 'srli'; imm = (inst >>> 20) & 0x1F; }
          break;
        case F3_OR: mnemonic = 'ori'; break;
        case F3_AND: mnemonic = 'andi'; break;
        default: mnemonic = 'I-type?';
      }
      break;

    case OP_L:
      type = 'I'; 
      imm = signExtend(inst >>> 20, 12);
      switch (funct3) {
        case F3_LB: mnemonic = 'lb'; break;
        case F3_LH: mnemonic = 'lh'; break;
        case F3_LW: mnemonic = 'lw'; break;
        case F3_LBU: mnemonic = 'lbu'; break;
        case F3_LHU: mnemonic = 'lhu'; break;
        default: mnemonic = 'Load?';
      }
      if (mnemonic !== 'Load?') mnemonic += ` x${rd}, ${imm}(x${rs1})`;
      break;

    case OP_S:
      type = 'S';
      imm = signExtend(((inst >> 25) << 5) | ((inst >> 7) & 0x1F), 12);
      switch (funct3) {
        case F3_SB: mnemonic = 'sb'; break;
        case F3_SH: mnemonic = 'sh'; break;
        case F3_SW: mnemonic = 'sw'; break;
        default: mnemonic = 'Store?';
      }
      if (mnemonic !== 'Store?') mnemonic += ` x${rs2}, ${imm}(x${rs1})`;
      break;

    case OP_B:
      type = 'B';
      const imm12 = (inst >> 31) & 1;
      const imm10_5 = (inst >> 25) & 0x3F;
      const imm4_1 = (inst >> 8) & 0xF;
      const imm11 = (inst >> 7) & 1;
      imm = signExtend((imm12 << 12) | (imm11 << 11) | (imm10_5 << 5) | (imm4_1 << 1), 13);
      switch (funct3) {
        case F3_BEQ: mnemonic = 'beq'; break;
        case F3_BNE: mnemonic = 'bne'; break;
        case F3_BLT: mnemonic = 'blt'; break;
        case F3_BGE: mnemonic = 'bge'; break;
        case F3_BLTU: mnemonic = 'bltu'; break;
        case F3_BGEU: mnemonic = 'bgeu'; break;
        default: mnemonic = 'Branch?';
      }
      if (mnemonic !== 'Branch?') mnemonic += ` x${rs1}, x${rs2}, ${imm}`;
      break;
    
    case OP_JALR:
      type = 'I'; 
      imm = signExtend(inst >>> 20, 12);
      mnemonic = `jalr x${rd}, ${imm}(x${rs1})`;
      break;

    case OP_JAL:
      type = 'J';
      const imm20 = (inst >> 31) & 1;
      const imm10_1 = (inst >> 21) & 0x3FF;
      const imm11_j = (inst >> 20) & 1;
      const imm19_12 = (inst >> 12) & 0xFF;
      imm = signExtend((imm20 << 20) | (imm19_12 << 12) | (imm11_j << 11) | (imm10_1 << 1), 21);
      mnemonic = `jal x${rd}, ${imm}`;
      break;

    case OP_LUI:
      type = 'U';
      imm = (inst >>> 12) << 12;
      mnemonic = `lui x${rd}, ${imm >> 12}`;
      break;

    case OP_AUIPC:
      type = 'U';
      imm = (inst >>> 12) << 12;
      mnemonic = `auipc x${rd}, ${imm >> 12}`;
      break;
    
    default:
      mnemonic = `unknown opcode ${opcode.toString(2)}`;
  }
  
  if (type === 'R') mnemonic += ` x${rd}, x${rs1}, x${rs2}`;
  if (type === 'I' && opcode === OP_I) mnemonic += ` x${rd}, x${rs1}, ${imm}`;

  return { inst, opcode, rd, rs1, rs2, funct3, funct7, imm, type, mnemonic };
}

function controlUnit(opcode) {
  const signals = {
    RegWrite: 0, ALUSrc: 0, MemtoReg: 0, MemRead: 0,
    MemWrite: 0, Branch: 0, Jump: 0, ALUOp: '?',
  };
  switch (opcode) {
    case OP_R: signals.RegWrite = 1; signals.ALUOp = 'R'; break;
    case OP_I: signals.RegWrite = 1; signals.ALUSrc = 1; signals.ALUOp = 'I'; break;
    case OP_L: signals.RegWrite = 1; signals.ALUSrc = 1; signals.MemtoReg = 1; signals.MemRead = 1; signals.ALUOp = 'L'; break;
    case OP_S: signals.ALUSrc = 1; signals.MemWrite = 1; signals.ALUOp = 'S'; break;
    case OP_B: signals.Branch = 1; signals.ALUOp = 'B'; break;
    case OP_JALR: signals.RegWrite = 1; signals.ALUSrc = 1; signals.MemtoReg = 2; signals.Jump = 2; signals.ALUOp = 'JALR'; break;
    case OP_JAL: signals.RegWrite = 1; signals.MemtoReg = 2; signals.Jump = 1; signals.ALUOp = 'JAL'; break;
    case OP_LUI: signals.RegWrite = 1; signals.ALUSrc = 1; signals.ALUOp = 'LUI'; break;
    case OP_AUIPC: signals.RegWrite = 1; signals.ALUSrc = 1; signals.ALUOp = 'AUIPC'; break;
  }
  return signals;
}

function aluControl(ALUOp, funct3, funct7) {
  if (ALUOp === 'L' || ALUOp === 'S' || ALUOp === 'I' || ALUOp === 'B') return ALU_ADD;
  if (ALUOp === 'JALR') return ALU_COPY_A;
  if (ALUOp === 'LUI') return ALU_LUI;
  if (ALUOp === 'AUIPC') return ALU_AUIPC;
  if (ALUOp === 'JAL') return ALU_ADD;
  if (ALUOp === 'R') {
    switch (funct3) {
      case F3_ADD_SUB: return (funct7 === F7_SUB_SRA) ? ALU_SUB : ALU_ADD;
      case F3_SLL: return ALU_SLL;
      case F3_SLT: return ALU_SLT;
      case F3_SLTU: return ALU_SLTU;
      case F3_XOR: return ALU_XOR;
      case F3_SRL_SRA: return (funct7 === F7_SUB_SRA) ? ALU_SRA : ALU_SRL;
      case F3_OR: return ALU_OR;
      case F3_AND: return ALU_AND;
      default: return '???';
    }
  }
  return '???';
}

function alu(a, b, op) {
  a = a | 0; b = b | 0;
  let result = 0;
  switch (op) {
    case ALU_ADD: result = a + b; break;
    case ALU_SUB: result = a - b; break;
    case ALU_SLL: result = a << b; break;
    case ALU_SLT: result = a < b ? 1 : 0; break;
    case ALU_SLTU: result = (a >>> 0) < (b >>> 0) ? 1 : 0; break;
    case ALU_XOR: result = a ^ b; break;
    case ALU_SRL: result = a >>> b; break;
    case ALU_SRA: result = a >> b; break;
    case ALU_OR: result = a | b; break;
    case ALU_AND: result = a & b; break;
    case ALU_COPY_A: result = a; break;
    case ALU_LUI: result = b; break;
    case ALU_AUIPC: result = a + b; break;
    default: result = 0;
  }
  result = result | 0;
  return { result, zero: result === 0 };
}

// --- React State Management ---

const CPUContext = createContext();

const initialRegisters = new Uint32Array(32).fill(0);
const initialPC = 0x0;

const lastStepInitial = {
  pc: 0, inst: 0, decoded: null, controls: null, regA: 0, regB: 0,
  aluInputA: 0, aluInputB: 0, aluOp: '?', aluOutput: { result: 0, zero: false },
  memReadValue: 0, memWriteValue: 0, lastMemAddr: null, lastWriteReg: null,
  lastReadRs1: null, lastReadRs2: null, writeBackData: 0, nextPc: 0,
};

const initialState = {
  pc: initialPC,
  registers: initialRegisters,
  instructionMemory: new Map(),
  dataMemory: new Map(),
  isRunning: false,
  speed: 50,
  lastStep: lastStepInitial,
  instructionHistory: [], 
};

function cpuReducer(state, action) {
  switch (action.type) {
    case 'STEP':
      // performStep now returns { newState, decoded }
      const { newState, decoded } = performStep(state);
      // Add the new decoded instruction to history, only if it's not a NOP (inst 0)
      const newHistory = decoded && decoded.inst !== 0
        ? [...state.instructionHistory, { pc: state.pc, decoded }]
        : state.instructionHistory;
        
      return {
        ...newState,
        instructionHistory: newHistory
      };
    case 'RESET':
      return {
        ...initialState,
        instructionMemory: state.instructionMemory,
        dataMemory: state.dataMemory,
        instructionHistory: [], 
      };
    case 'LOAD_PROGRAM':
      return {
        ...initialState,
        instructionMemory: action.payload.instructionMemory,
        pc: action.payload.startAddress,
        lastStep: { ...lastStepInitial, pc: action.payload.startAddress, nextPc: action.payload.startAddress + 4 },
        instructionHistory: [], 
      };
    case 'SET_RUNNING':
      return { ...state, isRunning: action.payload };
    case 'SET_SPEED':
      return { ...state, speed: action.payload };
    case 'WRITE_DATA_MEMORY': {
      const { address, value } = action.payload;
      const newDataMemory = new Map(state.dataMemory);
      newDataMemory.set(address, value);
      return { ...state, dataMemory: newDataMemory, lastStep: { ...state.lastStep, lastMemAddr: address } };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

/**
 * Executes one full single-cycle step.
 * @param {object} state The current CPU state.
 * @returns {object} { newState: object, decoded: object }
 */
function performStep(state) {
  const { pc, registers, instructionMemory, dataMemory } = state;

  // --- 1. FETCH ---
  const inst = instructionMemory.get(pc) || 0;
  const pcPlus4 = (pc + 4) | 0;
  
  // --- 2. DECODE ---
  const decoded = decode(inst);
  const controls = controlUnit(decoded.opcode);
  const regA = (decoded.rs1 === 0) ? 0 : (registers[decoded.rs1] | 0);
  const regB = (decoded.rs2 === 0) ? 0 : (registers[decoded.rs2] | 0);

  // --- 3. EXECUTE ---
  const aluOp = aluControl(controls.ALUOp, decoded.funct3, decoded.funct7);
  const aluInputA = (controls.ALUOp === 'AUIPC') ? pc : regA;
  const aluInputB = (controls.ALUSrc === 1) ? decoded.imm : regB;
  const aluOutput = alu(aluInputA, aluInputB, aluOp);
  
  let nextPc = pcPlus4;
  let branchTaken = false;
  if (controls.Branch === 1) {
    const { zero } = alu(regA, regB, ALU_SUB);
    switch (decoded.funct3) {
      case F3_BEQ: branchTaken = zero; break;
      case F3_BNE: branchTaken = !zero; break;
      case F3_BLT: branchTaken = alu(regA, regB, ALU_SLT).result === 1; break;
      case F3_BGE: branchTaken = alu(regA, regB, ALU_SLT).result === 0; break;
      case F3_BLTU: branchTaken = alu(regA, regB, ALU_SLTU).result === 1; break;
      case F3_BGEU: branchTaken = alu(regA, regB, ALU_SLTU).result === 0; break;
    }
    if (branchTaken) nextPc = (pc + decoded.imm) | 0;
  } else if (controls.Jump === 1) nextPc = (pc + decoded.imm) | 0;
  else if (controls.Jump === 2) nextPc = (aluInputA + aluInputB) & ~1;
  
  // --- 4. MEMORY ---
  let memReadValue = 0;
  let memWriteValue = regB;
  const memAddr = aluOutput.result;
  if (controls.MemRead === 1) memReadValue = dataMemory.get(memAddr) | 0;
  const newDataMemory = new Map(dataMemory);
  if (controls.MemWrite === 1) newDataMemory.set(memAddr, memWriteValue);
  
  // --- 5. WRITE-BACK ---
  let writeBackData = 0;
  if (controls.MemtoReg === 0) writeBackData = aluOutput.result;
  else if (controls.MemtoReg === 1) writeBackData = memReadValue;
  else if (controls.MemtoReg === 2) writeBackData = pcPlus4;
  
  const newRegisters = new Uint32Array(registers);
  if (controls.RegWrite === 1 && decoded.rd !== 0) newRegisters[decoded.rd] = writeBackData;
  
  const newState = {
    ...state,
    pc: nextPc,
    registers: newRegisters,
    dataMemory: newDataMemory,
    lastStep: {
      pc, inst, decoded, controls, regA, regB, aluInputA, aluInputB, aluOp, aluOutput,
      memReadValue, memWriteValue, writeBackData, nextPc,
      lastMemAddr: (controls.MemRead || controls.MemWrite) ? memAddr : null,
      lastWriteReg: (controls.RegWrite && decoded.rd !== 0) ? decoded.rd : null,
      lastReadRs1: (decoded.rs1 !== 0) ? decoded.rs1 : null,
      lastReadRs2: (decoded.rs2 !== 0 && controls.ALUSrc === 0 && controls.Branch === 1) ? decoded.rs2 : null,
    },
  };

  // Return both the new state and the decoded instruction for history
  return { newState, decoded };
}


// --- React Components (Refactored with CSS classes) ---

function Panel({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);

  let icon = null;
  if (title === "Program Loader") icon = <UploadIcon style={{ color: '#a5b4fc' }} />; // indigo-300
  if (title === "Instruction Memory") icon = <FileTextIcon style={{ color: '#7dd3fc' }} />; // sky-300
  if (title === "Data Memory") icon = <MemoryIcon style={{ color: '#6ee7b7' }} />; // emerald-300
  if (title.startsWith("Register File")) icon = <CpuIcon style={{ color: '#fda4af' }} />; // rose-300
  if (title === "Control Unit") icon = <ZapIcon style={{ color: '#fcd34d' }} />; // amber-300
  if (title === "Instruction History") icon = <HistoryIcon style={{ color: '#c4b5fd' }} />; // violet-300

  return (
    <div className="panel">
      <button className="panel-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="panel-header-title">
          {icon}
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          <h2>{title}</h2>
        </div>
      </button>
      {isOpen && (
        <div className="panel-content">
          {children}
        </div>
      )}
    </div>
  );
}

function HeaderControls() {
  const { state, dispatch } = useContext(CPUContext);
  const { isRunning, speed } = state;

  useEffect(() => {
    let timer;
    if (isRunning) {
      const delay = Math.max(10, 500 - (speed * 4.9)); // 500ms to 10ms
      timer = setTimeout(() => {
        if (state.pc > 0x1000) {
          dispatch({ type: 'SET_RUNNING', payload: false });
          return;
        }
        dispatch({ type: 'STEP' });
      }, delay);
    }
    return () => clearTimeout(timer);
  }, [isRunning, state.pc, speed, dispatch]);

  const handleRunPause = () => dispatch({ type: 'SET_RUNNING', payload: !isRunning });
  const handleStep = () => {
    dispatch({ type: 'SET_RUNNING', payload: false });
    dispatch({ type: 'STEP' });
  };
  const handleReset = () => {
    dispatch({ type: 'SET_RUNNING', payload: false });
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="header-controls">
      <div>
        <h1>RISC-V Single-Cycle Simulator</h1>
      </div>

      {}
      <div className="control-buttons">
        <button
          onClick={handleRunPause}
          className={`btn ${isRunning ? 'btn-amber' : 'btn-emerald'}`}
          title={isRunning ? 'Pause' : 'Run'}
        >
          {isRunning ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button onClick={handleStep} className="btn btn-sky" title="Step">
          <NextIcon />
        </button>
        <button onClick={handleReset} className="btn btn-rose" title="Reset">
          <ResetIcon />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} title="Simulation Speed">
          <SlidersIcon style={{ color: '#94a3b8' }} />
          <input
            type="range"
            min="0"
            max="100"
            value={speed}
            onChange={(e) => dispatch({ type: 'SET_SPEED', payload: e.target.valueAsNumber })}
            style={{ width: '6rem' }}
          />
        </div>
      </div>
    </div>
  );
}

function ProgramLoader() {
  const { dispatch } = useContext(CPUContext);
  const programInputRef = useRef(null);
  
  const exampleProgram = `
# Simple Test Program
# addi x1, x0, 5
0x00500093
# addi x2, x0, 10
0x00A00113
# add x3, x1, x2
0x002081B3
# sw x3, 0(x0)
0x00302023
# lw x4, 0(x0)
0x00002203
# beq x1, x0, 8 (skip next inst)
0x00008463
# addi x1, x1, 1
0x00108093
# end: addi x5, x0, 1
0x00100293
# loop: beq x0, x0, 0 (infinite loop)
0x00000063
  `.trim();

  useEffect(() => {
    if (programInputRef.current && !programInputRef.current.value) {
      programInputRef.current.value = exampleProgram;
    }
  }, [exampleProgram]);

  const handleLoad = () => {
    dispatch({ type: 'SET_RUNNING', payload: false });
    const text = programInputRef.current.value;
    const startAddrInt = 0x0; // Default to 0x0

    const newIM = new Map();
    let addr = startAddrInt;
    text.split('\n').forEach(line => {
      line = line.trim();
      if (line.startsWith('#') || !line) return;
      const instHex = line.split(' ')[0];
      const inst = parseInt(instHex, 16);
      if (!isNaN(inst)) {
        newIM.set(addr, inst);
        addr += 4;
      }
    });

    dispatch({ 
      type: 'LOAD_PROGRAM', 
      payload: { instructionMemory: newIM, startAddress: startAddrInt }
    });
  };

  return (
    <Panel title="Program Loader">
      <div className="program-loader-panel">
        <textarea
          ref={programInputRef}
          className="base-input"
          placeholder="Paste machine code (e.g., 0x00500093)"
          rows="8"
        ></textarea>
        <button onClick={handleLoad} className="btn btn-indigo" title="Load Program">
          <UploadIcon />
          Load
        </button>
      </div>
    </Panel>
  );
}


function RegisterFile() {
  const { state } = useContext(CPUContext);
  const { registers, lastStep: { lastWriteReg, lastReadRs1, lastReadRs2 } } = state;

  return (
    <Panel title="Register File (x0 - x31)">
      <div className="register-grid">
        {Array.from(registers).map((value, i) => {
          const isWrite = lastWriteReg === i;
          const isRead1 = lastReadRs1 === i;
          const isRead2 = lastReadRs2 === i;
          
          let className = "register-row";
          if (isWrite) className += ' hl-write';
          else if (isRead1 || isRead2) className += ' hl-read';
          
          return (
            <div key={i} className={className}>
              <span className="register-name">{ABI_NAMES[i]} (x{i}):</span>
              <span className="register-value">{toHex(value)} {"=>"} {
              value
              }</span>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function InstructionMemory() {
  const { state } = useContext(CPUContext);
  const { instructionMemory, pc } = state;

  const displayAddresses = [];
  const window = 5;
  for (let i = -window; i <= window; i++) {
    displayAddresses.push(pc + i * 4);
  }
  if (instructionMemory.size === 0 && !displayAddresses.includes(pc)) {
    displayAddresses.sort((a,b) => a-b);
  }

  return (
    <Panel title="Instruction Memory">
      <div className="memory-list">
        {displayAddresses.map(addr => {
          if (addr < 0) return null;
          const inst = instructionMemory.get(addr);
          const isCurrent = (addr === pc);
          if (inst === undefined) return null;

          return (
            <div key={addr} className={isCurrent ? 'hl-pc' : ''}>
              <span className="memory-addr">{toHex(addr)}:</span>
              <span className="memory-value">{toHex(inst)}</span>
              {isCurrent && <span className="hl-pc-text"> &lt;-- PC</span>}
            </div>
          );
        })}
        {instructionMemory.size === 0 && <div className="memory-addr">No program loaded.</div>}
      </div>
    </Panel>
  );
}

function DataMemory() {
  const { state, dispatch } = useContext(CPUContext);
  const { dataMemory, lastStep: { lastMemAddr } } = state;
  
  const [writeAddr, setWriteAddr] = useState('0x0');
  const [writeValue, setWriteValue] = useState('0');
  const [error, setError] = useState('');

  const handleWriteMemory = (e) => {
    e.preventDefault();
    setError('');
    const address = parseInt(writeAddr, 16);
    if (isNaN(address)) {
      setError("Invalid address. Must be hex (e.g., 0x100).");
      return;
    }
    let value;
    if (writeValue.toLowerCase().startsWith('0x')) value = parseInt(writeValue, 16) | 0;
    else value = parseInt(writeValue, 10) | 0;
    if (isNaN(value)) {
       setError("Invalid value. Must be decimal or 0x...");
       return;
    }
    dispatch({ type: 'WRITE_DATA_MEMORY', payload: { address, value } });
  };
  
  const allAddresses = Array.from(dataMemory.keys());
  if (lastMemAddr !== null && !allAddresses.includes(lastMemAddr)) {
    allAddresses.push(lastMemAddr);
  }
  allAddresses.sort((a, b) => a - b);
  const displayAddresses = allAddresses;

  return (
    <Panel title="Data Memory">
      <form onSubmit={handleWriteMemory} style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          value={writeAddr}
          onChange={(e) => setWriteAddr(e.target.value)}
          className="base-input"
          placeholder="Address (0x...)"
          style={{ width: '33.33%' }}
        />
        <input 
          type="text"
          value={writeValue}
          onChange={(e) => setWriteValue(e.target.value)}
          className="base-input"
          placeholder="Value (dec or 0x...)"
          style={{ width: '33.33%' }}
        />
        <button type="submit" className="btn btn-indigo" style={{ width: '33.33%', fontSize: '0.75rem' }}>
          Write
        </button>
      </form>
      {error && <div style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem' }}>{error}</div>}

      <div className="memory-list">
        {displayAddresses.length === 0 && <div className="memory-addr">Memory is empty.</div>}
        {displayAddresses.map(addr => {
          const value = dataMemory.get(addr);
          if (value === undefined) return null;
          const isLast = (addr === lastMemAddr);
          return (
            <div key={addr} className={isLast ? 'hl-mem' : ''}>
              <span className="memory-addr">{toHex(addr)}:</span>
              <span className="memory-value">{toHex(value)} ({value})</span>
              {isLast && <span className="hl-mem-text"> &lt;-- Last Access</span>}
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function ControlUnit() {
  const { state } = useContext(CPUContext);
  const { controls } = state.lastStep;

  if (!controls) return <Panel title="Control Unit">Not started.</Panel>;

  const Signal = ({ name, value }) => (
    <div className="key-value">
      <span>{name}:</span>
      <span className={value ? 'signal-true' : 'signal-false'}>
        {typeof value === 'number' ? value.toString() : value}
      </span>
    </div>
  );

  return (
    <Panel title="Control Unit">
      <div className="control-signal-grid">
        <Signal name="RegWrite" value={controls.RegWrite} />
        <Signal name="ALUSrc" value={controls.ALUSrc} />
        <Signal name="MemtoReg" value={controls.MemtoReg} />
        <Signal name="MemRead" value={controls.MemRead} />
        <Signal name="MemWrite" value={controls.MemWrite} />
        <Signal name="Branch" value={controls.Branch} />
        <Signal name="Jump" value={controls.Jump} />
        <Signal name="ALUOp" value={controls.ALUOp} />
      </div>
    </Panel>
  );
}

function DecodeALU() {
  const { state } = useContext(CPUContext);
  const { decoded, aluOp, aluInputA, aluInputB, aluOutput, pc } = state.lastStep;
  
  if (!decoded) return <Panel title="Decoder / ALU">Not started.</Panel>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Panel title={`Decoder (PC: ${toHex(pc)})`}>
        <div className="key-value-list">
          <div className="key-value" style={{ alignItems: 'center' }}>
            <span className="key-value-label">Mnemonic:</span>
            <span className="key-value-value" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {decoded.mnemonic}
            </span>
          </div>
          <KeyValue label="Instruction" value={toHex(decoded.inst)} />
          <KeyValue label="Type" value={decoded.type} />
          <KeyValue label="Opcode" value={toBinary(decoded.opcode,7)} />
          <KeyValue label="rd" value={`x${decoded.rd}`} />
          <KeyValue label="rs1" value={`x${decoded.rs1}`} />
          <KeyValue label="rs2" value={`x${decoded.rs2}`} />
          <KeyValue label="funct3" value={toBinary(decoded.funct3, 3)} />
          <KeyValue label="funct7" value={toBinary(decoded.funct7, 7)} />
          <KeyValue label="Immediate" value={`${toHex(decoded.imm)} (${decoded.imm})`} />
        </div>
        
        {/* The binary breakdown for the *current* instruction is still here */}
        <InstructionBinaryBreakdown decoded={decoded} />

      </Panel>
      <Panel title="ALU">
        <div className="key-value-list">
          <KeyValue label="Operation" value={aluOp} hl={true} />
          <KeyValue label="Input A" value={toHex(aluInputA)} />
          <KeyValue label="Input B" value={toHex(aluInputB)} />
          <KeyValue label="Result" value={toHex(aluOutput.result)} hl={true} />
          <KeyValue label="Zero Flag" value={aluOutput.zero ? '1 (True)' : '0 (False)'} hl={aluOutput.zero} />
        </div>
      </Panel>
    </div>
  );
}

/**
 * NEW: Component to show the history of all executed instruction breakdowns.
 */
function InstructionHistory() {
  const { state } = useContext(CPUContext);
  const { instructionHistory } = state;
  const historyEndRef = useRef(null);

  // Auto-scroll to the bottom when history changes
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [instructionHistory]);

  return (
    <Panel title="Instruction History">
      <div className="history-list">
        {instructionHistory.length === 0 && (
          <div className="memory-addr">Run program to see history.</div>
        )}
        {instructionHistory.map((item, index) => (
          <div key={index} className="history-item">
            <div className="history-header">
              <span className="history-pc">{toHex(item.pc)}:</span>
              <span className="history-mnemonic">{item.decoded.mnemonic}</span>
            </div>
            <InstructionBinaryBreakdown decoded={item.decoded} />
          </div>
        ))}
        {/* Empty div to help with auto-scrolling */}
        <div ref={historyEndRef} />
      </div>
    </Panel>
  );
}

function InstructionBinaryBreakdown({ decoded }) {
  if (!decoded || decoded.inst === 0) return null;

  const { inst, type, opcode, rd, rs1, rs2, funct3, funct7 } = decoded;
  
  const Field = ({ name, bits, value }) => (
    <div className="binary-field">
      <div className="binary-field-name">{name}</div>
      <div className="binary-field-value">
        {toBinary(value, bits)}
      </div>
      <div className="binary-field-bits">({bits})</div>
    </div>
  );

  let fields = [];
  switch (type) {
    case 'R':
      fields = [
        <Field key="f7" name="funct7" bits={7} value={funct7} />,
        <Field key="rs2" name="rs2" bits={5} value={rs2} />,
        <Field key="rs1" name="rs1" bits={5} value={rs1} />,
        <Field key="f3" name="funct3" bits={3} value={funct3} />,
        <Field key="rd" name="rd" bits={5} value={rd} />,
        <Field key="op" name="opcode" bits={7} value={opcode} />,
      ];
      break;
    case 'I':
      fields = [
        <Field key="imm" name="imm[11:0]" bits={12} value={(inst >>> 20)} />,
        <Field key="rs1" name="rs1" bits={5} value={rs1} />,
        <Field key="f3" name="funct3" bits={3} value={funct3} />,
        <Field key="rd" name="rd" bits={5} value={rd} />,
        <Field key="op" name="opcode" bits={7} value={opcode} />,
      ];
      break;
    case 'S':
      fields = [
        <Field key="imm1" name="imm[11:5]" bits={7} value={(inst >>> 25)} />,
        <Field key="rs2" name="rs2" bits={5} value={rs2} />,
        <Field key="rs1" name="rs1" bits={5} value={rs1} />,
        <Field key="f3" name="funct3" bits={3} value={funct3} />,
        <Field key="imm0" name="imm[4:0]" bits={5} value={(inst >>> 7) & 0x1F} />,
        <Field key="op" name="opcode" bits={7} value={opcode} />,
      ];
      break;
    case 'B':
      fields = [
        <Field key="imm12" name="imm[12]" bits={1} value={(inst >>> 31)} />,
        <Field key="imm10" name="imm[10:5]" bits={6} value={(inst >>> 25) & 0x3F} />,
        <Field key="rs2" name="rs2" bits={5} value={rs2} />,
        <Field key="rs1" name="rs1" bits={5} value={rs1} />,
        <Field key="f3" name="funct3" bits={3} value={funct3} />,
        <Field key="imm4" name="imm[4:1]" bits={4} value={(inst >>> 8) & 0xF} />,
        <Field key="imm11" name="imm[11]" bits={1} value={(inst >>> 7) & 0x1} />,
        <Field key="op" name="opcode" bits={7} value={opcode} />,
      ];
      break;
    case 'U':
      fields = [
        <Field key="imm" name="imm[31:12]" bits={20} value={(inst >>> 12)} />,
        <Field key="rd" name="rd" bits={5} value={rd} />,
        <Field key="op" name="opcode" bits={7} value={opcode} />,
      ];
      break;
    case 'J':
      fields = [
        <Field key="imm20" name="imm[20]" bits={1} value={(inst >>> 31)} />,
        <Field key="imm10" name="imm[10:1]" bits={10} value={(inst >>> 21) & 0x3FF} />,
        <Field key="imm11" name="imm[11]" bits={1} value={(inst >>> 20) & 0x1} />,
        <Field key="imm19" name="imm[19:12]" bits={8} value={(inst >>> 12) & 0xFF} />,
        <Field key="rd" name="rd" bits={5} value={rd} />,
        <Field key="op" name="opcode" bits={7} value={opcode} />,
      ];
      break;
    default: return null;
  }

  // A title is not needed here since the history item has one
  return (
    <div className="binary-breakdown" style={{ marginTop: '0' }}> 
      <div className="binary-breakdown-fields">
        {fields}
      </div>
    </div>
  );
}


// --- Helper Components ---

function toHex(value, bits = 8) {
  if (value === null || value === undefined) return 'N/A';
  let hex = (value >>> 0).toString(16).toUpperCase();
  while (hex.length < bits) hex = '0' + hex;
  return '0x' + hex;
}

function toBinary(value, bits) {
  let bin = (value >>> 0).toString(2);
  while (bin.length < bits) bin = '0' + bin;
  return bin.slice(bin.length - bits);
}

const KeyValue = ({ label, value, hl = false }) => (
  <div className="key-value">
    <span className="key-value-label">{label}:</span>
    <span className={`key-value-value ${hl ? 'hl-value' : ''}`}>{value}</span>
  </div>
);


// --- Main App Component ---

function App() {
  const [state, dispatch] = useReducer(cpuReducer, initialState);

  return (
    <CPUContext.Provider value={{ state, dispatch }}>
      <GlobalStyles />
      <div className="app-container">
        <HeaderControls />
        <div className="main-content">
          <div className="main-grid">
            
            {/* Column 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <ProgramLoader />
              <InstructionMemory />
              <DataMemory />
            </div>

            {/* Column 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <RegisterFile />
              <ControlUnit />
            </div>
            
            {/* Column 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <DecodeALU />
              <InstructionHistory /> {/* <-- NEW COMPONENT ADDED HERE */}
            </div>

            {/* Removed the bottom spanning row */}

          </div>
        </div>
      </div>
    </CPUContext.Provider>
  
  );
}

export default App;