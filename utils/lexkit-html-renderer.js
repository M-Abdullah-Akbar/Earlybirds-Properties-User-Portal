/**
 * LexKit HTML Renderer for User Portal
 * 
 * This utility handles rendering lexkit-generated HTML content in the user portal.
 * It ensures that lexkit CSS classes are properly applied and content is safely rendered.
 */

/**
 * Renders lexkit HTML content safely
 * @param {string|object} content - The content to render (HTML string or object)
 * @returns {string} - Safe HTML string ready for dangerouslySetInnerHTML
 */
export function renderLexkitHtml(content) {
  // Handle null/undefined content
  if (!content) {
    return '<p class="text-muted">No content available.</p>';
  }

  // If content is an object, try to extract HTML from it
  if (typeof content === 'object') {
    // Check if it's a lexkit HTML string stored in a property
    if (content.html) {
      content = content.html;
    } else if (content.content) {
      content = content.content;
    } else if (content.description) {
      content = content.description;
    } else {
      // Try to stringify the object and extract HTML
      const stringified = JSON.stringify(content);
      if (stringified.includes('lexkit-')) {
        // Extract HTML from JSON string
        const htmlMatch = stringified.match(/"([^"]*lexkit-[^"]*)"/);
        if (htmlMatch) {
          content = htmlMatch[1];
        } else {
          return '<p class="text-muted">Content format not supported.</p>';
        }
      } else {
        return '<p class="text-muted">Content format not supported.</p>';
      }
    }
  }

  // Ensure content is a string
  if (typeof content !== 'string') {
    return '<p class="text-muted">Invalid content format.</p>';
  }

  // Trim whitespace
  content = content.trim();

  // Handle empty content
  if (!content) {
    return '<p class="text-muted">No content available.</p>';
  }

  // Check if content is already HTML (contains lexkit classes)
  if (content.includes('lexkit-') || content.includes('<p') || content.includes('<h')) {
    // Content is already HTML, ensure lists are properly formatted
    return ensureListFormatting(content);
  }

  // If content doesn't contain HTML tags, wrap it in a paragraph
  if (!content.includes('<')) {
    return `<p class="lexkit-paragraph">${escapeHtml(content)}</p>`;
  }

  // Content appears to be HTML, ensure lists are properly formatted
  return ensureListFormatting(content);
}

/**
 * Ensures list formatting is correct for lexkit HTML
 * @param {string} html - HTML content to process
 * @returns {string} - HTML with proper list formatting
 */
function ensureListFormatting(html) {
  // Create a temporary DOM element to parse and fix the HTML
  if (typeof document !== 'undefined') {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Fix unordered lists
    const ulElements = tempDiv.querySelectorAll('ul');
    ulElements.forEach(ul => {
      ul.classList.add('lexkit-list-ul');
      // Ensure list items have proper classes
      const liElements = ul.querySelectorAll('li');
      liElements.forEach(li => {
        li.classList.add('lexkit-list-li');
      });
    });
    
    // Fix ordered lists
    const olElements = tempDiv.querySelectorAll('ol');
    olElements.forEach(ol => {
      ol.classList.add('lexkit-list-ol');
      ol.style.listStyleType = 'decimal';
      ol.style.listStyle = 'decimal outside';
      ol.style.paddingLeft = '2em';
      ol.style.margin = '1em 0';
      // Ensure list items have proper classes
      const liElements = ol.querySelectorAll('li');
      liElements.forEach(li => {
        li.classList.add('lexkit-list-li');
        li.style.display = 'list-item';
        li.style.listStylePosition = 'outside';
        li.style.listStyleType = 'decimal';
      });
    });
    
    return tempDiv.innerHTML;
  }
  
  // Fallback for server-side rendering - use regex to add classes
  let processedHtml = html;
  
  // Add lexkit classes to ul elements
  processedHtml = processedHtml.replace(/<ul([^>]*)>/g, (match, attrs) => {
    const hasClass = attrs.includes('class=');
    if (hasClass) {
      return match.replace(/class="([^"]*)"/, 'class="$1 lexkit-list-ul"');
    } else {
      return `<ul${attrs} class="lexkit-list-ul">`;
    }
  });
  
  // Add lexkit classes and inline styles to ol elements
  processedHtml = processedHtml.replace(/<ol([^>]*)>/g, (match, attrs) => {
    const hasClass = attrs.includes('class=');
    const hasStyle = attrs.includes('style=');
    let newAttrs = attrs;
    
    if (hasClass) {
      newAttrs = newAttrs.replace(/class="([^"]*)"/, 'class="$1 lexkit-list-ol"');
    } else {
      newAttrs += ' class="lexkit-list-ol"';
    }
    
    if (hasStyle) {
      newAttrs = newAttrs.replace(/style="([^"]*)"/, 'style="$1; list-style-type: decimal; list-style: decimal outside; padding-left: 2em; margin: 1em 0;"');
    } else {
      newAttrs += ' style="list-style-type: decimal; list-style: decimal outside; padding-left: 2em; margin: 1em 0;"';
    }
    
    return `<ol${newAttrs}>`;
  });
  
  // Add lexkit classes and inline styles to li elements
  processedHtml = processedHtml.replace(/<li([^>]*)>/g, (match, attrs) => {
    const hasClass = attrs.includes('class=');
    const hasStyle = attrs.includes('style=');
    let newAttrs = attrs;
    
    if (hasClass) {
      newAttrs = newAttrs.replace(/class="([^"]*)"/, 'class="$1 lexkit-list-li"');
    } else {
      newAttrs += ' class="lexkit-list-li"';
    }
    
    if (hasStyle) {
      newAttrs = newAttrs.replace(/style="([^"]*)"/, 'style="$1; display: list-item; list-style-position: outside;"');
    } else {
      newAttrs += ' style="display: list-item; list-style-position: outside;"';
    }
    
    return `<li${newAttrs}>`;
  });
  
  return processedHtml;
}

/**
 * Escapes HTML characters to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} - Escaped HTML
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Validates if content contains lexkit HTML
 * @param {string} content - Content to validate
 * @returns {boolean} - True if content contains lexkit HTML
 */
export function isLexkitHtml(content) {
  if (!content || typeof content !== 'string') {
    return false;
  }
  
  return content.includes('lexkit-') || 
         content.includes('<p class="lexkit-') || 
         content.includes('<h1 class="lexkit-') ||
         content.includes('<h2 class="lexkit-') ||
         content.includes('<h3 class="lexkit-') ||
         content.includes('<h4 class="lexkit-') ||
         content.includes('<h5 class="lexkit-') ||
         content.includes('<h6 class="lexkit-');
}

/**
 * Fallback renderer for backward compatibility with TipTap content
 * @param {string|object} content - Content to render
 * @returns {string} - Rendered HTML
 */
export function renderContentWithFallback(content) {
  // First try lexkit HTML rendering
  if (isLexkitHtml(content)) {
    return renderLexkitHtml(content);
  }
  
  // Fallback to TipTap JSON rendering for backward compatibility
  try {
    // Import TipTap renderer dynamically to avoid breaking if not available
    const { renderTiptapJson } = require('./tiptap-html-renderer');
    return renderTiptapJson(content);
  } catch (error) {
    console.warn('TipTap renderer not available, using basic HTML rendering');
    return renderLexkitHtml(content);
  }
}
