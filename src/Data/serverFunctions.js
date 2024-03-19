import { updateDocument, deleteDocument, readDocuments } from '../Data/firestoreOperations';


export const updateProject = async (project) => {
    try {
        await updateDocument('projects', project.id, project)
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error;
    }
    
}
export const deleteProject = async (collectionName, docId) => {
    try {
        await deleteDocument(collectionName, docId)
    } catch (error) {
        console.error("Error removing document: ", error);
        throw error;
    }
}