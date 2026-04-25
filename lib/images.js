export const pollinationImage = (prompt, width = 1920, height = 1080) => {
  const safePrompt = prompt
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return `https://image.pollinations.ai/prompt/${safePrompt}?width=${width}&height=${height}&nologo=true`;
};

export const imageUrl = pollinationImage;

export const images = {
  heroCut: pollinationImage(
    "macro photography of circular saw cutting dark premium walnut furniture board titanium dust cinematic cold industrial lighting ultra realistic 8k shallow depth of field"
  ),
  cncHead: pollinationImage(
    "hyperrealistic cnc woodworking machine head drilling precision holes in matte graphite furniture panel chrome rails warm walnut particles luxury industrial atelier 8k"
  ),
  edgeBanding: pollinationImage(
    "premium edge banding machine applying dark walnut veneer strip to furniture panel molten glue thin chrome line cinematic workshop lighting ultra realistic 8k"
  ),
  drilling: pollinationImage(
    "macro close up of multi spindle drilling machine making perfect cabinet hardware holes in dark wood panel titanium bits high precision industrial luxury 8k"
  ),
  detailing: pollinationImage(
    "architectural furniture detailing desk with cut maps calipers walnut samples brushed metal ruler black paper minimal luxury workshop photography 8k"
  ),
  walnutTexture: pollinationImage(
    "extreme macro texture of dark american walnut end grain freshly cut oiled surface warm graphite background luxury material study 8k"
  ),
  titaniumMachine: pollinationImage(
    "wide angle high tech furniture cutting workshop cnc beam saw titanium chrome machinery dark concrete floor cinematic industrial luxury no people 8k"
  ),
  processCut: pollinationImage(
    "large format beam saw slicing premium walnut laminated board exact straight cut floating sawdust particles cold metal light industrial luxury 8k"
  ),
  processEdge: pollinationImage(
    "automated edge banding line sealing cabinet panel dark walnut veneer chrome rollers warm wood and black steel cinematic 8k"
  ),
  processCnc: pollinationImage(
    "cnc router carving invisible grooves in matte black furniture board precision spindle blue white industrial light hyperreal 8k"
  ),
  processPack: pollinationImage(
    "finished custom furniture panels stacked with protective graphite felt labels metal caliper walnut edges premium manufacturing atelier 8k"
  ),
};
