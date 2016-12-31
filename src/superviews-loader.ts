import * as loaderUtils from 'loader-utils';
import superviews = require('superviews.js');
import * as acorn from 'acorn';
import astring = require('astring');
import * as ESTree from 'estree';
interface LoaderOption {
  argstr?: string;
  mode?: string;
  astring?: any;
}
function loaderMain (content: string): string {
  this.cacheable();
  const query: LoaderOption = loaderUtils.parseQuery(this.query);
  const option: LoaderOption = this.options && this.options.superviews;
  const mode = query.mode || (option && option.mode) || 'cjs';
  const argstr = query.argstr || (option && option.argstr) || undefined;
  const result = superviews(content, undefined, argstr, mode);
  const ast: ESTree.Program = acorn.parse(result, {});
  return astring(ast, query.astring || (option && option.astring) || {});
}
export  = loaderMain;
