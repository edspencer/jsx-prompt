import { renderToStaticMarkup } from 'react-dom/server'

// my-jsx-prompt/src/global-render.ts
import type React from 'react';

/**
 * By default, this is undefined to signal we have no “global” function set.
 */
let globalRenderFn:
  | ((node: React.ReactNode) => string)
  | undefined;

/**
 * Set the global render function which will be used to render prompts.
 * Useful if Next JS is getting you down.
 *
 * @param fn - The function to use
 */
export function setRenderFunction(fn: (node: React.ReactNode) => string) {
  globalRenderFn = fn;
}

/**
 * Render a prompt to a string, formatting the XML output.
 *
 * @param children - The children to render
 */
export function formattedRender(children: React.ReactNode): string {
  return formatXML(
    globalRenderFn ? globalRenderFn(children) : renderToStaticMarkup(children)
  );
}

/**
 * Format XML output to be more readable.
 *
 * @param xml - The XML to format
 */
export function formatXML(xml: string): string {
  let formatted = '';
  let indent = '';
  const tab = '  '; // 2 spaces for indentation

  xml.split(/>\s*</).forEach((node) => {
    if (node.match(/^\/\w/)) {
      // Closing tag
      indent = indent.substring(tab.length);
    }
    formatted += indent + '<' + node + '>\n';
    if (node.match(/^<?\w[^>]*[^\/]$/)) {
      // Opening tag
      indent += tab;
    }
  });

  return formatted.substring(1, formatted.length - 2);
}