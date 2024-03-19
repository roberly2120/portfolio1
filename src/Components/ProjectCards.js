import { useEffect, useContext, useState } from 'react';
import { db } from '../Data/firebaseConfig';
import { readDocuments } from '../Data/firestoreOperations';
import { AppContext } from '../State';
import ProjectCard from './ProjectCard';

export default function ProjectCards () {
    const { globalState, setGlobalState } = useContext(AppContext);
    const { projects, shouldFetch } = globalState;


    useEffect(() => {
        const fetchProjects = async () => {
            const myProjects = await readDocuments('projects');
            setGlobalState( prevState => ({ ...prevState, projects: myProjects, shouldFetch: false }));
        }

        if (shouldFetch) {
            fetchProjects();
        }
    }, [shouldFetch])
    
    if(!projects.length) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <div className="projects-grid">
            {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}