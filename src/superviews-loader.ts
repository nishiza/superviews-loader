import * as loaderUtils from 'loader-utils';
import * as superviews from 'superviews.js';
import * as acorn from 'acorn';
import * as astring from 'astring';
import * as ESTree from 'estree';
export
interface LoaderOption {
  argstr?: string;
  mode?: string;
  astring?: any;
}
export
interface LoaderContext {
  query: string;
  options: {superviews?: LoaderOption};
  cacheable(flag?: boolean): void;
}
export function loaderMain(this: LoaderContext, content: string): string {
  this.cacheable();
  const query: LoaderOption = loaderUtils.parseQuery(this.query);
  const option: LoaderOption = this.options && this.options.superviews;
  const mode = query.mode || (option && option.mode) || 'cjs';
  const argstr = query.argstr || (option && option.argstr) || undefined;
  const result = superviews(content, undefined, argstr, mode);
  const ast: ESTree.Program = acorn.parse(result, {});
  return astring(ast, query.astring || (option && option.astring) || {});
}
