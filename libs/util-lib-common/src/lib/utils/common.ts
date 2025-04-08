function parseJSON(jsonString: string | null | undefined): object | null {
  const parseString = jsonString ?? '';
  try {
      const parsedData = JSON.parse(parseString);
      return parsedData;
  } catch {
      return null;
  }
}

export {
  parseJSON
}
