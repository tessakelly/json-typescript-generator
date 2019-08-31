import { genTypes, JsonType, JsonObjectType } from './type-generator';

export function printTypes(jsonString: string) {
  const { knownTypes, knownObjectTypes } = genTypes(jsonString);

  function printPropertyType(type: JsonType) {
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
      types.push(type.object);
    }
    if (type.array) {
      types.push(`Array<${printPropertyType(knownTypes[type.array])}>`);
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
    for (const typeName of Object.keys(knownObjectTypes)) {
      const type = knownObjectTypes[typeName];
      result += `export interface ${typeName} {\n`;
      for (const prop of Object.keys(type)) {
        result += `  ${prop}${knownTypes[type[prop]].undefined ? '?' : ''}: ${printPropertyType(knownTypes[type[prop]])};\n`;
      }
      result += '}\n\n';
    }
    return result;
  }

  return printTypes();
}
