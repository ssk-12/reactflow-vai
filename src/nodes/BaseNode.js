import React, { useState, useRef, useEffect, useCallback} from 'react';
import { Handle, Position } from 'reactflow';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { useStore } from '../store';
import { X } from 'lucide-react';
import { Input } from '../components/ui/input';

const BaseNode = ({
  id,
  title = 'Node',
  fields = [],
  handles = [],
  initialState = {},
  style = {},
  icon: Icon
}) => {
  const [state, setState] = useState(initialState);
  const [dynamicHandles, setDynamicHandles] = useState([]);
  const textareaRefs = useRef({});
  const nodeRef = useRef(null);

  const deleteNode = useStore((state) => state.deleteNode);


  useEffect(() => {
    
    Object.entries(state || {}).forEach(([key, value]) => {
      const textarea = textareaRefs.current[key];
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    });

    
    const newDynamicHandles = [];
    fields.forEach(field => {
      if (field.type === 'text' && title === "Text Node") {
        const matches = state[field.key]?.match(/\{\{(\w+)\}\}/g);
        if (matches) {
          matches.forEach((match, index) => {
            const variableName = match.slice(2, -2); 
            newDynamicHandles.push({
              id: `${field.key}-${variableName}`,
              type: 'target',
              position: Position.Left,
              variableName,
              fieldKey: field.key,
              index
            });
          });
        }
      }
    });
    setDynamicHandles(newDynamicHandles);
  }, [state, fields, title]);

  const handleDeleteNode = () => {
    deleteNode(id);
  };

 

  useEffect(() => {
   
    if (nodeRef.current) {
      dynamicHandles.forEach(handle => {
        const textarea = textareaRefs.current[handle.fieldKey];
        if (textarea) {
          const lines = state[handle.fieldKey]?.split('\n') || [];
          let lineIndex = 0;
          let charCount = 0;
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(`{{${handle.variableName}}}`)) {
              lineIndex = i;
              break;
            }
            charCount += lines[i].length + 1; 
          }

          
          const textareaRect = textarea.getBoundingClientRect();
          const nodeRect = nodeRef.current.getBoundingClientRect();
          const textareaTop = textareaRect.top - nodeRect.top; 
          const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
          const handleElement = nodeRef.current.querySelector(`[data-handleid="${handle.id}"]`);

          if (handleElement) {
            
            handleElement.style.top = `${textareaTop + (lineHeight * lineIndex) + 20}px`; 
          }
        }
      });
    }
  }, [dynamicHandles, state]);

  const handleFieldChange = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div
      ref={nodeRef}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-64 ${style?.className || ''}`}
      style={style?.style}>
      <div className="flex items-center justify-between mb-4">

        <div className='flex justify-start items-center'>
          {Icon && <Icon className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className=" w-6 h-6"
          onClick={handleDeleteNode}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      {fields.map(({ label, key, type, options, customCSS }) => (
        <div key={key} className="mb-4">
          <Label
            htmlFor={key}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            {label}
          </Label>
          {type === 'text' ? (
            <Textarea
              ref={el => (textareaRefs.current[key] = el)}
              id={key}
              value={state[key] || ''}
              onChange={e => handleFieldChange(key, e.target.value)}
              className={`resize-none overflow-hidden ${customCSS}`}
              rows={0}
            />
          ) : type === 'select' ? (
            <Select
              value={state[key] || ''}
              onValueChange={value => handleFieldChange(key, value)}>
              <SelectTrigger className={`w-full ${customCSS}`}>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {options?.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : type === 'input' ? (
            <Input
              type="text"
              id={key}
              value={state[key]}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              className={`mt-1 block w-full transition-all duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 ${customCSS}`}
               />
          ): null}
        </div>
      ))}
      {handles.map(({ type, position, id, style }) => (
        <Handle
          key={id}
          type={type}
          position={position}
          id={id}
          style={{
            width: 10,
            height: 10,
            background: type === 'source' ? '#3B82F6' : '#10B981',
            border: '2px solid #ffffff',
            ...style
          }} />
      ))}

      
      {dynamicHandles.map(({ id, type, position, variableName }) => (
        <Handle
          key={id}
          type={type}
          position={position}
          id={id}
          data-handleid={id}
          style={{
            width: 10,
            height: 10,
            background: '#F59E0B',
            border: '2px solid #ffffff',
            left: -5,
          }}>
          <div
            className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-gray-100 dark:bg-gray-700 rounded px-1 text-xs"
            style={{ whiteSpace: 'nowrap' }}>
            {variableName}
          </div>
        </Handle>
      ))}
    </div>
  );
};

export default BaseNode;
