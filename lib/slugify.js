// lib/slugify.js
// Esto reemplaza tu lógica de preg_replace
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')         
    .replace(/[^\w-]+/g, '')      
    .replace(/--+/g, '-')        
}