import { Position } from 'reactflow';
import { FileInputIcon as Input, FileText, Cpu, FileOutputIcon as Output, Type, Book, Mail, FilesIcon as DocsIcon } from 'lucide-react';

export const nodeConfigurations = {
  customInput: {
    title: 'Input Node',
    fields: [
      { label: 'Name', key: 'inputName', type: 'input', customCSS: 'bg-green-50 dark:bg-green-900' },
      { label: 'Type', key: 'inputType', type: 'select', options: ['Text', 'File'], customCSS: 'bg-green-50 dark:bg-green-900' }
    ],
    handles: [
      { type: 'source', position: Position.Right, id: 'value' }
    ],
    initialState: { inputName: '', inputType: 'Text' },
    style: { 
      className: 'border-2 border-green-500',
      style: { backgroundColor: 'rgba(236, 253, 245, 0.4)' }
    },
    icon: Input
  },
  llm: {
    title: 'LLM Node',
    fields: [
      { label: 'Type', key: 'inputType', type: 'select', options: ['OpenAi LLM', 'Google LLM'], customCSS: 'bg-green-50 dark:bg-green-900' }
    ],
    handles: [
      { type: 'target', position: Position.Left, id: 'system', style: { top: '33%' } },
      { type: 'target', position: Position.Left, id: 'prompt', style: { top: '66%' } },
      { type: 'source', position: Position.Right, id: 'response' }
    ],
    initialState: {},
    style: { 
      className: 'border-2 border-blue-500',
      style: { backgroundColor: 'rgba(224, 242, 254, 0.4)' }
    },
    icon: Cpu
  },
  customOutput: {
    title: 'Output Node',
    fields: [
      { label: 'Name', key: 'outputName', type: 'text', customCSS: 'bg-yellow-50 dark:bg-yellow-900' },
      { label: 'Type', key: 'outputType', type: 'select', options: ['Text', 'Image'], customCSS: 'bg-yellow-50 dark:bg-yellow-900' }
    ],
    handles: [
      { type: 'target', position: Position.Left, id: 'value' }
    ],
    initialState: { outputName: '', outputType: 'Text' },
    style: { 
      className: 'border-2 border-yellow-500',
      style: { backgroundColor: 'rgba(254, 252, 232, 0.4)' }
    },
    icon: Output
  },
  text: {
    title: 'Text Node',
    fields: [
      { label: 'Text', key: 'text', type: 'text', customCSS: 'bg-gray-50 dark:bg-gray-700' }
    ],
    handles: [
      { type: 'source', position: Position.Right, id: 'output' }
    ],
    initialState: { text: '' },
    style: { 
      className: 'border-2 border-gray-500',
      style: { backgroundColor: 'rgba(249, 250, 251, 0.4)' }
    },
    icon: Type
  },
  Api: {
    title: 'Data Fetch Node',
    fields: [
      { label: 'API', key: 'api', type: 'text', customCSS: 'bg-purple-50 dark:bg-purple-900' },
    ],
    handles: [
      { type: 'source', position: Position.Right, id: 'value' }
    ],
    initialState: { api: '' },
    style: { 
      className: 'border-2 border-purple-500',
      style: { backgroundColor: 'rgba(236, 253, 245, 0.4)' }
    },
    icon: Input
  },
  knowledgeBase: {
    title: 'Knowledge',
    fields: [
      { label: 'Name', key: 'kbName', type: 'text', customCSS: 'bg-indigo-50 dark:bg-indigo-900' },
      { label: 'Type', key: 'inputType', type: 'select', options: ['Library', 'File'], customCSS: 'bg-indigo-50 dark:bg-indigo-900'}
    ],
    handles: [
      { type: 'target', position: Position.Left, id: 'input' },
      { type: 'source', position: Position.Right, id: 'output' }
    ],
    initialState: { kbName: '', kbDescription: '' },
    style: { 
      className: 'border-2 border-indigo-500',
      style: { backgroundColor: 'rgba(237, 242, 255, 0.4)' }
    },
    icon: Book
  },
  gmail: {
    title: 'Gmail Node',
    fields: [
      { label: 'Action', key: 'action', type: 'select', options: ['Read', 'Send'], customCSS: 'bg-red-50 dark:bg-red-900' },
      { label: 'Query', key: 'query', type: 'text', customCSS: 'bg-red-50 dark:bg-red-900' }
    ],
    handles: [
      { type: 'target', position: Position.Left, id: 'subject', style: { top: '45%' } },
      { type: 'target', position: Position.Left, id: 'recipients', style: { top: '55%' } },
      { type: 'target', position: Position.Left, id: 'llmout', style: { top: '65%' } },
      // { type: 'source', position: Position.Right, id: 'output' }
    ],
    initialState: { action: 'Read', query: '' },
    style: { 
      className: 'border-2 border-red-500',
      style: { backgroundColor: 'rgba(254, 242, 242, 0.4)' }
    },
    icon: Mail
  },
  docs: {
    title: 'Google Docs Node',
    fields: [
      { label: 'Action', key: 'action', type: 'select', options: ['Read', 'Write', 'Edit'], customCSS: 'bg-blue-50 dark:bg-blue-900' },
      { label: 'Document ID', key: 'docId', type: 'text', customCSS: 'bg-blue-50 dark:bg-blue-900' }
    ],
    handles: [
      { type: 'target', position: Position.Left, id: 'input' },
      { type: 'source', position: Position.Right, id: 'output' }
    ],
    initialState: { action: 'Read', docId: '' },
    style: { 
      className: 'border-2 border-blue-500',
      style: { backgroundColor: 'rgba(239, 246, 255, 0.4)' }
    },
    icon: DocsIcon
  }
};

