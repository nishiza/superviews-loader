import * as loaderUtils from 'loader-utils';
import * as superviews from 'superviews.js';

interface LoaderOption {
  argstr?: string;
  mode?: string;
}

export
interface LoaderContext {
  cacheable(flag?: boolean): void;
}

export function loaderMain(this: LoaderContext, content: string): string {
  this.cacheable();
  const options = loaderUtils.getOptions(this);
  const option: LoaderOption = Object.assign(
    { mode: 'cjs' },
    loaderUtils.getOptions(this), // it is safe to pass null to Object.assign()
  );
  const mode = option.mode;
  const argstr = option.argstr;
  const result = superviews(content, undefined, argstr, mode);
  return result;
}
