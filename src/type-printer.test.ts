import 'mocha';
import { expect } from 'chai';
import { printTypes } from './type-printer';

describe('type-printer', function() {
  describe('#printTypes()', function() {
    it('should create a default name for types in arrays', function() {
      const types = printTypes('[[{"test": 1}]]');
      expect(types).to.equal([
        'export interface DefaultType {',
        '  test: number;',
        '}'
      ].join('\n'));
    });

    it('should declare optional properties if they don\'t appear in every object of a type', function() {
      const types = printTypes('[{}, {"test": 1}]');
      expect(types).to.equal([
        'export interface DefaultType {',
        '  test?: number;',
        '}'
      ].join('\n'));
    });

    it('should allow alternate types', function() {
      const types = printTypes('[{"test": "hello"}, {"test": 1}]');
      expect(types).to.be.oneOf([
        [
          'export interface DefaultType {',
          '  test: string | number;',
          '}'
        ].join('\n'),
        [
          'export interface DefaultType {',
          '  test: number | string;',
          '}'
        ].join('\n')
      ]);
    });

    it('should singularize type names of children of arrays', function() {
      const types = printTypes('{"documents": [{"title": "Test Document"}]}');
      expect(types).to.equal([
        'export interface DefaultType {',
        '  documents: Array<Document>;',
        '}',
        '',
        'export interface Document {',
        '  title: string;',
        '}'
      ].join('\n'));
    });
  });
});
