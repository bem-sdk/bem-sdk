'use strict';

const test = require('ava');
const expect = require('chai').expect;
const resolve = require('../../../../lib').resolve;

test('should resolve transitive dependency', () => {
    const decl = [{ block: 'A' }];
    const deps = [
        {
            entity: { block: 'A' },
            dependOn: [
                { entity: { block: 'B' } }
            ]
        },
        {
            entity: { block: 'B' },
            dependOn: [
                { entity: { block: 'C' } }
            ]
        }
    ];
    const resolved = resolve(decl, deps);

    expect(resolved.entities).to.contain({ block: 'C' });
});

test('should resolve transitive entity depending on multiple dependencies', () => {
    const decl = [{ block: 'A' }];
    const deps = [
        {
            entity: { block: 'A' },
            dependOn: [
                { entity: { block: 'B' } }
            ]
        },
        {
            entity: { block: 'B' },
            dependOn: [
                { entity: { block: 'C' } },
                { entity: { block: 'D' } }
            ]
        }
    ];
    const resolved = resolve(decl, deps);

    expect(resolved.entities).to.contain({ block: 'C' })
        .and.to.contain({ block: 'D' });
});
