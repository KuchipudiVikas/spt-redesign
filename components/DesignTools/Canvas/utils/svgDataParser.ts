async function fetchSvgContentFromDataUrl(dataUrl: string): Promise<string> {
  try {
    if (!dataUrl.startsWith("data:image/svg+xml;charset=utf-8,")) {
      throw new Error("Invalid SVG data URL format");
    }

    const encodedSvgContent = dataUrl.split(",")[1];
    if (!encodedSvgContent) {
      throw new Error("No SVG data found in the data URL");
    }

    const svgContent = decodeURIComponent(encodedSvgContent);
    return svgContent;
  } catch (error) {
    console.error("[ERR]: Error decoding SVG data URL:", error);
    throw error;
  }
}

function extractTextFromSvg(svgContent: string): string[] {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
  const textElements = svgDoc.getElementsByTagName("text");
  const texts: string[] = [];

  for (let i = 0; i < textElements.length; i++) {
    texts.push(textElements[i].textContent || "");
  }

  return texts;
}

export async function readTextFromSvgDataUrl(
  dataUrl: string
): Promise<string[]> {
  try {
    const svgContent = await fetchSvgContentFromDataUrl(dataUrl);
    return extractTextFromSvg(svgContent);
  } catch (error) {
    console.error("[ERR]: Error reading text from SVG data URL:", error);
    throw error;
  }
}

export async function getMetadata(
  svgDataUrl: string
): Promise<Record<string, any> | null> {
  try {
    // Decode the data URL
    const svgData = decodeURIComponent(svgDataUrl.split(",")[1]);

    // Parse the SVG string into an SVG element
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgData, "image/svg+xml");
    const svg = doc.querySelector("svg");

    if (!svg) {
      throw new Error("Invalid SVG data");
    }

    // Extract metadata
    const metadataElement = svg.querySelector("metadata");
    if (metadataElement) {
      return JSON.parse(metadataElement.textContent || "{}");
    }

    return null;
  } catch (error) {
    console.error("Error retrieving metadata:", error);
    return null;
  }
}
