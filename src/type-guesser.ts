export interface JsonType {
  boolean?: boolean;
  number?: boolean;
  string?: boolean;
  null?: boolean;
  undefined?: boolean;
  object?: string; // key in knownObjectTypes
  array?: number; // key in knownTypes
}

export interface JsonObjectType {
  [key:string]: number; // Property name: key of property type in knownTypes
}

export function genTypes(input: string) {
  const knownTypes: JsonType[] = [];
  const knownObjectTypes: {
    [key:string]: JsonObjectType;
  } = {};
  const usedTypeNames: {
    [key:string]: number;
  } = {};

  function makeValidIdentifier(name: string) {
    const identifier = name.replace(/^[^A-za-z]+|\W+/gi, '');
    return identifier.length ?
      identifier.charAt(0).toUpperCase() + identifier.slice(1) :
      'Type';
  }

  function generateNewTypeName(propertyName: string) {
    let typeName = makeValidIdentifier(propertyName);
    if (knownObjectTypes[typeName]) {
      if (!usedTypeNames[typeName]) {
        usedTypeNames[typeName] = 2;
      }
      while (knownObjectTypes[`${typeName}_${usedTypeNames[typeName]}`]) {
        usedTypeNames[typeName] += 1;
      }

      return `${typeName}_${usedTypeNames[typeName]}`;
    }
    return typeName;
  }

  function addPropertyToTypeIfUndefined(propName: string, type: JsonObjectType) {
    if (!type[propName]) {
      const childTypeIndex = knownTypes.length;
      knownTypes.push({});
      type[propName] = childTypeIndex;
    }
  }

  function checkForUndefinedTypes(obj: any, type: JsonObjectType) {
    const allKeys = {};
    for (const key of Object.keys(obj)) {
      allKeys[key] = false;
    }
    for (const key of Object.keys(type)) {
      if (allKeys[key] === undefined) {
        allKeys[key] = false;
      } else {
        allKeys[key] = true;
      }
    }
    const optionalProperties = Object.keys(allKeys).filter((key) => !allKeys[key]);
    optionalProperties.forEach((key) => {
      addPropertyToTypeIfUndefined(key, type);
      knownTypes[type[key]].undefined = true;
    });
  }

  function processObject(obj: any, type: JsonType, name?: string) {
    if (!type.object) {
      type.object = generateNewTypeName(name || 'Type');
      knownObjectTypes[type.object] = {};
    } else {
      checkForUndefinedTypes(obj, knownObjectTypes[type.object]);
    }
    for (const key of Object.keys(obj)) {
      const objectType = knownObjectTypes[type.object];
      addPropertyToTypeIfUndefined(key, objectType);
      processNode(obj[key], knownTypes[objectType[key]], key);
    }
  }

  function processArray(arr: Array<any>, type: JsonType, name?: string) {
    if (!type.array) {
      const childTypeIndex = knownTypes.length;
      knownTypes.push({});
      type.array = childTypeIndex;
    }
    const childType = knownTypes[type.array];

    for (const child of arr) {
      processNode(child, childType, name);
    }
  }

  function processNode(node, type: JsonType, name?: string) {
    const nodeType = typeof node;
    if (node === null) {
      type.null = true;
    } else if (nodeType === 'object') {
      if (Array.isArray(node)) {
        processArray(node, type, name);
      } else {
        processObject(node, type, name);
      }
    } else {
      type[nodeType] = true;
    }
  }

  const initType = {};
  knownTypes.push(initType);
  processNode(JSON.parse(input), initType);
  return { knownTypes, knownObjectTypes };
}
