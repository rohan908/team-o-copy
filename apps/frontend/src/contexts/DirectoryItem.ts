// defines the fields of a directory item (i.e. Patriot20, Patriot22)
export interface DirectoryItem {
  id: number,
  x: number,
  y: number,
  floor: number,
  mapId: number,
  name: string,
  description: string,
  nodeType: string,
  connectingNodes: number[],
}
