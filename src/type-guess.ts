interface JsonType {
  boolean?: boolean;
  number?: boolean;
  string?: boolean;
  null?: boolean;
  object?: {
    [key:string]: string; // JsonType key
  }
  array?: string; // JsonType key
}

export default function genTypes(input: string) {
  let childNum = 0;
  const knownTypes: { [key:string]: JsonType } = {};
  const usedTypeNames: {
    [key:string]: number;
  } = {};

  function generateNewTypeName(propertyName: string) {
    let typeName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
    if (knownTypes[typeName]) {
      if (!usedTypeNames[typeName]) {
        usedTypeNames[typeName] = 1;
      }
      while (knownTypes[`${typeName}_${usedTypeNames[typeName]}`]) {
        usedTypeNames[typeName] += 1;
      }

      return `${typeName}_${usedTypeNames[typeName]}`;
    }
    return typeName;
  }

  function processObject(obj: any, type: JsonType) {
    if (!type.object) {
      type.object = {};
    }
    for (const key of Object.keys(obj)) {
      if (!type.object[key]) {
        const typeKey = generateNewTypeName(key);
        type.object[key] = typeKey;
        knownTypes[typeKey] = {};
      }
      processNode(obj[key], knownTypes[type.object[key]]);
    }
  }

  function processArray(arr: Array<any>, type: JsonType) {
    if (!type.array) {
      const childTypeName = `ChildType${childNum}`;
      knownTypes[childTypeName] = {};
      childNum++;
      type.array = childTypeName;
    }
    const childType = knownTypes[type.array];

    for (const child of arr) {
      processNode(child, childType);
    }
  }

  function processNode(node, type: JsonType) {
    const nodeType = typeof node;
    if (node === null) {
      type.null = true;
    } else if (nodeType === 'object') {
      if (Array.isArray(node)) {
        processArray(node, type);
      } else {
        processObject(node, type);
      }
    } else {
      type[nodeType] = true;
    }
  }

  function printPropertyType(typeName: string) {
    const type = knownTypes[typeName];
    const types = [];
    if (type.boolean) {
      types.push('boolean');
    }
    if (type.number) {
      types.push('number');
    }
    if (type.string) {
      types.push('string');
    }
    if (type.object) {
      types.push(typeName);
    }
    if (type.array) {
      types.push(`Array<${printPropertyType(type.array)}>`);
    }
    if (type.null) {
      types.push('null');
    }
    if (types.length === 0) {
      types.push('any');
    }
    return types.join(' | ');
  }

  function printTypes() {
    let result = '';
    for (const typeName of Object.keys(knownTypes)) {
      const type = knownTypes[typeName];
      if (type.object) {
        result += `export interface ${typeName} {\n`;
        for (const prop of Object.keys(type.object)) {
          result += `  ${prop}: ${printPropertyType(type.object[prop])};\n`;
        }
        result += '}\n\n';
      }
    }
    return result;
  }

  const initType = {};
  knownTypes['RootType'] = initType;
  processNode(JSON.parse(input), initType);
  return printTypes();
}
