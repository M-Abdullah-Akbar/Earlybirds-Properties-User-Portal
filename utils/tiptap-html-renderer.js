/**
 * TipTap HTML Renderer
 * Uses the official @tiptap/html library to convert TipTap JSON to HTML
 */

import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
// Note: Underline and Link are included in StarterKit, so we don't import them separately
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

/**
 * Consolidates list content by removing paragraph wrappers inside list items
 * and converting them to single line format
 * @param {string} html - HTML string to process
 * @returns {string} Processed HTML with consolidated list content
 */
function consolidateListContent(html) {
  if (!html) return html;
  
  // Replace paragraph tags inside list items with their content only
  // This handles both <li><p>content</p></li> and <li><p>content</p><p>more content</p></li>
  html = html.replace(/<li[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<\/li>/gi, '<li>$1</li>');
  
  // Handle multiple paragraphs in a single list item by joining them with a space
  html = html.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (match, content) => {
    // Remove all paragraph tags and join content with spaces
    const cleanContent = content
      .replace(/<\/p>\s*<p[^>]*>/gi, ' ') // Join multiple paragraphs with space
      .replace(/<\/?p[^>]*>/gi, '') // Remove remaining paragraph tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    return `<li>${cleanContent}</li>`;
  });
  
  return html;
}

/**
 * Renders TipTap JSON content to HTML using the official @tiptap/html library
 * @param {Object|string} jsonContent - TipTap JSON content (object or stringified JSON)
 * @returns {string} HTML string that can be rendered with dangerouslySetInnerHTML
 */
export function renderTiptapJson(jsonContent) {
  // If no content provided, return empty string
  if (!jsonContent) return '';
  
  // Parse JSON string if needed
  let content;
  try {
    content = typeof jsonContent === 'string' ? JSON.parse(jsonContent) : jsonContent;
  } catch (e) {
    console.warn('Failed to parse JSON content:', e);
    return `<p>${jsonContent}</p>`; // Fallback to displaying as plain text
  }
  
  // Handle empty content
  if (!content || !content.content || content.content.length === 0) {
    return '';
  }
  
  // Generate HTML using TipTap's official library
  try {
    const html = generateHTML(content, [
      StarterKit,
      // Note: Link and Underline are already included in StarterKit, so we don't add them again
      Highlight,
      Superscript,
      Subscript,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ]);
    
    // Post-process the HTML to consolidate list content
    return consolidateListContent(html);
  } catch (error) {
    console.error('Error generating HTML from TipTap JSON:', error);
    return '';
  }
}