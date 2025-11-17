// src/components/admin/PostsList.jsx
import React from 'react';

// Este componente recibe la lista de 'posts' como un prop
export default function PostsList({ posts }) {

  // Esta función maneja el clic de 'Eliminar'
  const handleDeleteClick = (event, post) => {
    // Usamos el 'confirm' de JavaScript
    const confirmed = confirm(`¿Estás seguro de que quieres eliminar "${post.title}"?`);
    
    // Si el usuario presiona "Cancelar", prevenimos que el enlace se active
    if (!confirmed) {
      event.preventDefault();
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {posts.length > 0 ? (
          posts.map(post => (
            <tr key={post.id}> 
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.category}</td>
              <td className="action-links"> {/* 'class' se escribe 'className' en JSX */}
                <a href={`/admin/editar-post?id=${post.id}`}>Editar</a>
                
                {/* Usamos el 'onClick' (camelCase) de React, que funciona perfecto.
                */}
                <a 
                  href={`/api/admin/eliminar-post.js?id=${post.id}`} 
                  onClick={(event) => handleDeleteClick(event, post)}
                >
                  Eliminar
                </a>
              </td>
            </tr>
          ))
        ) : (
          <tr><td colSpan="4">No hay artículos registrados.</td></tr>
        )}
      </tbody>
    </table>
  );
}