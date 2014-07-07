var naming = require('../lib/harry-roberts-naming');

describe('harry roberts', function () {
    describe('isBlock', function () {
        it('should not detect block by undefined', function () {
            naming.isBlock(undefined).should.be.false;
        });

        it('should not detect block by empty object', function () {
            naming.isBlock({}).should.be.false;
        });

        it('should detect block by string', function () {
            naming.isBlock('block').should.be.true;
        });

        it('should detect block by object', function () {
            var notation = { block: 'block' };

            naming.isBlock(notation).should.be.true;
        });

        it('should not detect block in mod of block by string', function () {
            naming.isBlock('block--mod--val').should.be.false;
        });

        it('should not detect block in mod of block by object', function () {
            var notation = { block: 'block', modName: 'mod', modVal: 'val' };

            naming.isBlock(notation).should.be.false;
        });

        it('should not detect block in boolean mod of block by string', function () {
            naming.isBlock('block--mod').should.be.false;
        });

        it('should not detect block in boolean mod of block by object', function () {
            var notation = { block: 'block', modName: 'mod', modVal: true };

            naming.isBlock(notation).should.be.false;
        });

        it('should not detect block in elem by string', function () {
            naming.isBlock('block-elem').should.be.false;
        });

        it('should not detect block in elem by object', function () {
            var notation = { block: 'block', elem: 'elem' };

            naming.isBlock(notation).should.be.false;
        });

        it('should not detect block in mod of elem by string', function () {
            naming.isBlock('block-elem--mod--value').should.be.false;
        });

        it('should not detect block in mod of elem by object', function () {
            var notation = { block: 'block', elem: 'elem', modName: 'mod', modVal: 'val' };

            naming.isBlock(notation).should.be.false;
        });

        it('should not detect block in boolean mod of elem by string', function () {
            naming.isBlock('block-elem--mod').should.be.false;
        });

        it('should not detect block in boolean mod of elem by object', function () {
            var notation = { block: 'block', elem: 'elem', modName: 'mod', modVal: true };

            naming.isBlock(notation).should.be.false;
        });
    });
});
