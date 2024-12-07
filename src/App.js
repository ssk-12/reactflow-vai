import { useState } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <PipelineToolbar
        isCollapsed={isToolbarCollapsed}
        toggleCollapse={() => setIsToolbarCollapsed(!isToolbarCollapsed)}
      />
      <div style={{ flex: 1 }}>
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
