export const pollinationImage = (prompt, width = 1920, height = 1080) => {
  const qualityPrompt = `${prompt}, premium editorial photography, crisp focus, natural material color, balanced exposure, no text, no logo, no watermark`;
  const safePrompt = encodeURIComponent(qualityPrompt.trim());

  return `https://image.pollinations.ai/prompt/${safePrompt}?width=${width}&height=${height}&nologo=true`;
};

export const imageUrl = pollinationImage;

export const images = {
  heroCut: pollinationImage(
    "macro view of a clean straight cut through dark walnut furniture board, fine sawdust line, brushed titanium guide rail, warm graphite studio light, realistic workshop detail",
    2200,
    1400
  ),
  cncHead: pollinationImage(
    "modern cnc woodworking head above matte graphite furniture panel, chrome rails, walnut particles, controlled industrial light, high end production atelier",
    1920,
    1280
  ),
  edgeBanding: pollinationImage(
    "premium edge banding machine applying dark walnut strip to a furniture panel, precise chrome rollers, soft warm workshop light, clean realistic manufacturing scene",
    1920,
    1280
  ),
  drilling: pollinationImage(
    "close up multi spindle drilling machine making cabinet hardware holes in dark wood panel, titanium bits, clean dust extraction, realistic high precision furniture production",
    1920,
    1280
  ),
  detailing: pollinationImage(
    "furniture detailing table with cut maps, digital caliper, walnut samples, brushed metal ruler, black paper, minimal luxury workshop photography",
    1920,
    1280
  ),
  caliper: pollinationImage(
    "technician measuring a freshly cut dark walnut furniture panel with a digital caliper, clean cnc workshop background, titanium ruler, warm balanced editorial light",
    1600,
    1900
  ),
  walnutTexture: pollinationImage(
    "dark american walnut end grain texture, freshly cut and lightly oiled surface, warm graphite background, luxury material study macro photograph",
    1920,
    1280
  ),
  titaniumMachine: pollinationImage(
    "wide angle high tech furniture cutting workshop, cnc beam saw, titanium and chrome machinery, dark concrete floor, clean industrial luxury, no people",
    1920,
    1080
  ),
  processCut: pollinationImage(
    "large format beam saw slicing premium walnut laminated board, exact straight cut, controlled sawdust particles, titanium machine detail, realistic industrial light",
    1920,
    1280
  ),
  processEdge: pollinationImage(
    "automated edge banding line sealing cabinet panel with dark walnut veneer, chrome rollers, warm wood tones, black steel, clean realistic workshop",
    1920,
    1280
  ),
  processCnc: pollinationImage(
    "cnc router carving precise grooves in matte black furniture board, sharp spindle detail, graphite and titanium tones, balanced industrial light",
    1920,
    1280
  ),
  processPack: pollinationImage(
    "finished custom furniture panels stacked with protective graphite felt, small labels, metal caliper, walnut edges, premium manufacturing atelier",
    1920,
    1280
  ),
};
