/**
 * Utility functions for handling TipTap editor content
 * These functions help convert between JSON and HTML formats
 * Includes utilities adapted from the admin portal for consistent behavior
 */

// Constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// Regular expression for whitespace in URLs
const ATTR_WHITESPACE = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} html - The string to escape
 * @returns {string} Escaped HTML string
 */
function escapeHtml(html) {
  if (!html) return '';
  
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Convert TipTap JSON content to HTML string for rendering
 * @param {Object|string} jsonContent - TipTap JSON content (object or stringified JSON)
 * @returns {string} HTML string that can be rendered with dangerouslySetInnerHTML
 */
export function jsonToHtml(jsonContent) {
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
  
  // Process the JSON content and convert to HTML
  return processNode(content);
}

/**
 * Checks if a URL is allowed based on protocols
 * @param {string} uri - The URI to check
 * @param {Array} protocols - Optional additional allowed protocols
 * @returns {boolean} Whether the URI is allowed
 */
export function isAllowedUri(uri, protocols) {
  const allowedProtocols = [
    "http",
    "https",
    "ftp",
    "ftps",
    "mailto",
    "tel",
    "callto",
    "sms",
    "cid",
    "xmpp",
  ]

  if (protocols) {
    protocols.forEach((protocol) => {
      const nextProtocol =
        typeof protocol === "string" ? protocol : protocol.scheme

      if (nextProtocol) {
        allowedProtocols.push(nextProtocol)
      }
    })
  }

  return (!uri || uri.replace(ATTR_WHITESPACE, "").match(new RegExp(
  `^(?:(?:${allowedProtocols.join("|")}):|[^a-z]|[a-z0-9+.\-]+(?:[^a-z+.\-:]|$))`, "i")));
}

/**
 * Sanitizes a URL to prevent XSS attacks
 * @param {string} inputUrl - The URL to sanitize
 * @param {string} baseUrl - Optional base URL for relative URLs
 * @param {Array} protocols - Optional additional allowed protocols
 * @returns {string} Sanitized URL
 */
export function sanitizeUrl(inputUrl, baseUrl, protocols) {
  try {
    const url = new URL(inputUrl, baseUrl)

    if (isAllowedUri(url.href, protocols)) {
      return url.href
    }
  } catch {
    // If URL creation fails, it's considered invalid
  }
  return "#"
}

/**
 * Helper function to combine CSS classes
 * @param {...string} classes - CSS class names to combine
 * @returns {string} Combined class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Process a TipTap node and convert it to HTML
 * @param {Object} node - TipTap node object
 * @returns {string} HTML string
 */
function processNode(node) {
  if (!node) return '';
  
  // Handle text nodes
  if (node.type === 'text') {
    let text = escapeHtml(node.text || '');
    
    // Apply marks (bold, italic, etc.)
    if (node.marks && node.marks.length > 0) {
      node.marks.forEach(mark => {
        switch (mark.type) {
          case 'bold':
            text = `<strong>${text}</strong>`;
            break;
          case 'italic':
            text = `<em>${text}</em>`;
            break;
          case 'underline':
            text = `<u>${text}</u>`;
            break;
          case 'strike':
            text = `<s>${text}</s>`;
            break;
          case 'code':
            text = `<code>${text}</code>`;
            break;
          case 'link':
            // Sanitize URL before using it
            const href = sanitizeUrl(mark.attrs?.href || '#');
            text = `<a href="${href}" target="${mark.attrs?.target || '_blank'}">${text}</a>`;
            break;
          case 'highlight':
            const highlightColor = mark.attrs?.color || 'yellow';
            text = `<mark style="background-color: ${highlightColor}">${text}</mark>`;
            break;
          case 'subscript':
            text = `<sub>${text}</sub>`;
            break;
          case 'superscript':
            text = `<sup>${text}</sup>`;
            break;
          case 'textStyle':
            const textColor = mark.attrs?.color;
            if (textColor) {
              text = `<span style="color: ${textColor}">${text}</span>`;
            }
            break;
        }
      });
    }
    
    return text;
  }
  
  // Process child nodes recursively
  let innerHTML = '';
  if (node.content && node.content.length > 0) {
    innerHTML = node.content.map(child => processNode(child)).join('');
  }
  
  // Handle different node types
  switch (node.type) {
    case 'doc':
      return innerHTML;
      
    case 'paragraph':
      const textAlign = node.attrs?.textAlign ? ` style="text-align: ${node.attrs.textAlign}"` : '';
      return `<p${textAlign}>${innerHTML}</p>`;
      
    case 'heading':
      const level = node.attrs?.level || 1;
      const headingAlign = node.attrs?.textAlign ? ` style="text-align: ${node.attrs.textAlign}"` : '';
      return `<h${level}${headingAlign}>${innerHTML}</h${level}>`;
      
    case 'bulletList':
      return `<ul>${innerHTML}</ul>`;
      
    case 'orderedList':
      return `<ol>${innerHTML}</ol>`;
      
    case 'listItem':
      return `<li>${innerHTML}</li>`;
      
    case 'taskList':
      return `<ul class="task-list">${innerHTML}</ul>`;
      
    case 'taskItem':
      const checked = node.attrs?.checked ? ' checked' : '';
      return `<li class="task-item"><input type="checkbox"${checked} disabled />${innerHTML}</li>`;
      
    case 'blockquote':
      return `<blockquote>${innerHTML}</blockquote>`;
      
    case 'codeBlock':
      const language = node.attrs?.language || '';
      return `<pre><code class="language-${language}">${innerHTML}</code></pre>`;
      
    case 'horizontalRule':
      return '<hr />';
      
    case 'image':
      // Sanitize image URL
      const src = sanitizeUrl(node.attrs?.src || '');
      const alt = node.attrs?.alt || '';
      const title = node.attrs?.title ? ` title="${node.attrs.title}"` : '';
      const width = node.attrs?.width ? ` width="${node.attrs.width}"` : '';
      const height = node.attrs?.height ? ` height="${node.attrs.height}"` : '';
      return `<img src="${src}" alt="${alt}"${title}${width}${height} />`;
    
    // Table support
    case 'table':
      return `<table class="tiptap-table">${innerHTML}</table>`;
      
    case 'tableRow':
      return `<tr>${innerHTML}</tr>`;
      
    case 'tableHeader':
      const thAlign = getTableCellAlignment(node);
      return `<th${thAlign}>${innerHTML}</th>`;
      
    case 'tableCell':
      const tdAlign = getTableCellAlignment(node);
      return `<td${tdAlign}>${innerHTML}</td>`;
    
    // Callout/notice support
    case 'callout':
      const calloutType = node.attrs?.type || 'info';
      return `<div class="callout callout-${calloutType}">${innerHTML}</div>`;
    
    // Iframe support
    case 'iframe':
      const iframeSrc = sanitizeUrl(node.attrs?.src || '');
      const iframeTitle = node.attrs?.title || '';
      const iframeWidth = node.attrs?.width || '100%';
      const iframeHeight = node.attrs?.height || '315';
      return `<div class="iframe-wrapper"><iframe src="${iframeSrc}" title="${iframeTitle}" width="${iframeWidth}" height="${iframeHeight}" frameborder="0" allowfullscreen></iframe></div>`;
      
    default:
      return innerHTML;
  }
}

/**
 * Helper function to get table cell alignment style attribute
 * @param {Object} node - Table cell node
 * @returns {string} Style attribute with text alignment if specified
 */
function getTableCellAlignment(node) {
  if (!node.attrs) return '';
  
  let style = '';
  
  if (node.attrs.textAlign) {
    style += `text-align: ${node.attrs.textAlign};`;
  }
  
  if (style) {
    return ` style="${style}"`;
  }
  
  return '';
}

/**
 * Ensure content is in the correct JSON format for TipTap editor
 * @param {Object|string} content - Content to validate (object or stringified JSON)
 * @returns {Object} Valid TipTap JSON content
 */
export function ensureJsonContent(content) {
  // Default empty document structure
  const emptyContent = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        attrs: { textAlign: null },
        content: [{ type: "text", text: "" }]
      }
    ]
  };
  
  if (!content) return emptyContent;
  
  try {
    // If content is already a JSON object, validate it
    if (typeof content === 'object') {
      // Check if it has the required structure
      if (content.type === 'doc') {
        return content;
      }
      // If not, wrap it in a doc structure
      return {
        type: "doc",
        content: [content]
      };
    }
    
    // Try to parse content as JSON string
    const parsedContent = JSON.parse(content);
    
    // Check if parsed content has the required structure
    if (parsedContent.type === 'doc') {
      return parsedContent;
    }
    
    // If not, wrap it in a doc structure
    return {
      type: "doc",
      content: [parsedContent]
    };
  } catch (e) {
    console.warn('Failed to parse content as JSON:', e);
    
    // If parsing fails, create a document with the content as text
    return {
      type: "doc",
      content: [
        {
          type: "paragraph",
          attrs: { textAlign: null },
          content: [{ type: "text", text: content }]
        }
      ]
    };
  }
}

