var expect = require('chai').expect,
    scheme = require('..');

describe('default', function() {

    it('should return path + tech', function() {
        expect('a/a.js')
            .eql(scheme().path({ block: 'a' }, 'js'));
    });

    it('should return nested scheme by default', function() {
        expect(scheme().path({ block: 'a', elem: 'e1' }, 'js'))
            .eql('a/__e1/a__e1.js');
    });

    it('should return error', function() {
        try {
            scheme('module-not-found').path({ block: 'a' }, 'js');
        } catch (e) {
            expect(e)
                .eql({ "code" : "MODULE_NOT_FOUND" });
        }
    });

    it('should support optional naming style', function() {
        expect(
            scheme('nested').path({
                block: 'a',
                elem: 'e1',
                modName: 'mn',
                modVal: 'mv'
            }, 'js', { naming: { elem: '%%%', mod: '###' }})
        ).eql('a/%%%e1/###mn/a%%%e1###mn###mv.js');
    });

    describe('lib/schemes/nested', function() {
        it('should return nested folder for a block', function() {
            expect(scheme('nested').path({ block: 'a' }, 'js'))
                .eql('a/a.js');
        });

        it('should return nested folder for a block with modifier', function() {
            expect(
                scheme('nested').path({
                    block: 'a', modName: 'mn', modVal: 'mv'
                }, 'js')
            ).eql('a/_mn/a_mn_mv.js');
        });

        it('should return nested folder for elem', function() {
            expect(
                scheme('nested').path({ block: 'a', elem: 'e1' }, 'js')
            ).eql('a/__e1/a__e1.js');
        });

        it('should return nested folder for modName elem', function() {
            expect(
                scheme('nested').path({
                    block: 'a',
                    elem: 'e1',
                    modName: 'mn',
                    modVal: 'mv'
                }, 'js')
            ).eql('a/__e1/_mn/a__e1_mn_mv.js');
        });
    });
});
