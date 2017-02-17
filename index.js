'use strict';

const stringifyObj = require('stringify-object');
const normalize = require('bem-decl').normalize;
const BemEntity = require('@bem/entity-name');
const naming = require('bem-naming');

function getEntities(bemjson, ctx) {
    const visited = [];

    function _getEntities(bemjson_, ctx_) {
        ctx_ = Object.assign({}, ctx_);

        let deps = [];
        let contentDeps;

        if (Array.isArray(bemjson_)) {
            bemjson_.forEach(function(item) {
                contentDeps = _getEntities(item, ctx_);
                contentDeps && (deps = deps.concat(contentDeps));
            });

            return deps;
        }

        if (typeof bemjson_ !== 'object') {
            return;
        }

        bemjson_.block && (ctx_.block = bemjson_.block);

        const declItem = {
            block: ctx_.block
        };

        bemjson_.elem && (declItem.elem = bemjson_.elem);
        bemjson_.mods && (declItem.mods = bemjson_.mods);
        bemjson_.elem && bemjson_.elemMods && (declItem.mods = bemjson_.elemMods);

        const decl = normalize(declItem, { harmony: true });

        decl.forEach(function(declItem_) {
            function pushTo(declItem__) {
                const depName = naming.stringify(declItem__);
                if (visited.indexOf(depName) < 0) {
                    visited.push(depName);
                    deps.push(new BemEntity(declItem__));
                }
            }

            pushTo(declItem_);
            if (declItem_.modName && declItem_.modVal !== true) {
                pushTo(Object.assign({}, declItem_, { modVal: true }));
            }
        });

        ['mix', 'content'].forEach(function(k) {
            bemjson_[k] && (deps = deps.concat(_getEntities(bemjson_[k], ctx_)));
        });

        ['js', 'attrs'].forEach(function(k) {
            bemjson_[k] && Object.keys(bemjson_[k]).forEach(function(kk) {
                deps = deps.concat(_getEntities(bemjson_[k][kk], ctx_));
            });
        });

        return deps.filter(Boolean);
    }

    return _getEntities(bemjson, ctx);
}

function stringify(bemjson, ctx, opts) {
    opts || (opts = {});
    opts.indent || (opts.indent = '    ');

    return stringifyObj(getEntities(bemjson, ctx), opts);
}

module.exports = {
    convert: getEntities,
    stringify: stringify
};
