import { useState } from 'react'
import { DraggableNode } from './draggableNode'
import { Cpu, FileJson2, TextCursorInput, ChevronDown, ChevronUp, Book } from 'lucide-react'
import { MdInput, MdOutput } from "react-icons/md"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip"
import { Button } from "./components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs"

export const PipelineToolbar = ({ isCollapsed, toggleCollapse }) => {
  const [activeTab, setActiveTab] = useState("general")

  const nodeCategories = {
    general: [
      { type: 'customInput', label: 'Input', icon: <MdInput className="text-white transform scale-x-[-1] w-5 h-5" />, tooltip: 'Add an input node<br />Create user input field for your pipeline.' },
      { type: 'customOutput', label: 'Output', icon: <MdOutput className="text-white w-5 h-5" />, tooltip: 'Add an output node' },
      { type: 'text', label: 'Text', icon: <TextCursorInput className="text-white" />, tooltip: 'Add a text node <br/> Text field that allows for variables.' },
    ],
    llms: [
      { type: 'llm', label: 'LLM', icon: <Cpu className="text-white" />, tooltip: 'Add a language model node' },
    ],
    knowledgeBase: [
      { type: 'knowledgeBase', label: 'Knowledge', icon: <Book className="text-white" />, tooltip: 'Add a knowledge base node' },
      { type: 'Api', label: 'API', icon: <FileJson2 className="text-white" />, tooltip: 'Add an API node' },
    ],
    integrations: [
      { type: 'gmail', label: 'Gmail', icon: <MdInput className="text-white" />, tooltip: 'Add a Gmail integration node' },
      { type: 'docs', label: 'Docs', icon: <FileJson2 className="text-white" />, tooltip: 'Add a Google Docs integration node' },
    ],
  }

  return (
    <div className="relative">
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isCollapsed ? 'max-h-0 opacity-0' : 'opacity-100'}
        `}
      >
        <div className="p-4 rounded-md bg-[#fffefe] shadow-md shadow-slate-100 rounded-b-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="llms">LLMs</TabsTrigger>
              <TabsTrigger value="knowledgeBase">Knowledge Base</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
            {Object.entries(nodeCategories).map(([category, nodes]) => (
              <TabsContent key={category} value={category}>
                <div className="flex flex-wrap gap-4">
                  {nodes.map((node, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <DraggableNode
                              type={node.type}
                              label={node.label}
                              icon={node.icon}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p dangerouslySetInnerHTML={{ __html: node.tooltip }} />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      <div className="flex justify-start m-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-black"
                onClick={toggleCollapse}
              >
                {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isCollapsed ? 'Show available nodes' : 'Hide available nodes'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