/**
 * Extracts plain text content from TipTap JSON
 * @param {Object|string} jsonContent - TipTap JSON content
 * @returns {string} Plain text content without HTML tags
 */
export function jsonToPlainText(jsonContent) {
  // If no content provided, return empty string
  if (!jsonContent) return '';
  
  // Parse JSON string if needed
  let content;
  try {
    content = typeof jsonContent === 'string' ? JSON.parse(jsonContent) : jsonContent;
  } catch (e) {
    console.warn('Failed to parse JSON content:', e);
    return typeof jsonContent === 'string' ? jsonContent : '';
  }
  
  // Handle empty content
  if (!content || !content.content || content.content.length === 0) {
    return '';
  }
  
  // Process the JSON content and extract plain text
  return extractTextFromNode(content);
}

/**
 * Extract plain text from a TipTap node
 * @param {Object} node - TipTap node object
 * @returns {string} Plain text content
 */
function extractTextFromNode(node) {
  if (!node) return '';
  
  // Handle text nodes
  if (node.type === 'text') {
    return node.text || '';
  }
  
  // Process child nodes recursively
  let text = '';
  if (node.content && node.content.length > 0) {
    text = node.content.map(child => extractTextFromNode(child)).join('');
  }
  
  // Add appropriate spacing based on node type
  switch (node.type) {
    case 'paragraph':
      return text + '\n\n';
    case 'heading':
      return text + '\n\n';
    case 'listItem':
    case 'taskItem':
      return '• ' + text + '\n';
    case 'horizontalRule':
      return '\n---\n';
    default:
      return text;
  }
}

/**
 * Truncates text to a specified length with ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text with ellipsis if needed
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Creates a summary from TipTap JSON content
 * @param {Object|string} jsonContent - TipTap JSON content
 * @param {number} maxLength - Maximum length of the summary
 * @returns {string} Plain text summary
 */
export function createSummaryFromJson(jsonContent, maxLength = 150) {
  const plainText = jsonToPlainText(jsonContent);
  return truncateText(plainText, maxLength);
}