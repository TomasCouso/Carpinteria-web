// API Configuration
const API_BASE_URL = '/api'; // Using relative URL since frontend and backend are served from the same server

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Load featured projects on homepage
    if (document.getElementById('featured-projects')) {
        loadFeaturedProjects();
    }
    
    // Set up category filtering on categories page
    if (document.querySelector('.filter-buttons')) {
        setupCategoryFiltering();
    }
});

// Load featured projects for homepage
async function loadFeaturedProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        const projects = await response.json();
        
        const container = document.getElementById('featured-projects');
        
        if (projects.length === 0) {
            container.innerHTML = '<p class="text-center">No hay proyectos disponibles en este momento.</p>';
            return;
        }
        
        // Show only first 6 projects as featured
        const featuredProjects = projects.slice(0, 6);
        
        container.innerHTML = featuredProjects.map(project => `
            <div class="project-card">
                <div class="project-image">
                    <img src="${project.imagenes[0] || 'https://images.unsplash.com/photo-1595535873420-a599ec73c3a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'}" alt="${project.titulo}" onerror="this.src='https://images.unsplash.com/photo-1595535873420-a599ec73c3a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'">
                </div>
                <div class="project-content">
                    <h3>${project.titulo}</h3>
                    <span class="project-category">${getCategoryName(project.categoria)}</span>
                    <p class="project-description">${project.descripcion || 'Sin descripción disponible.'}</p>
                    <a href="proyecto.html?id=${project._id}" class="btn btn-secondary">Ver Detalles</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('featured-projects').innerHTML = 
            '<p class="text-center">Error al cargar los proyectos. Por favor, inténtelo más tarde.</p>';
    }
}

// Load all projects for categories page
async function loadProjects(category = null) {
    try {
        const url = category ? `${API_BASE_URL}/posts?categoria=${category}` : `${API_BASE_URL}/posts`;
        const response = await fetch(url);
        const projects = await response.json();
        
        const container = document.getElementById('projects-container');
        
        if (projects.length === 0) {
            container.innerHTML = '<p class="text-center">No hay proyectos disponibles en esta categoría.</p>';
            return;
        }
        
        container.innerHTML = projects.map(project => `
            <div class="project-card">
                <div class="project-image">
                    <img src="${project.imagenes[0] || 'https://images.unsplash.com/photo-1595535873420-a599ec73c3a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'}" alt="${project.titulo}" onerror="this.src='https://images.unsplash.com/photo-1595535873420-a599ec73c3a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'">
                </div>
                <div class="project-content">
                    <h3>${project.titulo}</h3>
                    <span class="project-category">${getCategoryName(project.categoria)}</span>
                    <p class="project-description">${project.descripcion || 'Sin descripción disponible.'}</p>
                    <a href="proyecto.html?id=${project._id}" class="btn btn-secondary">Ver Detalles</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projects-container').innerHTML = 
            '<p class="text-center">Error al cargar los proyectos. Por favor, inténtelo más tarde.</p>';
    }
}

// Filter projects by category
function filterProjects(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Load projects for selected category
    loadProjects(category === 'all' ? null : category);
}

// Set up category filtering
function setupCategoryFiltering() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProjects(category);
        });
    });
    
    // Load all projects by default
    loadProjects();
}

// Load project detail
async function loadProjectDetail(projectId) {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        const projects = await response.json();
        
        // Find the project with the matching ID
        const project = projects.find(p => p._id === projectId);
        
        if (!project) {
            document.getElementById('project-detail-container').innerHTML = `
                <h2>Proyecto no encontrado</h2>
                <p>Lo sentimos, no pudimos encontrar el proyecto solicitado.</p>
                <a href="categorias.html" class="btn btn-primary">Ver todos los proyectos</a>
            `;
            return;
        }
        
        // Load project detail
        const detailContainer = document.getElementById('project-detail-container');
        detailContainer.innerHTML = `
            <div class="project-detail-image">
                <img src="${project.imagenes[0] || 'https://images.unsplash.com/photo-1595535873420-a599ec73c3a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'}" alt="${project.titulo}" onerror="this.src='https://images.unsplash.com/photo-1595535873420-a599ec73c3a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'">
            </div>
            <div class="project-detail-info">
                <h1>${project.titulo}</h1>
                <span class="project-category">${getCategoryName(project.categoria)}</span>
                <p>${project.descripcion || 'Sin descripción disponible.'}</p>
                ${project.modelo ? `<p><strong>Modelo:</strong> ${project.modelo}</p>` : ''}
            </div>
        `;
        
        // Load related projects (same category)
        loadRelatedProjects(project.categoria, projectId);
    } catch (error) {
        console.error('Error loading project detail:', error);
        document.getElementById('project-detail-container').innerHTML = `
            <h2>Error al cargar el proyecto</h2>
            <p>Lo sentimos, hubo un error al cargar los detalles del proyecto.</p>
            <a href="categorias.html" class="btn btn-primary">Ver todos los proyectos</a>
        `;
    }
}

// Load related projects
async function loadRelatedProjects(category, excludeId) {
    try {
        const response = await fetch(`${API_BASE_URL}/posts?categoria=${category}`);
        const projects = await response.json();
        
        // Filter out the current project
        const relatedProjects = projects.filter(project => project._id !== excludeId).slice(0, 4);
        
        const container = document.getElementById('related-projects');
        
        if (relatedProjects.length === 0) {
            container.innerHTML = '<p class="text-center">No hay proyectos relacionados disponibles.</p>';
            return;
        }
        
        container.innerHTML = relatedProjects.map(project => `
            <div class="project-card">
                <div class="project-image">
                    <img src="${project.imagenes[0] || 'https://images.unsplash.com/photo-1595535873420-a599ec73c3a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'}" alt="${project.titulo}" onerror="this.src='https://images.unsplash.com/photo-1595535873420-a599ec73c3a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'">
                </div>
                <div class="project-content">
                    <h3>${project.titulo}</h3>
                    <span class="project-category">${getCategoryName(project.categoria)}</span>
                    <p class="project-description">${project.descripcion || 'Sin descripción disponible.'}</p>
                    <a href="proyecto.html?id=${project._id}" class="btn btn-secondary">Ver Detalles</a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading related projects:', error);
        document.getElementById('related-projects').innerHTML = 
            '<p class="text-center">Error al cargar proyectos relacionados.</p>';
    }
}

// Helper function to get category name in Spanish
function getCategoryName(category) {
    const categories = {
        'cocina': 'Cocina',
        'dormitorio': 'Dormitorio',
        'living': 'Living',
        'baño': 'Baño'
    };
    return categories[category] || category;
}

// WhatsApp contact function
function contactViaWhatsApp(message) {
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
