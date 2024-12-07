// draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      style={{
        cursor: 'grab',
        minWidth: '90px', 
        minHeight: '80px', 
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #1E2A47, #3A475C)',
        gap: '8px', 
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
      draggable
    >
      {icon && (
        <div
          style={{
            fontSize: '24px', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon}
        </div>
      )}
      <span
        style={{
          color: '#fff',
          fontSize: '14px', 
          wordWrap: 'break-word',
          textAlign: 'center',
        }}
      >
        {label}
      </span>
    </div>

  );
};
