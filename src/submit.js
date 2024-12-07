import React, { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';

export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pipelineAnalysis, setPipelineAnalysis] = useState({
    num_nodes: 0,
    num_edges: 0,
    is_dag: false
  });
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    
    setError(null);
    setPipelineAnalysis({
      num_nodes: 0,
      num_edges: 0,
      is_dag: false
    });

    
    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          nodes: nodes.map(node => ({
            id: node.id,
            type: node.type,
            data: node.data
          })), 
          edges: edges.map(edge => ({
            source: edge.source,
            target: edge.target
          }))
        })
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit pipeline: ${errorText}`);
      }
  
      const result = await response.json();
      console.log('Pipeline successfully submitted:', result);
     
      setPipelineAnalysis(result);
      setDialogOpen(true);
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      setError(error.message);
      setDialogOpen(true);
    } finally {
      
      setIsSubmitting(false);
    }
  };

  
  const handleDialogOpenChange = (open) => {
    setDialogOpen(open);
    if (!open) {
      setIsSubmitting(false);
      setError(null);
    }
  };

  return (
    <>
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`
          ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}
          mb-3 text-white py-2 mx-auto px-4 rounded flex justify-center items-center
        `}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={20} />
            Submitting...
          </>
        ) : (
          'Submit Pipeline'
        )}
      </button>

      <AlertDialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {error ? 'Pipeline Submission Error' : 'Pipeline Analysis'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {error ? (
                <div className="text-red-600 space-y-2">
                  <p>An error occurred while submitting the pipeline:</p>
                  <p className="font-mono bg-gray-100 p-2 rounded">{error}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p>Number of Nodes: {pipelineAnalysis.num_nodes}</p>
                  <p>Number of Edges: {pipelineAnalysis.num_edges}</p>
                  <p>Is Directed Acyclic Graph (DAG): {pipelineAnalysis.is_dag ? 'Yes' : 'No'}</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};