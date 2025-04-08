function removeCommentsFromString(htmlString: string): string {
  return htmlString.replace(/<!--[\s\S]*?-->/g, '');
}

export {
  removeCommentsFromString,
}
